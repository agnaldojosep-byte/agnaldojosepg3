import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { 
  getReadingActivities, 
  ReadingActivity, 
  CATEGORY_COLORS, 
  CATEGORY_LABELS 
} from '../utils/statsLogger';
import { Category, Language } from '../types';
import { BookOpen, Sparkles, Trophy, Calendar, RefreshCw } from 'lucide-react';

interface ChartProps {
  lang: Language;
}

interface DayData {
  dateStr: string;
  displayLabel: string;
  bedtime: number;
  animals: number;
  ventures: number;
  education: number;
  fantasy: number;
  space: number;
  royals: number;
  total: number;
}

export const ReadingActivityChart: React.FC<ChartProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const [activities, setActivities] = useState<ReadingActivity[]>([]);
  const [dimensions, setDimensions] = useState({ width: 500, height: 320 });
  const [hoveredData, setHoveredData] = useState<{
    dateLabel: string;
    category: Category;
    minutes: number;
  } | null>(null);

  // Load activities on mount
  useEffect(() => {
    setActivities(getReadingActivities());
  }, []);

  const handleRefresh = () => {
    setActivities(getReadingActivities());
    if (svgRef.current) {
      // Small shake motion
      d3.select(svgRef.current)
        .transition()
        .duration(150)
        .attr('transform', 'scale(0.98)')
        .transition()
        .duration(150)
        .attr('transform', 'scale(1)');
    }
  };

  // Track parent container width dynamically with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      setDimensions({
        width: Math.max(width, 280), // Mobile safe boundary
        height: 280
      });
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Format date helper for the past 7 days (including today)
  const getPastSevenDays = () => {
    const days: { dateStr: string; label: string }[] = [];
    
    const weekdayNamesPt = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const weekdayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdays = lang === 'pt' ? weekdayNamesPt : weekdayNamesEn;
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = weekdays[d.getDay()];
      const dayNum = d.getDate();
      const monthNum = d.getMonth() + 1;
      
      const displayLabel = `${dayName} ${dayNum}/${monthNum}`;
      days.push({ dateStr, label: displayLabel });
    }
    
    return days;
  };

  // Process data for D3 Stack
  const chartData: DayData[] = React.useMemo(() => {
    const days = getPastSevenDays();
    const categories: Category[] = ['bedtime', 'animals', 'ventures', 'education', 'fantasy', 'space', 'royals'];
    
    return days.map(day => {
      const dayActs = activities.filter(act => act.date === day.dateStr);
      
      const row: Partial<DayData> = {
        dateStr: day.dateStr,
        displayLabel: day.label,
        total: 0
      };
      
      // Initialize category counters to 0
      categories.forEach(cat => {
        row[cat] = 0;
      });
      
      // Accumulate reading minutes matching each category
      dayActs.forEach(act => {
        const cat = act.category;
        if (categories.includes(cat)) {
          row[cat] = (row[cat] || 0) + act.durationMinutes;
        }
      });
      
      // Rounded totals
      let total = 0;
      categories.forEach(cat => {
        total += row[cat] || 0;
      });
      
      row.total = Math.round(total * 10) / 10;
      
      return row as DayData;
    });
  }, [activities, lang]);

  // Derive global metrics for summary cards
  const metrics = React.useMemo(() => {
    const totalMinutes = Math.round(chartData.reduce((acc, curr) => acc + curr.total, 0));
    
    // Sum by category
    const catSums: Record<Category, number> = {
      bedtime: 0,
      animals: 0,
      ventures: 0,
      education: 0,
      fantasy: 0,
      space: 0,
      royals: 0,
    };
    
    chartData.forEach(day => {
      Object.keys(catSums).forEach(key => {
        const cat = key as Category;
        catSums[cat] += day[cat] || 0;
      });
    });
    
    // Find favorite category
    let favCat: Category = 'bedtime';
    let maxMin = -1;
    Object.keys(catSums).forEach(key => {
      const cat = key as Category;
      if (catSums[cat] > maxMin) {
        maxMin = catSums[cat];
        favCat = cat;
      }
    });

    return {
      totalMinutes,
      favCat,
      favCatLabel: CATEGORY_LABELS[favCat][lang === 'pt' ? 'pt' : 'en'],
      favCatMin: Math.round(maxMin),
    };
  }, [chartData, lang]);

  // Render D3 chart inside SVG
  useEffect(() => {
    if (!svgRef.current || chartData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear prior render

    const width = dimensions.width;
    const height = dimensions.height;
    
    const margin = { top: 20, right: 30, bottom: 40, left: 35 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const mainGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Category keys (matches our types)
    const keys: Category[] = ['bedtime', 'animals', 'ventures', 'education', 'fantasy', 'space', 'royals'];

    // D3 Stack layout
    const stack = d3.stack<DayData>()
      .keys(keys)
      .value((d, key) => d[key as Category] || 0);

    const stackedSeries = stack(chartData);

    // X-Scale: Ordinal band for dates
    const xScale = d3.scaleBand<string>()
      .domain(chartData.map(d => d.displayLabel))
      .range([0, chartWidth])
      .padding(0.38);

    // Find max value for Y domains
    const maxVal = d3.max(chartData, d => d.total) || 12;
    const yDomainMax = Math.max(12, Math.ceil(maxVal / 5) * 5 + 2); // rounded neat range

    // Y-Scale: Linear representation for minutes read
    const yScale = d3.scaleLinear()
      .domain([0, yDomainMax])
      .range([chartHeight, 0])
      .nice();

    // Render Gridlines for visual accuracy
    mainGroup.append('g')
      .attr('class', 'grid-lines')
      .attr('opacity', 0.12)
      .attr('stroke', '#4B5E26')
      .selectAll('line')
      .data(yScale.ticks(4))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', chartWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d));

    // Render X Axis
    const xAxis = d3.axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10);

    const xAxisGroup = mainGroup.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    xAxisGroup.select('.domain')
      .attr('stroke', '#4B5E26')
      .attr('stroke-width', 2);

    xAxisGroup.selectAll('text')
      .attr('font-family', 'Fredoka, sans-serif')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#C2D9C2');

    // Render Y Axis
    const yAxis = d3.axisLeft(yScale)
      .ticks(4)
      .tickFormat(d => `${d}m`)
      .tickSize(0);

    const yAxisGroup = mainGroup.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    yAxisGroup.select('.domain').remove(); // hide axis spine line

    yAxisGroup.selectAll('text')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '9px')
      .attr('font-weight', 'bold')
      .attr('fill', '#C2D9C2')
      .attr('dx', '-5');

    // Filter/Defs for sweet neon shadow blur
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'shadow-glow')
      .attr('height', '130%');
    filter.append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '3')
      .attr('stdDeviation', '2')
      .attr('flood-color', '#0D120B')
      .attr('flood-opacity', '0.4');

    // Draw the bar stacks
    const seriesGroups = mainGroup.selectAll('g.series')
      .data(stackedSeries)
      .enter()
      .append('g')
      .attr('class', d => `series-${d.key}`)
      .attr('fill', d => CATEGORY_COLORS[d.key as Category]);

    // Draw rectangles inside each stack series group
    seriesGroups.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.data.displayLabel) || 0)
      .attr('y', chartHeight) // Animation starts from bottom
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('rx', 4) // Rounded pillars
      .attr('ry', 4)
      .attr('filter', 'url(#shadow-glow)')
      .attr('class', 'transition-colors cursor-pointer hover:brightness-110')
      // Event mouse interactions
      .on('mouseenter', function(event, d) {
        // Find which series we were hovering
        const seriesKey = d3.select(this.parentNode as SVGGElement).attr('class')?.replace('series-', '') as Category;
        const minutes = d[1] - d[0];
        
        if (seriesKey && minutes > 0) {
          setHoveredData({
            dateLabel: d.data.displayLabel,
            category: seriesKey,
            minutes: Math.round(minutes * 10) / 10
          });
          
          // Subtle highlight visual expansion
          d3.select(this)
            .transition()
            .duration(100)
            .attr('opacity', 0.9)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 1.5);
        }
      })
      .on('mouseleave', function() {
        setHoveredData(null);
        d3.select(this)
          .transition()
          .duration(150)
          .attr('opacity', 1)
          .attr('stroke', 'none');
      })
      // Smooth dynamic entry transition
      .transition()
      .duration(800)
      .delay((_, idx) => idx * 75)
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]));

  }, [chartData, dimensions]);

  return (
    <div className="space-y-4">
      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#141A10] border border-[#4B5E26] p-3.5 rounded-2xl shadow-md relative overflow-hidden flex items-center justify-between">
          <div>
            <span className="text-[8px] md:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              {lang === 'pt' ? 'Minutos no Período' : 'Total Read Time'}
            </span>
            <p className="text-xl font-black font-fredoka text-amber-400">
              {metrics.totalMinutes} min
            </p>
          </div>
          <Calendar className="w-8 h-8 text-[#A2C76A] opacity-25" />
        </div>

        <div className="bg-[#141A10] border border-[#4B5E26] p-3.5 rounded-2xl shadow-md relative overflow-hidden flex items-center justify-between">
          <div>
            <span className="text-[8px] md:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              {lang === 'pt' ? 'Reino Favorito' : 'Favorite Kingdom'}
            </span>
            <p className="text-sm font-black font-fredoka text-emerald-400 truncate max-w-[130px]">
              {metrics.totalMinutes > 0 ? metrics.favCatLabel : '---'}
            </p>
            <span className="text-[8px] text-slate-400 block font-mono">
              {metrics.totalMinutes > 0 ? `${metrics.favCatMin} min lidos` : ''}
            </span>
          </div>
          <Trophy className="w-8 h-8 text-amber-400 opacity-25 animate-pulse" />
        </div>

        <div className="bg-[#141A10] border border-[#4B5E26] p-3.5 rounded-2xl shadow-md relative overflow-hidden flex items-center justify-between">
          <div>
            <span className="text-[8px] md:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              {lang === 'pt' ? 'Dias Sincronizados' : 'Synced Days'}
            </span>
            <p className="text-xl font-black font-fredoka text-sky-400">7 Dias</p>
          </div>
          <BookOpen className="w-8 h-8 text-sky-400 opacity-25" />
        </div>
      </div>

      {/* Chart Wrapper Container */}
      <div className="bg-[#141A10] border border-[#4B5E26] p-4 rounded-2xl relative shadow-inner">
        <div className="flex items-center justify-between mb-3 border-b border-[#242E13] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📊</span>
            <h4 className="text-[10px] md:text-xs font-fredoka font-black uppercase text-white tracking-wider">
              {lang === 'pt' ? 'Minutos Lidos por Categoria' : 'Weekly Reading Activity (Minutes)'}
            </h4>
          </div>

          <button
            onClick={handleRefresh}
            className="p-1.5 hover:bg-[#242E13] rounded-lg text-slate-400 hover:text-[#CEE94F] transition-all cursor-pointer"
            title={lang === 'pt' ? 'Sincronizar dados' : 'Sync stats'}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Display hover tooltip details dynamically inside the chart box */}
        <div className="h-6 flex items-center justify-center text-[10px] text-[#DCEEC1] font-semibold text-center mb-1">
          {hoveredData ? (
            <div className="flex items-center gap-2 justify-center bg-[#242E13]/80 px-3 py-1 rounded-full border border-[#4B5E26] animate-fade-in shadow-md">
              <span 
                className="w-2 h-2 rounded-full inline-block" 
                style={{ backgroundColor: CATEGORY_COLORS[hoveredData.category] }}
              />
              <span className="font-extrabold uppercase text-[9px] text-[#CEE94F]">
                {CATEGORY_LABELS[hoveredData.category][lang === 'pt' ? 'pt' : 'en']}:
              </span>
              <span>{Math.round(hoveredData.minutes)} min ({hoveredData.dateLabel})</span>
            </div>
          ) : (
            <span className="text-slate-500 italic text-[9px]">
              {lang === 'pt' ? 'Passe o mouse por cima das colunas para ver detalhes!' : 'Hover over stacked columns for details'}
            </span>
          )}
        </div>

        <div ref={containerRef} className="w-full overflow-hidden flex justify-center py-2">
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="overflow-visible"
          />
        </div>

        {/* Categories Color Chart Legend */}
        <div className="mt-2.5 pt-3 border-t border-[#242E13] flex flex-wrap gap-x-3.5 gap-y-2 items-center justify-center select-none">
          {Object.entries(CATEGORY_COLORS).map(([key, color]) => {
            const catKey = key as Category;
            // Only show keys that exist in our showcase categories mapping
            const label = CATEGORY_LABELS[catKey]?.[lang === 'pt' ? 'pt' : 'en'];
            if (!label) return null;
            return (
              <div key={key} className="flex items-center gap-1.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full shadow-sm" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-[9px] font-fredoka font-black text-slate-300">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
