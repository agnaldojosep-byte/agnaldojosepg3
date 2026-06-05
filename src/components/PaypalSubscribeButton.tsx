import React, { useEffect, useRef, useState } from 'react';

interface PaypalSubscribeButtonProps {
  onSuccess: (subscriptionID: string) => void;
  planId?: string;
  clientId?: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export const PaypalSubscribeButton: React.FC<PaypalSubscribeButtonProps> = ({
  onSuccess,
  planId = 'P-31P955061C2841123NIOISOI',
  clientId = 'AToWEWTDjvDc-nU6fnZinAJ0QBYFS8veTMNQ1NAwyOS7lCTgYzGrKkchhFs4rbK8ub0aDj2WDktqG4tb'
}) => {
  const containerId = `paypal-button-container-${planId}`;
  const [loading, setLoading] = useState(true);
  const [errorCount, setErrorCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'paypal-sdk-script';
    
    const loadPaypalScript = () => {
      if (window.paypal) {
        renderPaypalButtons();
        return;
      }

      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
        script.setAttribute('data-sdk-integration-source', 'button-factory');
        script.async = true;
        document.body.appendChild(script);
      }

      script.addEventListener('load', renderPaypalButtons);
      script.addEventListener('error', handleScriptError);
    };

    const handleScriptError = () => {
      setLoading(false);
      console.error('Failed to load PayPal SDK script');
    };

    const renderPaypalButtons = () => {
      if (!window.paypal) {
        if (errorCount < 5) {
          setTimeout(() => {
            setErrorCount(prev => prev + 1);
          }, 300);
        } else {
          setLoading(false);
        }
        return;
      }

      setLoading(false);

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      try {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              plan_id: planId
            });
          },
          onApprove: function(data: any, actions: any) {
            onSuccess(data.subscriptionID);
          },
          onError: function(err: any) {
            console.error('PayPal Buttons Error:', err);
          }
        }).render(`#${containerId}`);
      } catch (err) {
        console.error('Error rendering PayPal button:', err);
      }
    };

    loadPaypalScript();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.removeEventListener('load', renderPaypalButtons);
        script.removeEventListener('error', handleScriptError);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [planId, clientId, errorCount]);

  return (
    <div className="w-full space-y-3">
      {loading && (
        <div className="flex flex-col items-center justify-center p-6 bg-[#1D271A] rounded-2xl space-y-3 border border-[#34422F] shadow-inner text-center">
          <div className="w-7 h-7 rounded-full border-3 border-[#34422F] border-t-amber-400 animate-spin" />
          <span className="text-[11px] text-[#C2D9C2] font-black uppercase tracking-wider animate-pulse">
            Carregando PayPal Seguro...
          </span>
        </div>
      )}
      <div 
        id={containerId} 
        ref={containerRef} 
        className="w-full min-h-[120px] relative z-10 rounded-2xl overflow-hidden p-0.5 bg-transparent" 
      />
    </div>
  );
};
