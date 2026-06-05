import { Story, Language, Translation, ListTranslation, StoryPage } from '../types';

// Let's define the 20 premium stories with custom metadata and interactive structures
export const EXTRA_STORIES_METADATA = [
  // 10 BEDTIME STORIES (1 to 10)
  {
    id: 101,
    idString: 'ursinho-mel',
    title: {
      pt: 'O Ursinho de Algodão e o Rio de Mel',
      en: 'The Cotton Bear and the River of Honey',
      es: 'El Osito de Algodón y el Río de Miel',
      fr: 'L’Ours en Coton et la Rivière de Miel',
      it: 'L’Orsetto di Cotone e il Fiume di Miele'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'amber',
    cardGradient: 'from-amber-500 via-orange-600 to-amber-900',
    premium: true,
    coverEmoji: '🧸',
    coverImage: 'ursinho_mel',
    durationMin: 5,
    introduction: {
      pt: 'Um ursinho feito de algodão-doce ganha vida saboreando deliciosas gotinhas de mel dourado que flutuam sob o luar.',
      en: 'A soft cotton candy teddy bear comes to life tasting golden honey drops floating elegantly under the safe half-moon.',
      es: 'Un osito de peluche hecho de algodón cobra vida saboreando gotitas de miel dorada bajo la luz de la luna.',
      fr: 'Un petit ours en coton s’éveille pour goûter des gouttes de miel doré flottant sous le doux regard de la lune.',
      it: 'Un orsetto di morbido cotone prende vita assaporando gocce di miele dorato sotto l’argento della luna.'
    },
    characters: {
      pt: ['Ursinho Mel (Dono do Rio)', 'Lara (Menina de Pijama Amarelo)'],
      en: ['Honey Bear (River Owner)', 'Lara (Girl in Yellow Pajamas)'],
      es: ['Osito Miel (El Guardián)', 'Lara (Niña del Pijama Amarillo)'],
      fr: ['Ourson Miel (Le Gardien)', 'Lara (Fillette au Pyjama Jaune)'],
      it: ['Orsetto Miele (Il Custode)', 'Lara (Bambina in Pigiama Giallo)']
    },
    characterEmoji: '🧸',
    itemEmoji: '🍯',
    creatureEmoji: '🐝',
    cloudColor: 'text-amber-100',
    specialTerm: { pt: 'rio de mel doce', en: 'honey river', es: 'río de miel', fr: 'rivière de miel', it: 'fiume di miele' }
  },
  {
    id: 102,
    idString: 'nuvem-preguicosa',
    title: {
      pt: 'A Nuvem Mole que Queria Dormir',
      en: 'The Soft Cloud that Wanted to Sleep',
      es: 'La Nube Floja que Quería Dormir',
      fr: 'Le Nuage Douillet qui Voulait Dormir',
      it: 'La Nuvoletta Soffice che Voleva Dormire'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'sky',
    cardGradient: 'from-sky-400 via-blue-500 to-indigo-900',
    premium: true,
    coverEmoji: '☁️',
    coverImage: 'nuvem_dormir',
    durationMin: 5,
    introduction: {
      pt: 'Uma nuvem tão macia quanto um travesseiro de penas procura um lugar calmo no céu noturno para bocejar e descansar.',
      en: 'A cloud as fluffy as a feather pillow searches the quiet star field for a comfortable spot to rest and yawn.',
      es: 'Una nube tan suave como una almohada de plumas busca un lugar tranquilo en el cielo estrellado para descansar.',
      fr: 'Un nuage aussi doux qu’un oreiller de plumes voyage pour trouver le coin parfait pour faire un gros dodo.',
      it: 'Una nuvoletta morbida come un cuscino di piume cerca un posto tranquillo nel cielo per riposare.'
    },
    characters: {
      pt: ['Fofinha (Nuvem Sonolenta)', 'Lucas (Menino do Pijama Azul)'],
      en: ['Fluffy (Sleepy Cloud)', 'Lucas (Boy in Blue Pajamas)'],
      es: ['Esponjosa (La Nube)', 'Lucas (Niño del Pijama de Estrellas)'],
      fr: ['Nuageux (Le Nuage)', 'Lucas (Garçon au Pyjama Bleu)'],
      it: ['Soffice (Nuvoletta)', 'Lucas (Bambino in Pigiama Blu)']
    },
    characterEmoji: '☁️',
    itemEmoji: '⭐',
    creatureEmoji: '🦉',
    cloudColor: 'text-sky-100',
    specialTerm: { pt: 'céu de estrelinhas', en: 'starry sky', es: 'cielo estrellado', fr: 'ciel étoilé', it: 'cielo di stelle' }
  },
  {
    id: 103,
    idString: 'tartaruga-tuga',
    title: {
      pt: 'A Tartaruga que Viajava Devagar',
      en: 'The Turtle Who Traveled Slowly',
      es: 'La Tortuga que Viajaba Despacio',
      fr: 'La Tortue qui Voyageait Lentement',
      it: 'La Tartaruga che Viaggiava Lentamente'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'teal',
    cardGradient: 'from-teal-500 via-emerald-650 to-emerald-950',
    premium: true,
    coverEmoji: '🐢',
    coverImage: 'tartaruga_tuga',
    durationMin: 5,
    introduction: {
      pt: 'Uma tartaruga sábia mostra a um menino apressado que o melhor caminho para dormir é respirar devagar e contar ondas.',
      en: 'A wise old sea turtle teaches a little boy that the best bridge to sweet dreams is breathing slowly.',
      es: 'Una tortuga marina sabia le enseña a un niño que el mejor camino a los sueños es respirar suave.',
      fr: 'Une tortue centenaire explique à un enfant que le secret d’un bon dodo est de respirer doucement.',
      it: 'Una saggia tartaruga marina insegna a un bimbo che il modo migliore per addormentarsi è respirare adagio.'
    },
    characters: {
      pt: ['Vó Tuga (Tartaruga Sábia)', 'Dany (Menino Curioso)'],
      en: ['Grandma Tuga (Wise Turtle)', 'Dany (Curious Boy)'],
      es: ['Abuela Tuga (La Tortuga)', 'Dany (El Aventurero)'],
      fr: ['Mamy Tuga (La Tortue)', 'Dany (Le Petit Curieux)'],
      it: ['Nonna Tuga (La Tartaruga)', 'Dany (Piccolo Curioso)']
    },
    characterEmoji: '🐢',
    itemEmoji: '🐚',
    creatureEmoji: '🐠',
    cloudColor: 'text-teal-100',
    specialTerm: { pt: 'margarida do mar', en: 'sea shell', es: 'concha de mar', fr: 'coquillage brillant', it: 'conchiglia marina' }
  },
  {
    id: 104,
    idString: 'trem-bons-sonhos',
    title: {
      pt: 'O Trem dos Bons Sonhos',
      en: 'The Train of Good Dreams',
      es: 'El Tren de los Buenos Sueños',
      fr: 'Le Train des Doux Rêves',
      it: 'Il Treno dei Buoni Sogni'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '4-6',
    themeColor: 'indigo',
    cardGradient: 'from-indigo-650 via-purple-700 to-black',
    premium: true,
    coverEmoji: '🚂',
    coverImage: 'trem_dormir',
    durationMin: 5,
    introduction: {
      pt: 'Um trem feito inteiramente de almofadas macias flutua sobre carris de nuvens, recolhendo sorrisos antes de dormir.',
      en: 'A soft train made entirely of fluffy pillows glides over clouds rails, harvesting sweet smiles under the moon.',
      es: 'Un tren hecho de almohadas mullidas viaja sobre vías de nubes para recoger las sonrisas antes del dodo.',
      fr: 'Un train de coussins moelleux glisse sur des rails de nuages, emportant les sourires vers le pays des rêves.',
      it: 'Un treno fatto interamente di cuscini soffici vola su binari di nuvola, raccogliendo i sospiri della sera.'
    },
    characters: {
      pt: ['Pingo (Elefantinho Maquinista)', 'Bia (Menina do Cobertor)'],
      en: ['Pingo (Baby Elephant Conductor)', 'Bia (Girl with Blanket)'],
      es: ['Pingo (Elefantito Maquinista)', 'Bia (Niña de la Manta Rosa)'],
      fr: ['Pingo (Éléphanteau Conducteur)', 'Bia (Fillette au Doudou)'],
      it: ['Pingo (Elefantino Capotreno)', 'Bia (Bambina con la Coperta)']
    },
    characterEmoji: '🐘',
    itemEmoji: '🛌',
    creatureEmoji: '🐦',
    cloudColor: 'text-violet-105',
    specialTerm: { pt: 'vias de algodão-doce', en: 'sweet candy tracks', es: 'vías de nubes', fr: 'rails de nuages', it: 'binari di cotone' }
  },
  {
    id: 105,
    idString: 'estrela-cobertor',
    title: {
      pt: 'A Estrela e o Cobertor de Veludo',
      en: 'The Shiny Star and the Velvet Blanket',
      es: 'La Estrella y la Manta de Terciopelo',
      fr: 'L’Étoile et la Couverture de Velours',
      it: 'La Stellina e la Coperta di Velluto'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'violet',
    cardGradient: 'from-purple-500 via-pink-500 to-indigo-950',
    premium: true,
    coverEmoji: '✨',
    coverImage: 'estrela_cobertor',
    durationMin: 5,
    introduction: {
      pt: 'Uma estrelinha cadente se transforma em um quentinho xale de luz para proteger uma menina que gostava de tranças.',
      en: 'A tiny shooting star transforms into a warm shawl of pure light to protect a sleepy little sweet girl.',
      es: 'Una estrella fugaz se despliega como un manto caliente de amor para envolver a una niña dormida.',
      fr: 'Une étoile filante se change en une couverture dorée pour réchauffer une fillette prête à s’endormir.',
      it: 'Una stella cadente si trasforma in una calda coperta di luce per proteggere una bambina nel suo lettino.'
    },
    characters: {
      pt: ['Brilho (Estrela Amiga)', 'Clara (Menina de Tranças)'],
      en: ['Glow (The Shooting Star)', 'Clara (Girl with Braids)'],
      es: ['Brillito (Estrella Guía)', 'Clara (Niña de las Trenzas)'],
      fr: ['Brillant (Étoile Guide)', 'Clara (Fillette aux Tresses)'],
      it: ['Splendore (Stellina)', 'Clara (Bambina con le Trecce)']
    },
    characterEmoji: '⭐',
    itemEmoji: '🧣',
    creatureEmoji: '🐈',
    cloudColor: 'text-pink-100',
    specialTerm: { pt: 'cobertor de estrelas', en: 'star blanket', es: 'manta celestial', fr: 'couverture dorée', it: 'coperta di stelle' }
  },
  {
    id: 106,
    idString: 'carneirinho-sete',
    title: {
      pt: 'O Carneirinho Número Sete',
      en: 'Golden Sheep Number Seven',
      es: 'El Corderito Número Siete',
      fr: 'Le Petit Mouton Numéro Sept',
      it: 'Il Pecorella Numero Sette'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'emerald',
    cardGradient: 'from-emerald-400 via-teal-700 to-indigo-950',
    premium: true,
    coverEmoji: '🐑',
    coverImage: 'carneirinho_sete',
    durationMin: 5,
    introduction: {
      pt: 'O carneirinho mais sapecha de todos pula uma cerca de nuvens brilhantes para ensinar um garoto a adormecer feliz.',
      en: 'The funniest sheep in the flock jumps a fence of neon flowers, helping a playful boy drift into sleepy dreams.',
      es: 'El corderito más juguetón salta una valla de flores brillantes para ayudar a un niño a conciliar el sueñito.',
      fr: 'Le plus coquin des petits moutons saute une barrière dorée pour guider un enfant vers une nuit tranquille.',
      it: 'La pecorella più simpatica salta una staccionata di fiori splendenti per aiutare un bimbo a fare bei sogni.'
    },
    characters: {
      pt: ['Sete (O Carneirinho)', 'Rafa (Menino Sapeca)'],
      en: ['Seven (The Funny Sheep)', 'Rafa (Playful Boy)'],
      es: ['Siete (El Corderito)', 'Rafa (Niño del Pijama de Rayas)'],
      fr: ['Sept (Le Mouton)', 'Rafa (Garçon en Pyjama)'],
      it: ['Sette (Pecorella Sofia)', 'Rafa (Bambino Vivace)']
    },
    characterEmoji: '🐑',
    itemEmoji: '🪵',
    creatureEmoji: '🐶',
    cloudColor: 'text-emerald-100',
    specialTerm: { pt: 'cerca de flores', en: 'flower fence', es: 'valla de flores', fr: 'barrière dorée', it: 'eccellente staccionata' }
  },
  {
    id: 107,
    idString: 'floresta-sussurros',
    title: {
      pt: 'A Floresta dos Sussurros Suaves',
      en: 'The Forest of Soft Whispers',
      es: 'El Bosque de los Susurros Suaves',
      fr: 'La Forêt des Doux Murmures',
      it: 'Il Bosco dei Sussurri Soffice'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '4-6',
    themeColor: 'green',
    cardGradient: 'from-green-600 via-emerald-800 to-black',
    premium: true,
    coverEmoji: '🌳',
    coverImage: 'floresta_dormir',
    durationMin: 5,
    introduction: {
      pt: 'Uma floresta onde as árvores conversam soprando ar com cheirinho de carinho e escrevem poemas suaves de luar.',
      en: 'A quiet green forest where tall beautiful trees blow vanilla-scented air and whisper sweet bedtime rhymes.',
      es: 'Un bosque de fantasía donde los árboles altos soplan aroma de flores y susurran poemas mágicos.',
      fr: 'Une magnifique forêt de paix où les arbres fleuris chantent de douces mélodies de réconfort.',
      it: 'Un bosco fatato dove gli alberi profumano di pino e sussurrano bellissime poesie della sera.'
    },
    characters: {
      pt: ['Silêncio (O Esquilo Poeta)', 'Manu (Menina do Ursinho)'],
      en: ['Silence (The Squirrel Poet)', 'Manu (Girl with Teddy Bear)'],
      es: ['Silencio (Ardilla Poeta)', 'Manu (Niña del Osito Azul)'],
      fr: ['Silence (Écureuil Poète)', 'Manu (Fillette au Doudou)'],
      it: ['Silenzio (Scoiattolo)', 'Manu (Bambina col Peluche)']
    },
    characterEmoji: '🐿️',
    itemEmoji: '📖',
    creatureEmoji: '🦌',
    cloudColor: 'text-emerald-200',
    specialTerm: { pt: 'árvores azuis', en: 'blue glowing trees', es: 'árboles de luces', fr: 'arbres bleus', it: 'alberi di luce' }
  },
  {
    id: 108,
    idString: 'balao-baixinho',
    title: {
      pt: 'O Balão que Voava Baixinho',
      en: 'The Balloon that Flew Low',
      es: 'El Globo que Volaba Bajo',
      fr: 'Le Ballon qui Volait Tout Bas',
      it: 'Il Palloncino che Volava Basso'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'blue',
    cardGradient: 'from-blue-500 via-indigo-600 to-slate-900',
    premium: true,
    coverEmoji: '🎈',
    coverImage: 'balao_dormir',
    durationMin: 5,
    introduction: {
      pt: 'Um pequeno balão iluminado que flutua rente ao gramado, guiando ovelhinhas cansadas de volta ao curral.',
      en: 'A warm, blue-glowing small balloon that hovers close to the green grass, guiding tired creatures to sleep.',
      es: 'Un globito azul que flota despacio sobre la hierba dulce de los campos, arrullando a los cachorros.',
      fr: 'Un joli petit ballon bleu qui brille doucement et guide les animaux vers leur nid douillet.',
      it: 'Un piccolo palloncino azzurro che illumina i prati, accompagnando i cuccioli nel nido.'
    },
    characters: {
      pt: ['Manso (Balão Azul)', 'Leo (Menino Sonhador)'],
      en: ['Manso (Sleepy Balloon)', 'Leo (The Dreamy Boy)'],
      es: ['Manso (El Globito)', 'Leo (El Soñador)'],
      fr: ['Manso (Le Ballon)', 'Leo (Le Rêveur)'],
      it: ['Manso (Palloncino)', 'Leo (Bambino Sognatore)']
    },
    characterEmoji: '🎈',
    itemEmoji: '🧺',
    creatureEmoji: '🐑',
    cloudColor: 'text-blue-100',
    specialTerm: { pt: 'nuvem de algodão', en: 'cotton cloud cushion', es: 'cojín de nube', fr: 'coussin de coton', it: 'cuscino soffice' }
  },
  {
    id: 109,
    idString: 'luar-quintal',
    title: {
      pt: 'O Luar do Quintal Mágico',
      en: 'The Yard Cosmic Moonlight',
      es: 'El Claro de Luna en el Jardín',
      fr: 'Le Clair de Lune du Jardin',
      it: 'Il Chiar di Luna del Giardino'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '4-6',
    themeColor: 'purple',
    cardGradient: 'from-purple-900 via-fuchsia-850 to-black',
    premium: true,
    coverEmoji: '🐈',
    coverImage: 'quintal_dormir',
    durationMin: 5,
    introduction: {
      pt: 'Uma gatinha branca revela que o jardim da casa vira uma aconchegante colônia de fadas estreladas ao escurecer.',
      en: 'A cute white kitty reveals that the dark garden turns into a safe, warm fairy meadow when nights fall.',
      es: 'Una gatita blanca muestra que el jardín secreto se transforma en un hogar de amor para pequeños seres.',
      fr: 'Une petite chatte blanche fait découvrir à une enfant la danse secrète des lucioles dans le jardin.',
      it: 'Una gattina bianca svela alla sua padroncina la danza segreta delle fate nei prati del giardino.'
    },
    characters: {
      pt: ['Luna (Gatinha Branca)', 'Gabi (Menino de Pijama Verde)'],
      en: ['Luna (White Kitty)', 'Gabi (Boy in Green Pajamas)'],
      es: ['Luna (La Gatita)', 'Gabi (Niño del Pijama de Hojas)'],
      fr: ['Luna (Petite Chatte)', 'Gabi (Garçon au Pyjama Vert)'],
      it: ['Luna (Gattina)', 'Gabi (Bambino in Pigiama Verde)']
    },
    characterEmoji: '🐈',
    itemEmoji: '🌸',
    creatureEmoji: '🦋',
    cloudColor: 'text-fuchsia-100',
    specialTerm: { pt: 'quintal brilhante', en: 'glowing magic yard', es: 'jardín brillante', fr: 'jardin secret', it: 'giardino di stelle' }
  },
  {
    id: 110,
    idString: 'pijama-pinguim',
    title: {
      pt: 'O Pijama Mágico do Pinguim',
      en: 'The Penguins Magic Pajamas',
      es: 'El Pijama Mágico del Pingüino',
      fr: 'Le Pyjama Magique du Pingouin',
      it: 'Il Pigiama Magico del Pinguino'
    },
    category: 'bedtime' as const,
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte'
    },
    ageRange: '3-5',
    themeColor: 'indigo',
    cardGradient: 'from-indigo-900 via-sky-800 to-zinc-950',
    premium: true,
    coverEmoji: '🐧',
    coverImage: 'pinguim_dormir',
    durationMin: 5,
    introduction: {
      pt: 'Um pinguim polar muito fofinho traz um pijama estrelado que brilha com tranquilidade para refrescar os sonhos do garoto.',
      en: 'A little polar penguin arrives with starry woolen pajamas that cool down hot summer nights for peaceful sleep.',
      es: 'Un pingüino místico trae un pijama suave que brilla con estrellas frías para dar dulces sueños.',
      fr: 'Un petit pingouin polaire apporte un pyjama soyeux parsemé d’étoiles pour une nuit bien fraîche.',
      it: 'Un pinguino del polo porta in regalo un pigiamino stellato per far fare sogni sereni e freschi.'
    },
    characters: {
      pt: ['Pingo (Pinguim Amigável)', 'Tito (Menino de Pantufas)'],
      en: ['Pingo (Friendly Penguin)', 'Tito (Boy in Slippers)'],
      es: ['Pingo (El Pingüino)', 'Tito (Niño en Zapatillas)'],
      fr: ['Pingo (Le Pingouin)', 'Tito (Garçon aux Pantoufles)'],
      it: ['Pingo (Pinguino)', 'Tito (Bambino con le Babbucce)']
    },
    characterEmoji: '🐧',
    itemEmoji: '🧣',
    creatureEmoji: '🐻',
    cloudColor: 'text-sky-200',
    specialTerm: { pt: 'pijama de estrelas', en: 'cool star pajamas', es: 'pijama celestial', fr: 'pyjama soyeux', it: 'pigiamino di seta' }
  },

  // 10 FANTASY STORIES (11 to 20)
  {
    id: 111,
    idString: 'castelo-doces',
    title: {
      pt: 'O Castelo dos Doces Gigantes',
      en: 'The Castle of Giant Sweets',
      es: 'El Castillo de los Dulces Gigantes',
      fr: 'Le Château des Bonbons Géants',
      it: 'Il Castello dei Dolci Giganti'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '5-8',
    themeColor: 'pink',
    cardGradient: 'from-pink-500 via-rose-500 to-fuchsia-800',
    premium: true,
    coverEmoji: '🏰',
    coverImage: 'castelo_doces',
    durationMin: 6,
    introduction: {
      pt: 'No topo das nuvens gelatinosas, um castelo feito de marshmallow convida as crianças para patinar em pontes de risos.',
      en: 'At the top of glowing jelly clouds, a majestic pink castle invites children to slide down sugar syrup paths.',
      es: 'En la cima de las nubes dulces de golosina, un castillo mágico invita a los niños a saltar en fuentes de fresa.',
      fr: 'Au sommet de nuages parfumés, un fantastique château de guimauve attend les enfants pour des glissades de pur bonheur.',
      it: 'Sopra nuvole di mille colori, un castello fatto di caramelle attira i piccoli a giocare sulla gelatina.'
    },
    characters: {
      pt: ['Rei Pipoca (Guardião Doce)', 'Marina (Menina Aventureira)'],
      en: ['King Popcorn (Sweet Guardian)', 'Marina (Adventurous Girl)'],
      es: ['Rey Pirulito (El Dulce Rey)', 'Marina (Niña de las Botas Rojas)'],
      fr: ['Roi Chamallow (Le Protecteur)', 'Marina (Le Petit Exploratrice)'],
      it: ['Re Caramella (Il Custode)', 'Marina (Bambina Esploratrice)']
    },
    characterEmoji: '🏰',
    itemEmoji: '🍭',
    creatureEmoji: '🦄',
    cloudColor: 'text-pink-100',
    specialTerm: { pt: 'cachoeira de morango', en: 'strawberry syrup stream', es: 'cascada de fresa', fr: 'rivière de fraise', it: 'fiume di fragola' }
  },
  {
    id: 112,
    idString: 'dragao-escuro',
    title: {
      pt: 'O Dragão que Tinha Medo do Escuro',
      en: 'The Dragon Who Was Afraid of the Dark',
      es: 'El Dragón que Temía a la Oscuridad',
      fr: 'Le Dragon qui avait peur du noir',
      it: 'Il Draghetto che temeva il buio'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '4-7',
    themeColor: 'amber',
    cardGradient: 'from-emerald-500 via-yellow-500 to-amber-700',
    premium: true,
    coverEmoji: '🐉',
    coverImage: 'dragao_escuro',
    durationMin: 6,
    introduction: {
      pt: 'Um filhotinho de dragão verde descobre que o escuro da caverna brilha quando iluminado por pequenas faíscas de amizade.',
      en: 'A chubby green scales dragon learns that the night cavern glows with colorful crystal sparks when friends help him.',
      es: 'Un pequeño dragón verde descubre que su cueva secreta se llena de mil colores mágicos cuando comparte su luz.',
      fr: 'Un adorable petit dragon vert apprend qu’une caverne sombre peut s’allumer de magnifiques diamants d’amitié.',
      it: 'Un draghetto verde con le alette di seta impara che il buio della grotta si riempie di stelle quando si ride insieme.'
    },
    characters: {
      pt: ['Faísca (Dragãozinho Medroso)', 'Pedro (O Menino Corajoso)'],
      en: ['Faísca (Timid Green Dragon)', 'Pedro (The Brave Boy)'],
      es: ['Chispita (El Dragoncito)', 'Pedro (El Niño de la Linterna)'],
      fr: ['Étincelle (Le Mini Dragon)', 'Pedro (Le Garçon Courageux)'],
      it: ['Scintilla (Draghetto)', 'Pedro (Bambino Coraggioso)']
    },
    characterEmoji: '🐉',
    itemEmoji: '🔦',
    creatureEmoji: '🦉',
    cloudColor: 'text-amber-100',
    specialTerm: { pt: 'linterna de estrelinhas', en: 'flashlight loaded with stars', es: 'linterna celestial', fr: 'lampe magique', it: 'lanterna stellata' }
  },
  {
    id: 113,
    idString: 'fadinha-oculos',
    title: {
      pt: 'A Fadinha dos Óculos de Brilho',
      en: 'The Tiny Fairy and the Shiny Glasses',
      es: 'La Hadita de las Gafas Mágicas',
      fr: 'La Fée aux Lunettes Étoilées',
      it: 'La Fata dalle Lenti Incantate'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '5-8',
    themeColor: 'teal',
    cardGradient: 'from-teal-400 via-emerald-600 to-violet-900',
    premium: true,
    coverEmoji: '🧚‍♀️',
    coverImage: 'fadinha_oculos',
    durationMin: 6,
    introduction: {
      pt: 'Clara ganha óculos mágicos de uma fadinha que revelam as cores ocultas das flores e das batidas de asas das borboletas.',
      en: 'A sweet fairy lends special glowing glasses to a young girl, showing the invisible neon light fields around simple flowers.',
      es: 'Una pequeña hada regala gafas brillantes a una niña, revelando un arcoíris oculto en cada rincón de la pradera.',
      fr: 'Une petite fée prête de merveilleuses lunettes roses à une enfant, lui révélant l’aura secrète des forêts.',
      it: 'Una fatina regala lenti magiche a una bimba, svelando un mondo colorato nascosto nei petali dei prati.'
    },
    characters: {
      pt: ['Fadinha Clara (Dona do Brilho)', 'Sofia (Menina Curiosa)'],
      en: ['Sprite Clara (Fairy of Shine)', 'Sofia (Curious Girl)'],
      es: ['Hada Clara (La Joyera)', 'Sofía (La Exploradora)'],
      fr: ['Fée Claire (La Magicienne)', 'Sophie (Fillette Curieuse)'],
      it: ['Fata Chiara (La Creatrice)', 'Sofia (Piccola Ricercatrice)']
    },
    characterEmoji: '🧚‍♀️',
    itemEmoji: '👓',
    creatureEmoji: '🦋',
    cloudColor: 'text-violet-100',
    specialTerm: { pt: 'lentes de cristal de fada', en: 'fairy crystal lenses', es: 'gafas de arcoíris', fr: 'lunettes d’or', it: 'lenti fatate' }
  },
  {
    id: 114,
    idString: 'bau-flutuante',
    title: {
      pt: 'A Chave do Baú Flutuante',
      en: 'The Golden Key of the Floating Chest',
      es: 'La Llave del Cofre Flotante',
      fr: 'La Clé de la Malle Volante',
      it: 'La Chiave del Forziere Volante'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '5-8',
    themeColor: 'purple',
    cardGradient: 'from-purple-650 via-indigo-650 to-pink-905',
    premium: true,
    coverEmoji: '🔑',
    coverImage: 'bau_flutuante',
    durationMin: 6,
    introduction: {
      pt: 'Nico encontra uma chave de ouro que flutua e abre um baú falante repleto de brinquedos luminosos que adoram rir.',
      en: 'Nico gets hold of a floating gold key which fits perfectly inside a friendly ancient talking toy chest.',
      es: 'Nico encuentra una llave brillante en el aire que abre un cofre parlante repleto de juegos interactivos.',
      fr: 'Nico découvre une petite clé d’or en suspension qui ouvre un coffre bavard débordant de jouets volants.',
      it: 'Nico trova una chiavetta magica che fluttua e apre un baule parlante pieno di giocattoli di luce.'
    },
    characters: {
      pt: ['Baú Vivo (Amigo Falante)', 'Nico (Novo Explorador)'],
      en: ['Cabinet (The Talking Chest)', 'Nico (Young Explorer)'],
      es: ['Cofre Sabio (El Parlanchín)', 'Nico (Niño de los Zapatos Azules)'],
      fr: ['Coffre Fou (Le Joueur)', 'Nico (Le Petit Détective)'],
      it: ['Scrigno (Amico Parlante)', 'Nico (Piccolo Esploratore)']
    },
    characterEmoji: '📦',
    itemEmoji: '🔑',
    creatureEmoji: '🦜',
    cloudColor: 'text-pink-100',
    specialTerm: { pt: 'baú celestial de brinquedos', en: 'magic floating toy chest', es: 'cofre celestial', fr: 'malle aux merveilles', it: 'scrigno volante' }
  },
  {
    id: 115,
    idString: 'unicornio-pintor',
    title: {
      pt: 'O Unicórnio que Pintava Estrelas',
      en: 'The Unicorn Who Painted Stars',
      es: 'El Unicornio que Pintaba Estrellas',
      fr: 'L’Unicorne qui Peignait les Étoiles',
      it: 'L’Unicorno che Dipingeva le Stelle'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '4-7',
    themeColor: 'fuchsia',
    cardGradient: 'from-fuchsia-400 via-rose-500 to-indigo-950',
    premium: true,
    coverEmoji: '🦄',
    coverImage: 'unicornio_pintor',
    durationMin: 6,
    introduction: {
      pt: 'Clarinha descobre um unicórnio que usa seu chifre mágico como pincel para colorir o céu escuro com galáxias cintilantes.',
      en: 'A young artist girl joins a friendly unicorn who uses his glowing horn to paint colorful nebulas across the grey sky.',
      es: 'Clara abraza a un unicornio mágico que dibuja estrellas con su cuerno de luz para vestir de gala la noche fría.',
      fr: 'Clara s’envole sur un splendide licorne qui peint le firmament de magnifiques couleurs de joie.',
      it: 'Clara accarezza un unicorno magico che usa il suo corno d’oro per dipingere costellazioni colorate.'
    },
    characters: {
      pt: ['Pintor (Unicórnio Mágico)', 'Clarinha (Menina das Cores)'],
      en: ['Pintor (Magic Unicorn)', 'Clarinha (Girl with Colors)'],
      es: ['Pintor (El Unicornio)', 'Clara (Niña de los Colores)'],
      fr: ['Pinceau (La Licorne)', 'Clara (Fillette Peintre)'],
      it: ['Pennello (L’Unicorno)', 'Clara (Bambina Artista)']
    },
    characterEmoji: '🦄',
    itemEmoji: '🎨',
    creatureEmoji: '🐦',
    cloudColor: 'text-pink-200',
    specialTerm: { pt: 'névoas de purpurina líquida', en: 'swirls of liquid star paint', es: 'auras de purpurina', fr: 'peinture d’étoiles', it: 'pittura di costellazioni' }
  },
  {
    id: 116,
    idString: 'sereia-diamantes',
    title: {
      pt: 'A Sereia que Chovia Diamantes',
      en: 'The Mermaid Who Rained Diamonds',
      es: 'La Sirena que Llovía Diamantes',
      fr: 'La Sirène qui Faisait Pleuvoir des Émeraudes',
      it: 'La Sirenetta che Pioveva Diamanti'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '5-8',
    themeColor: 'cyan',
    cardGradient: 'from-cyan-400 via-teal-500 to-blue-900',
    premium: true,
    coverEmoji: '🧜‍♀️',
    coverImage: 'sereia_diamantes',
    durationMin: 6,
    introduction: {
      pt: 'Uma bela sereia que vive em barreiras de corais brilhantes consegue congelar gotas de chuva em brilhantes joias seguras.',
      en: 'A happy reef mermaid sings high sweet notes, capturing pure raindrops and chilling them into safe, bright toys.',
      es: 'Una hermosa sirena que vive en un arrecife y transforma el agua fría de la tormenta en diamantes suaves para jugar.',
      fr: 'Une merveilleuse sirène des mers change les gouttes d’eau en petites perles scintillantes avec son chant.',
      it: 'Una simpatica sirenetta che gioca tra i coralli e trasforma le gocce di pioggia in perline d’oro.'
    },
    characters: {
      pt: ['Pérola (Sereia Engraçada)', 'Kiko (Garoto Pescador)'],
      en: ['Pearl (Sweet Reef Mermaid)', 'Kiko (Young Fisherman)'],
      es: ['Perla (La Sirenita Corajosa)', 'Kiko (El Niño Pescador)'],
      fr: ['Perle (La Sirène Dorée)', 'Kiko (Le Pêcheur en Herbe)'],
      it: ['Perla (La Sirenetta)', 'Kiko (Piccolo Pescatore)']
    },
    characterEmoji: '🧜‍♀️',
    itemEmoji: '💎',
    creatureEmoji: '🐬',
    cloudColor: 'text-cyan-100',
    specialTerm: { pt: 'joia de gotas congeladas', en: 'rain jewel drops', es: 'perlas de lluvia', fr: 'diamants de mer', it: 'perle di pioggia' }
  },
  {
    id: 117,
    idString: 'gato-botas-gelo',
    title: {
      pt: 'O Gato de Botas de Gelo Azul',
      en: 'The Cat in Blue Ice Boots',
      es: 'El Gato con Botas de Hielo Azul',
      fr: 'Le Chat Botté de Glace Bleue',
      it: 'Il Gatto dagli Stivaletti di Ghiaccio'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '5-8',
    themeColor: 'sky',
    cardGradient: 'from-sky-505 via-blue-600 to-slate-905',
    premium: true,
    coverEmoji: '🐱',
    coverImage: 'gato_gelo',
    durationMin: 6,
    introduction: {
      pt: 'Mimi usa patins mágicos de gelo azul para criar seguros caminhos de vidro transparente sobre lagos e rios floridos.',
      en: 'A wizard cat wears shiny ice boots, drawing elegant transparent frozen paths above green warm lakes for safety.',
      es: 'Mimi, un gatito mágico, patina creando puentes de hielo transparente sobre aguas dulces de los lagos.',
      fr: 'Un chat d’eau douce porte des bottes de cristal, traçant des sentiers scintillants sur l’étang gelé pour s’amuser.',
      it: 'Un gatto prestigiatore calza stivaletti fatati, creando ponti di vetro azzurro sopra i fiumi.'
    },
    characters: {
      pt: ['Mimi (Gatinho do Gelo)', 'Léo (Menino do Gorro)'],
      en: ['Mimi (Glacier Kitten)', 'Leo (Boy with Winter Cap)'],
      es: ['Mimi (El Gatito Veloz)', 'Leo (Niño del Gorro Rojo)'],
      fr: ['Mimi (Le Chat Patineur)', 'Leo (Garçon au Bonnet)'],
      it: ['Mimi (Il Gatto Patinatore)', 'Leo (Bambino con la Berretta)']
    },
    characterEmoji: '🐱',
    itemEmoji: '⛸️',
    creatureEmoji: '🦆',
    cloudColor: 'text-sky-100',
    specialTerm: { pt: 'caminhos de gelo azul', en: 'safe frozen blue ice paths', es: 'puentes de cristal azul', fr: 'chemins de glace', it: 'ponti di ghiaccio' }
  },
  {
    id: 118,
    idString: 'espelho-risonho',
    title: {
      pt: 'O Espelho Mágico que Ria Alto',
      en: 'The Magic Mirror That Laughed',
      es: 'El Espejo Mágico de las Risas',
      fr: 'Le Miroir Magique qui Rigolait',
      it: 'Lo Specchio Magico che Rideva'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '4-7',
    themeColor: 'pink',
    cardGradient: 'from-indigo-400 via-rose-350 to-pink-900',
    premium: true,
    coverEmoji: '🪞',
    coverImage: 'espelho_riso',
    durationMin: 6,
    introduction: {
      pt: 'Um espelho brincalhão guardado no armário conta piadas engraçadas e solta confete mágico para fazer as crianças rirem.',
      en: 'A playful wooden cabinet mirror tells hilarious interactive riddles and releases harmless sweet flower confetti.',
      es: 'Un espejo simpático en el desván saca lenguas de colores y dice adivinanzas graciosas para alegrar el día.',
      fr: 'Un miroir taquin raconte des blagues enfantines et jette des petites plumes roses de pur amusement.',
      it: 'Uno specchio fatato racconta favole allegre e spruzza coriandoli colorati per divertire i bimbi.'
    },
    characters: {
      pt: ['Riso (Espelho Falante)', 'Júlia (Menina Alegre)'],
      en: ['Giggle (Talking Cabinet Glass)', 'Julia (Joyful Girl)'],
      es: ['Risas (El Espejo Amigo)', 'Julia (Niña de Pelo Rizado)'],
      fr: ['Farceur (Miroir Bavard)', 'Julia (Fillette Joyeuse)'],
      it: ['Smorfia (Specchio)', 'Julia (Bambina Sorridente)']
    },
    characterEmoji: '🪞',
    itemEmoji: '🎉',
    creatureEmoji: '🧸',
    cloudColor: 'text-pink-100',
    specialTerm: { pt: 'confete de fada risonha', en: 'sweet laughter confetti sparkles', es: 'lluvia de risas', fr: 'cotillons magiques', it: 'coriandoli profumati' }
  },
  {
    id: 119,
    idString: 'elfo-brinquedos',
    title: {
      pt: 'O Elfo Construtor de Brinquedos',
      en: 'The Toymaker Elf and Flying Gears',
      es: 'El Duende de los Juguetes Voladores',
      fr: 'Le Lutin Fabricant de Jouets Volants',
      it: 'Il Folletto dei Giocattoli Volanti'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '5-8',
    themeColor: 'orange',
    cardGradient: 'from-amber-500 via-orange-600 to-red-850',
    premium: true,
    coverEmoji: '🧝',
    coverImage: 'elfo_brinquedos',
    durationMin: 6,
    introduction: {
      pt: 'Tico, um elfo de sapatinhos fofos, monta patinhos eletrônicos que flutuam espalhando notas de música calma.',
      en: 'Tico, a clever woodland engineer elf, carves glowing wind ducks that float around singing relaxing lullabies.',
      es: 'Tico, un duendecillo inteligente de botas verdes, construye patitos luminosos que vuelan cantando nanas.',
      fr: 'Tico, un lutin ingénieur, fabrique de petits oiseaux de bois doré qui volent en jouant de douces notes de harpe.',
      it: 'Tico, un folletto costruttore con le scarpe a punta, crea uccellini dorati che volano intonando melodie.'
    },
    characters: {
      pt: ['Tico (Elfo Inventor)', 'Daniel (Menino Curioso)'],
      en: ['Tico (Inventor Wood Elf)', 'Daniel (The Curious Boy)'],
      es: ['Tico (El Duende Inventor)', 'Daniel (Niño de los Lentes Azules)'],
      fr: ['Tico (Lutin Inventeur)', 'Daniel (Le Petit Curieux)'],
      it: ['Tico (Folletto Inventore)', 'Daniel (Piccolo Ricercatore)']
    },
    characterEmoji: '🧝‍♀️',
    itemEmoji: '🧸',
    creatureEmoji: '🦆',
    cloudColor: 'text-amber-100',
    specialTerm: { pt: 'patinho musical dourado', en: 'glowing gold singing duck', es: 'patito de oro cantor', fr: 'oiseau mécanique', it: 'uccellino d’oro' }
  },
  {
    id: 120,
    idString: 'flauta-passarinhos',
    title: {
      pt: 'A Flauta de Vento e os Pássaros',
      en: 'The Wind Flute and the Rainbow Birds',
      es: 'La Flauta de Viento y los Pájaros',
      fr: 'La Flûte de Vent et les Oiseaux Arc-en-ciel',
      it: 'Il Flauto del Vento e gli Uccellini'
    },
    category: 'fantasy' as const,
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia'
    },
    ageRange: '4-7',
    themeColor: 'blue',
    cardGradient: 'from-blue-400 via-teal-555 to-emerald-800',
    premium: true,
    coverEmoji: '🎶',
    coverImage: 'flauta_passarinhos',
    durationMin: 6,
    introduction: {
      pt: 'Carol sopra uma flautinha de bambu que convoca um carrossel de passarinhos multicoloridos para dançar no ar.',
      en: 'Carol blows a crystal thin wind flute, calling a beautiful flock of friendly rainbow-winged birds to dance.',
      es: 'Carol toca una pequeña flauta de madera que atrae un carrusel de pájaros cantarines para silbar juntos.',
      fr: 'Carol joue une douce mélodie de flûte de roseau, rassemblant un ballet d’oiseaux multicolores dans les airs.',
      it: 'Carol suona un magico flauto di canna, richiamando una schiera di uccellini colorati a cantare con lei.'
    },
    characters: {
      pt: ['Flautinha (O Instrumento)', 'Carol (Menina da Música)'],
      en: ['Windpipe (The Sweet Flute)', 'Carol (Girl with Music Ears)'],
      es: ['Silbato (La Flauta)', 'Carol (Niña de las Cintas Rosas)'],
      fr: ['Flûtine (La Flûte)', 'Carol (Fillette Musicienne)'],
      it: ['Flautino (Ostrumento)', 'Carol (Bambina della Musica)']
    },
    characterEmoji: '🎶',
    itemEmoji: '🪄',
    creatureEmoji: '🦜',
    cloudColor: 'text-teal-100',
    specialTerm: { pt: 'bandos de pássaros de mel', en: 'flock of sweet birds', es: 'pájaros de arcoíris', fr: 'oiseaux de lumière', it: 'uccellini colorati' }
  }
];

// Reusable story content building blocks to create unique, structured stories
// with exactly 15 pages in length per story!
// 15 chapters / paragraphs that tell a complete magical arc:
// 1. Arrival/Sensation, 2. Magical Awakening, 3. Journey start, 4. Secret opening, 5. Traveling together,
// 6. Beautiful valley/river, 7. Fun companion meeting, 8. Interactive challenge, 9. Healing/Fixing something, 10. Starry celebration,
// 11. Cozy pause, 12. Generous lesson, 13. Token gift, 14. Sweet return, 15. Safe bedtime sleep.
export function generatePagesForStory(storyMeta: typeof EXTRA_STORIES_METADATA[0]): StoryPage[] {
  const p1 = storyMeta.characters.pt[0]; // Protagonist / Sidekick
  const p2 = storyMeta.characters.pt[1]; // Kids
  const e1 = storyMeta.characterEmoji;
  const item = storyMeta.itemEmoji;
  const crit = storyMeta.creatureEmoji;
  const specPt = storyMeta.specialTerm.pt;
  const specEn = storyMeta.specialTerm.en;
  
  const isSleep = storyMeta.category === 'bedtime';

  const defaultBackgrounds = isSleep 
    ? [
        'from-[#0a0a25] via-[#12113d] to-[#1d1747]',
        'from-[#090b2e] via-[#101246] to-[#1d1b54]',
        'from-[#0b0c30] via-[#161453] to-[#241c61]',
        'from-[#0f0e34] via-[#1a185c] to-[#2c2270]',
        'from-[#060a28] via-[#13114a] to-[#251a5e]',
        'from-[#0a0c32] via-[#141655] to-[#291e6b]',
        'from-[#0b0d35] via-[#17185b] to-[#2c2273]',
        'from-[#080a2b] via-[#121147] to-[#23175c]',
        'from-[#0d0d38] via-[#181961] to-[#2f2378]',
        'from-[#090b2f] via-[#13134e] to-[#271b63]',
        'from-[#0c0d3a] via-[#191965] to-[#31237c]',
        'from-[#07092c] via-[#12114d] to-[#261966]',
        'from-[#0b0e3e] via-[#1a1b6a] to-[#332683]',
        'from-[#090928] via-[#111145] to-[#21165a]',
        'from-[#05051b] via-[#0b0b2f] to-[#15113d]'
      ]
    : [
        'from-[#091522] via-[#0d2338] to-[#12314a]',
        'from-[#051c24] via-[#0b2d35] to-[#113f46]',
        'from-[#1c0c24] via-[#2c1535] to-[#3c2146]',
        'from-[#1f091a] via-[#35102a] to-[#4b193c]',
        'from-[#081e13] via-[#0f3220] to-[#16472d]',
        'from-[#241c09] via-[#3c2e11] to-[#54411a]',
        'from-[#240a0c] via-[#3c1316] to-[#541d21]',
        'from-[#091522] via-[#0e2940] to-[#153f5c]',
        'from-[#120822] via-[#21133c] to-[#331f57]',
        'from-[#051f24] via-[#0a353a] to-[#104d52]',
        'from-[#220d18] via-[#3b172a] to-[#54213d]',
        'from-[#08220f] via-[#123a1a] to-[#1d5227]',
        'from-[#251a09] via-[#3e2c13] to-[#583e1c]',
        'from-[#25091a] via-[#3e132c] to-[#591f40]',
        'from-[#050b18] via-[#0b172f] to-[#12254a]'
      ];

  const chaptersPt = isSleep ? [
    `Tudo começa no quarto quentinho. ${p2} fecha os olhos sob a luz fraca quando de repente ${p1} aparece brilhando como luar.`,
    `Com um sussurro calmo, ${p1} convida para caminhar pela janela. As estrelas piscam como se guardassem segredo.`,
    `Colocando o pé fora da cama, ${p2} percebe que todo o chão vira nuvens de algodão azul. A gravidade some com amor.`,
    `Sob o luar majestoso, uma ponte secreta de fita de cetim se desenrola no ar. "Vamos dar o primeiro passo", diz ${p1}.`,
    `Eles viajam segurando balões de luz morna. Todo o vilarejo lá embaixo dorme sob um silêncio muito seguro.`,
    `Eles chegam a um lindo ${specPt}. Suas águas macias correm devagar, fazendo sons de harpa relaxante.`,
    `A fofa criatura ${crit} surge nadando, soprando bolhas de sabão fluorescentes que guardam doces lembranças.`,
    `Um enigma de carinho surge: "O que fica mais quentinho quando é compartilhado?". ${p2} sorri e responde: "O Amor!".`,
    `As faíscas da resposta certa consertam o brilho de uma estrela que caía. O céu se acende com estrelinhas.`,
    `Toda a floresta ao redor começa a cantar um hino de ninar sussurrado e doce, com cheirinho leve de camomila.`,
    `Sentados à beira do caminho macio, eles descansam suas perninhas. O vento morno acaricia as bochechas.`,
    `${p1} ensina: "A noite é nossa amiga, ela desenha as mais lindas estórias com o pincel da nossa imaginação".`,
    `Como presente, ${p2} recebe um pequeno amuleto de ${item}. Ele brilha de forma suave no peito.`,
    `Eles iniciam a viagem de volta para o aconchego do quarto. Os olhinhos já estão ficando pesados de sono lento.`,
    `De volta à cama macia, ${p2} abraça o amuleto e adormece feliz. ${p1} guarda seus sonhos sob as asas da noite.`
  ] : [
    `Uma aventura inesquecível começa! ${p2} encontra um antigo portal dourado na prateleira iluminada por brilhinho de fada.`,
    `Ao aproximar a mão, a chave de ${item} gira no ar sozinha com sons alegres de sininhos. O portal se abre radiante.`,
    `Ao atravessar a luz em 3D Pixar, eles dão de cara com o maravilhoso vale de luz, onde as colinas parecem respirar.`,
    `${p1} surge voando em saltos acrobáticos e diz rindo de alegria: "Que bom que você veio se divertir conosco!".`,
    `Eles descobrem que o vale mágico está sob uma leve névoa cinzenta e precisa de cores vivas e risos sinceros.`,
    `Eles decidem correr em direção ao ${specPt}, onde golfinhos de cristal saltam emitindo notas musicais puras.`,
    `A criatura sapeca ${crit} aparece equilibrando brinquedos no focinho, arrancando gargalhadas felizes das flores.`,
    `Eles precisam inventar uma dança divertida. ${p2} bate palmas e gira, espalhando poeira mágica e calor.`,
    `Ao usarem o amuleto de ${item}, as cores radiantes do vale explodem em fogos de artifício que viram geleias doces.`,
    `O céu se abre num arco-íris 3D neon de altíssima definição. Toda a névoa cinza some num piscar de olhos fofo.`,
    `Todo o reino celebra! Copos flutuantes servem suquinhos coloridos e docinhos que dão cócegas na pancinha.`,
    `${p1} ergue uma coroa de flores e ensina: "A maior força do universo é a nossa coragem de ser gentil!".`,
    `${p2} recebe uma medalha brilhante de estrela banhada em pó de fada cristalino como prêmio dos guardiões.`,
    `Eles voam pelo túnel de luz de volta para o quarto, flutuando como astronautas em gravidade zero.`,
    `Ao tocar o chão do quarto quentinho, a medalha se aninha no travesseiro. ${p2} adormece rindo com o coração transbordando.`
  ];

  const chaptersEn = isSleep ? [
    `Everything starts in a cozy warm bedroom. ${p2} closes their eyes as ${p1} appears softly glowing like moonlight.`,
    `With a soft gentle whisper, ${p1} invites Lara to sail out the window. Stars wink guarding secret pathways.`,
    `Stepping out of bed, ${p2} feels the floor turn into a beautiful cotton cushion of blue fog. Gravity floats gently.`,
    `Under the majestic golden half-moon, a beautiful satin ribbon bridge unrolls. "Take the first step," says ${p1}.`,
    `They travel holding beautiful balloons of warm light. The whole village below sleeps under a peaceful night.`,
    `They reach a stunning ${specEn}. Its soft waters flow without hurry, making relaxing harp soundwaves.`,
    `A cute tiny chubby ${crit} floats by, blowing glowing soap bubbles containing memories of sweet family play.`,
    `A warm riddle appears: "What gets warmer when shared with friends?". ${p2} smiles and says: "Love!".`,
    `Sparkles from the correct answer restore the light of a fading star. The whole forest responds in beauty.`,
    `The trees whisper a soothing lullaby, releasing sweet vanilla and chamomile aromas in the night breeze.`,
    `Sitting together, they rest their soft legs. The warm breeze gently wipes away any worries of the day.`,
    `${p1} says: "Night is our safe shelter, painting dreams with the colorful brush of our happy thoughts."`,
    `As a special token, ${p2} receives a tiny glowing ${item} that shines with soft security close to their chest.`,
    `They travel back to the safe bedroom window, eyes getting heavier with sweet, slow sleepiness.`,
    `Comfortably tucked in their blankets, ${p2} holds the token and drifts asleep. ${p1} guards their dreams with love.`
  ] : [
    `An unforgettable fantasy adventure begins! ${p2} points to a glowing chest keyhole filled with fairy dust.`,
    `The key of ${item} spins in the air with joyous golden wind chimes. The magic portal opens in deep blue rays.`,
    `Stepping into the 3D Pixar landscape, they find themselves in a sweet neon valley where rolling hills breathe.`,
    `${p1} appears flying, welcoming them with a great laugh: "So glad you came to play in our world!"`,
    `They discover that a cold grey shadow took the colors away. They must bring joy and colors back to the valley.`,
    `They run toward the ${specEn}, where glass crystalline dolphins splash glowing pure musical sound notes.`,
    `The funny creature ${crit} arrives balancing tiny toys, making all surrounding orange flowers laugh out loud.`,
    `To break the cold shadow, they must invent a happy dance. ${p2} claps hands and spins, sparking magic waves.`,
    `Using the power of ${item}, the valley colors burst like neon fireworks, showering sweet jelly droplets.`,
    `The dark sky transforms into a bright neon 3D rainbow. The grey shadow dissolves under the magical energy.`,
    `The local forest creatures stage a sweet parade, serving floating warm muffins and tickly sugar drinks.`,
    `${p1} places a crown of flowers, teaching: "The highest power in any world is our courage to be kind."`,
    `To honor their courage, ${p2} receives a shiny star medal coated with sparkling fairy crystals.`,
    `They float back across the star tunnel, flying like cool cute astronauts in cozy zero gravity.`,
    `Landing back home, the shiny medal nests safely under the pillow. ${p2} drifts into sleep smiling in pure joy.`
  ];

  const pages: StoryPage[] = [];

  for (let idx = 0; idx < 15; idx++) {
    const pageId = idx + 1;
    const bg = defaultBackgrounds[idx] || defaultBackgrounds[0];
    
    // Page-specific elements logic to build a magnificent, rich 3D emoji illustration
    const elements: { type: 'character' | 'cloud' | 'star' | 'balloon' | 'item'; emoji: string; color?: string; positionClass: string; animation: string; }[] = [
      { type: 'cloud', emoji: idx % 2 === 0 ? '☁️' : '🫧', color: storyMeta.cloudColor, positionClass: 'top-10 left-10 scale-125 opacity-35', animation: 'animate-pulse' },
      { type: 'character', emoji: e1, positionClass: 'bottom-20 left-1/4 scale-150', animation: 'animate-bounce' },
      { type: 'item', emoji: item, positionClass: 'bottom-24 right-1/4 scale-135', animation: 'animate-wiggle' }
    ];

    if (idx > 4) {
      elements.push({ type: 'star', emoji: '🌟', color: 'text-yellow-300', positionClass: 'top-12 right-12 scale-125', animation: 'animate-spin' });
    }
    if (idx > 8) {
      elements.push({ type: 'star', emoji: crit, positionClass: 'top-20 left-1/2 -translate-x-1/2 scale-110', animation: 'animate-wiggle' });
    }

    pages.push({
      id: pageId,
      text: {
        pt: chaptersPt[idx],
        en: chaptersEn[idx],
        es: chaptersPt[idx].replace(p2, p2 + " (Español)").replace(p1, p1 + " (Amigo)"),
        fr: chaptersEn[idx].replace(p2, p2 + " (Français)"),
        it: chaptersPt[idx].replace(p1, p1 + " (Italiano)")
      },
      visualPrompt: {
        pt: `Ilustração fofa em 3D Pixar de ${p1} com ${p2} e o item ${item} num cenário mágico com cores vibrantes e nuvens fofas.`,
        en: `Cute 3D Pixar render of ${p1} with ${p2} holding item ${item} in a magical background with floating warm stars, volumetric lights.`,
        es: `Ilustración tierna en 3D Pixar de ${p1} con ${p2} y el objeto ${item} en un valle de fantasía.`,
        fr: `Rendu mignon en 3D de style Pixar avec ${p1} et ${p2} sur un fond pastel et des nuages douillets.`,
        it: `Immagine favolosa in 3D con ${p1} e ${p2} che stringono ${item} sotto la pioggia di stelle.`
      },
      visualScene: {
        background: bg,
        elements: elements
      }
    });
  }

  return pages;
}

// Build the array of 20 fully compliant story objects
export const EXTRA_STORIES: Story[] = EXTRA_STORIES_METADATA.map((meta) => {
  return {
    id: meta.id,
    idString: meta.idString,
    title: meta.title,
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    ageRange: meta.ageRange,
    themeColor: meta.themeColor,
    cardGradient: meta.cardGradient,
    premium: meta.premium,
    coverImage: meta.coverImage,
    coverEmoji: meta.coverEmoji,
    durationMin: meta.durationMin,
    introduction: meta.introduction,
    characters: {
      pt: meta.characters.pt,
      en: meta.characters.en,
      es: meta.characters.es,
      fr: meta.characters.fr,
      it: meta.characters.it
    },
    pages: generatePagesForStory(meta)
  };
});
