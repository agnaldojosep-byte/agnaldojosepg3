import { Story, Language, AppTranslation } from '../types';
import { EXTRA_STORIES } from './extraStories';
import { FORTY_STORIES } from './fortyStories';

export const CATEGORY_ICONS: Record<string, string> = {
  ventures: 'Compass',
  animals: 'Sparkles',
  bedtime: 'Moon',
  education: 'GraduationCap',
  fantasy: 'Wand2',
  space: 'Rocket',
  royals: 'Crown',
};

export const APP_TRANSLATIONS: Record<Language, AppTranslation> = {
  pt: {
    title: 'Mundo das Estorinhas',
    subtitle: 'O portal mágico de aventuras 3D para sonhar, rir e crescer!',
    exploreCategories: 'Encontre a Próxima Magia',
    readWithAudio: 'Ler com Vozzinha',
    readAlone: 'Ler Sozinho 📖',
    backToHome: 'Voltar ao Livro Aberto',
    nextPage: 'Próxima Página',
    prevPage: 'Voltar Página',
    pageOf: 'Página de',
    premiumStatusSection: 'Reino Premium',
    unlockPremium: 'Desbloquear Todo o Reino 👑',
    parentsArea: 'Área Secreta dos Pais 🔒',
    safetyMathTitle: 'Portal Secreto do Conhecimento',
    safetyMathDesc: 'Para garantir o acesso de adultos e proteger as criancinhas, resolva este desafio mágico:',
    solveToProceed: 'Quanto é',
    correctAnswer: 'A resposta está certa! Portal Secreto Aberto!',
    incorrectAnswer: 'Voz mágica diz: Resposta errada! Tente outra vez.',
    close: 'Fechar Janela',
    charactersTitle: 'Amiguinhos da História:',
    premiumRequiredTitle: 'História trancada pelo dragão!',
    premiumRequiredText: 'Esta historinha faz parte do Clube Encantado Premium. Peça ajuda a um adulto para libertar todas as histórias!',
    subscribeNow: 'Entrar no Clube Premium',
    monthlyPlanPrice: 'R$ 14,90/mês (ou € 2.99 / US$ 2.99)',
    choosePlan: 'Assinar Plano Celestial',
    freePlan: 'Reino Grátis',
    proPlan: 'Reino Premium Celestial',
    premiumUnlockSuccess: 'Parabéns! Você agora faz parte do Grande Clube das Histórias Mágicas! 🌟✨',
    completedStoryMessage: 'Você leu até o fim! Ganhou uma estrela brilhante de presente! 🌟',
    repeatPage: 'Ouvir de Novo 🔊',
    autoScroll: 'Auto-Leitura ⏱️',
    narrationSpeed: 'Velocidade da Voz',
    voiceSelect: 'Estilo da Voz',
    voiceMale: 'Voz Amigo Gabriel 👦',
    voiceFemale: 'Voz Amiga Marina 👧',
    guideWel: 'Olá, amiguinho! Sou a Estrelinha Guia! Qual aventura vamos viver hoje?',
    playMusic: 'Música Mágica de Fundo',
    adjustVolume: 'Som',
  },
  en: {
    title: 'World of Lil Stories',
    subtitle: 'The magical portal of 3D adventures to dream, laugh & grow!',
    exploreCategories: 'Find Your Next Adventure',
    readWithAudio: 'Read with Voice 🎙️',
    readAlone: 'Read Alone 📖',
    backToHome: 'Back to Open Book',
    nextPage: 'Next Page',
    prevPage: 'Previous Page',
    pageOf: 'Page of',
    premiumStatusSection: 'Premium Club',
    unlockPremium: 'Unlock the Entire Kingdom 👑',
    parentsArea: 'Parents Secret Gate 🔒',
    safetyMathTitle: 'Guardian Secret Portal',
    safetyMathDesc: 'To ensure adult access and shield children, solve this magical riddle:',
    solveToProceed: 'How much is',
    correctAnswer: 'Perfect! The secret portal is open!',
    incorrectAnswer: 'Magical force whispers: Wrong answer! Give it another try!',
    close: 'Close Window',
    charactersTitle: 'Story Companions:',
    premiumRequiredTitle: 'Story locked by the gentle dragon!',
    premiumRequiredText: 'This story belongs to the Premium Enchanted Club. Ask an adult to unlock all stories!',
    subscribeNow: 'Join the Premium Club',
    monthlyPlanPrice: '$2.99/month',
    choosePlan: 'Get Celestial Plan',
    freePlan: 'Free Kingdom',
    proPlan: 'Celestial Premium Access',
    premiumUnlockSuccess: 'Congratulations! You are now a member of the Premium Storytellers Guild! 🌟✨',
    completedStoryMessage: 'You finished the story! You received a shiny magic star! 🌟',
    repeatPage: 'Hear Again 🔊',
    autoScroll: 'Auto Play ⏱️',
    narrationSpeed: 'Voice speed',
    voiceSelect: 'Voice Style',
    voiceMale: 'Friendly Gabriel 👦',
    voiceFemale: 'Friendly Marina 👧',
    guideWel: 'Hi little friend! I’m Little Star! What magic world should we visit today?',
    playMusic: 'Magical Background Music',
    adjustVolume: 'Sound',
  },
  es: {
    title: 'Mundo de las Historietas',
    subtitle: '¡El portal de aventuras 3D para soñar, reír y crecer con luz!',
    exploreCategories: 'Encuentra Tu Próxima Magia',
    readWithAudio: 'Leer con Voz 🎙️',
    readAlone: 'Leer Solo 📖',
    backToHome: 'Volver al Libro Abierto',
    nextPage: 'Siguiente Página',
    prevPage: 'Página Anterior',
    pageOf: 'Página de',
    premiumStatusSection: 'Reino Premium',
    unlockPremium: 'Desbloquear Todo el Reino 👑',
    parentsArea: 'Zona Secreta de los Padres 🔒',
    safetyMathTitle: 'Portal Secreto del Saber',
    safetyMathDesc: 'Para asegurar el acceso de adultos y cuidar de los niños, resuelve este acertijo:',
    solveToProceed: 'Cuánto es',
    correctAnswer: '¡Respuesta correcta! ¡Portal Secreto Abierto!',
    incorrectAnswer: 'Voz misteriosa susurra: Respuesta incorrecta, ¡inténtalo de nuevo!',
    close: 'Cerrar Ventana',
    charactersTitle: 'Amiguitos de la Historia:',
    premiumRequiredTitle: '¡Historia guardada por el dragón!',
    premiumRequiredText: 'Esta historieta es exclusiva del Club Celestial Premium. ¡Pide ayuda a un adulto para abrir el portal!',
    subscribeNow: 'Unirse al Club Premium',
    monthlyPlanPrice: '€2.99/mes',
    choosePlan: 'Elegir Plan Celestial',
    freePlan: 'Reino Gratis',
    proPlan: 'Reino Premium Celestial',
    premiumUnlockSuccess: '¡Enhorabuena! ¡Ahora eres parte del Club de Aventuras Mágicas! 🌟✨',
    completedStoryMessage: '¡Completado! ¡Has ganado una pequeña estrella brillante! 🌟',
    repeatPage: 'Escuchar de nuevo 🔊',
    autoScroll: 'Auto-Lección ⏱️',
    narrationSpeed: 'Velocidad de voz',
    voiceSelect: 'Estilo de voz',
    voiceMale: 'Voz de Gabriel 👦',
    voiceFemale: 'Voz de Marina 👧',
    guideWel: '¡Hola amiguito! ¡Soy Estrellita Guía! ¿Qué hermosa aventura viviremos hoy?',
    playMusic: 'Música de Fondo Mágica',
    adjustVolume: 'Volumen',
  },
  fr: {
    title: 'Monde des Historiettes',
    subtitle: 'Le livre magique d’aventures 3D pour rêver, rire et s’épanouir !',
    exploreCategories: 'Trouvez Votre Prochaine Magie',
    readWithAudio: 'Lire avec Voix 🎙️',
    readAlone: 'Lire Seul 📖',
    backToHome: 'Retour au Livre Ouvert',
    nextPage: 'Page Suivante',
    prevPage: 'Page Précédente',
    pageOf: 'Page de',
    premiumStatusSection: 'Royaume Premium',
    unlockPremium: 'Déverrouiller tout le Royaume 👑',
    parentsArea: 'Espace Secret des Parents 🔒',
    safetyMathTitle: 'Portail de Sécurité des Adultes',
    safetyMathDesc: 'Pour protéger les petits enfants, veuillez résoudre ce calcul magique :',
    solveToProceed: 'Combien fait',
    correctAnswer: 'Bonne réponse ! Portail ouvert avec succès !',
    incorrectAnswer: 'Une fée murmure : Mauvaise réponse, réessaie !',
    close: 'Fermer',
    charactersTitle: 'Copains de l’Histoire :',
    premiumRequiredTitle: 'Une histoire bien gardée !',
    premiumRequiredText: 'Cette histoire appartient au club Premium. Demandez à un adulte de libérer les contes !',
    subscribeNow: 'S’abonner au Club Premium',
    monthlyPlanPrice: '2,99 €/mois',
    choosePlan: 'Prendre l’abonnement céleste',
    freePlan: 'Royaume Gratuit',
    proPlan: 'Royaume Premium Céleste',
    premiumUnlockSuccess: 'Félicitations ! Vous êtes membre officiel du Club des Étoiles ! 🌟✨',
    completedStoryMessage: 'Tu as fini l’histoire ! Voici une étoile brillante pour toi ! 🌟',
    repeatPage: 'Écouter à Nouveau 🔊',
    autoScroll: 'Lecture Auto ⏱️',
    narrationSpeed: 'Vitesse de voix',
    voiceSelect: 'Style de Voix',
    voiceMale: 'Voix Gabriel 👦',
    voiceFemale: 'Voix Marina 👧',
    guideWel: 'Coucou mon petit ami ! Je suis l’Étoile Guide. Quel monde magique va-t-on explorer aujourd’hui ?',
    playMusic: 'Musique Douce de Fond',
    adjustVolume: 'Son',
  },
  it: {
    title: 'Mondo delle Storielle',
    subtitle: 'Il portale incantato di storie 3D per sognare, sorridere e imparare!',
    exploreCategories: 'Trova la Tua Prossima Magia',
    readWithAudio: 'Leggi con Voce 🎙️',
    readAlone: 'Leggi da Solo 📖',
    backToHome: 'Torna al Libro Aperto',
    nextPage: 'Pagina Successiva',
    prevPage: 'Pagina Precedente',
    pageOf: 'Pagina di',
    premiumStatusSection: 'Club Premium',
    unlockPremium: 'Sblocca Tutto l’Impero 👑',
    parentsArea: 'Area Sicurezza Genitori 🔒',
    safetyMathTitle: 'Portale Magico del Guardiano',
    safetyMathDesc: 'Per proteggere i bambini e consentire l’accesso solo agli adulti, risolvi questo enigma:',
    solveToProceed: 'Quanto fa',
    correctAnswer: 'Risposta corretta! Portale aperto!',
    incorrectAnswer: 'Un soffio fatato dice: Risposta errata! Riprova, piccolo!',
    close: 'Chiudi',
    charactersTitle: 'Piccoli Amici della Storia:',
    premiumRequiredTitle: 'La storia è racchiusa in una gemma!',
    premiumRequiredText: 'Questo racconto magico è protetto nel Club Premium. Fatti aiutare da mamma o papà per liberarlo!',
    subscribeNow: 'Abbonati al Club Premium',
    monthlyPlanPrice: '2,99 €/mese',
    choosePlan: 'Scegli Piano Stellare',
    freePlan: 'Regno Libero',
    proPlan: 'Regno Premium Stellare',
    premiumUnlockSuccess: 'Evviva! Ora fai parte del Club Prodigioso delle Fiabe! 🌟✨',
    completedStoryMessage: 'Hai letto tutto il racconto! Ecco a te una bellissima stella d’oro! 🌟',
    repeatPage: 'Ascolta di Nuovo 🔊',
    autoScroll: 'Auto-Avvio ⏱️',
    narrationSpeed: 'Velocità voce',
    voiceSelect: 'Stile della voce',
    voiceMale: 'Voce Gabriel 👦',
    voiceFemale: 'Voce Marina 👧',
    guideWel: 'Ciao piccolino! Sono Stellina la Guida! Quale meraviglioso pianeta sveleremo oggi?',
    playMusic: 'Dolce Musica di Sottofondo',
    adjustVolume: 'Audio',
  },
  de: {
    title: 'Geschichtenwelt',
    subtitle: 'Das magische Portal für 3D-Abenteuer zum Träumen, Lachen und Wachsen!',
    exploreCategories: 'Finde deine nächste Magie',
    readWithAudio: 'Mit Stimme vorlesen 🎙️',
    readAlone: 'Selbst lesen 📖',
    backToHome: 'Zurück zum offenen Buch',
    nextPage: 'Nächste Seite',
    prevPage: 'Vorherige Seite',
    pageOf: 'Seite von',
    premiumStatusSection: 'Premium-Reich',
    unlockPremium: 'Schalte das ganze Reich frei 👑',
    parentsArea: 'Geheimer Elternbereich 🔒',
    safetyMathTitle: 'Geheimes Portal des Wissens',
    safetyMathDesc: 'Um den Zugang für Erwachsene zu gewährleisten und die Kinder zu schützen, löse dieses magische Rätsel:',
    solveToProceed: 'Wie viel ist',
    correctAnswer: 'Richtige Antwort! Geheimes Portal geöffnet!',
    incorrectAnswer: 'Eine magische Stimme sagt: Falsche Antwort! Versuch es noch einmal.',
    close: 'Schließen',
    charactersTitle: 'Charaktere in dieser Geschichte:',
    premiumRequiredTitle: 'Diese Geschichte ist durch einen Drachen gesperrt!',
    premiumRequiredText: 'Diese Geschichte ist Teil des Premium-Clubs. Bitte fragen Sie einen Erwachsenen, um alle Geschichten freizuschalten!',
    subscribeNow: 'Tritt dem Premium-Club bei',
    monthlyPlanPrice: 'R$ 14,90/Monat (oder € 2.99 / US$ 2.99)',
    choosePlan: 'Himmelsplan wählen',
    freePlan: 'Gratis-Reich',
    proPlan: 'Himmlisches Premium-Reich',
    premiumUnlockSuccess: 'Herzlichen Glückwunsch! Du bist jetzt Teil des großen magischen Geschichtenclubs! 🌟✨',
    completedStoryMessage: 'Du hast die Geschichte zu Ende gelesen! Du hast einen glänzenden Stern geschenkt bekommen! 🌟',
    repeatPage: 'Nochmal anhören 🔊',
    autoScroll: 'Automatisches Lesen ⏱️',
    narrationSpeed: 'Vorlesegeschwindigkeit',
    voiceSelect: 'Stimmenstil',
    voiceMale: 'Stimme Freund Gabriel 👦',
    voiceFemale: 'Stimme Freundin Marina 👧',
    guideWel: 'Hallo kleiner Freund! Ich bin der Wegweiser-Stern! Welches magische Abenteuer wollen wir heute erleben?',
    playMusic: 'Magische Hintergrundmusik',
    adjustVolume: 'Lautstärke',
  },
  zh: {
    title: '小故事大世界',
    subtitle: '3D奇幻冒险门户，伴随宝贝做梦、欢笑与成长！',
    exploreCategories: '寻找下一个魔法',
    readWithAudio: '伴读配音 🎙️',
    readAlone: '自主阅读 📖',
    backToHome: '返回主页',
    nextPage: '下一页',
    prevPage: '上一页',
    pageOf: '页码',
    premiumStatusSection: '高级会员专属',
    unlockPremium: '解锁全部魔法世界 👑',
    parentsArea: '家长验证锁 🔒',
    safetyMathTitle: '知识的秘密传送门',
    safetyMathDesc: '为确保家长操作并保护小朋友，请解答这道魔法谜题：',
    solveToProceed: '计算答案：',
    correctAnswer: '回答正确！传送门已开启！',
    incorrectAnswer: '精灵低语：答案不对哦！再试一次吧！',
    close: '关闭窗口',
    charactersTitle: '故事主角：',
    premiumRequiredTitle: '故事被喷火龙锁住了！',
    premiumRequiredText: '此故事是高级会员独享。请向爸爸妈妈寻求帮助，一起解开所有魔法故事吧！',
    subscribeNow: '加入高级俱乐部',
    monthlyPlanPrice: 'R$ 14,90/月 (或 € 2.99 / US$ 2.99)',
    choosePlan: '订阅星空计划',
    freePlan: '免费王国',
    proPlan: '星空至尊王国',
    premiumUnlockSuccess: '恭喜你！现在你已加入伟大的魔法故事俱乐部！🌟✨',
    completedStoryMessage: '你读完了整本书！获得了一颗闪亮的星星奖励！🌟',
    repeatPage: '重听配音 🔊',
    autoScroll: '自动翻页 ⏱️',
    narrationSpeed: '朗读速度',
    voiceSelect: '朗读人风格',
    voiceMale: '童音好友 嘉宝 👦',
    voiceFemale: '甜心好友 娜娜 👧',
    guideWel: '嗨！小朋友！我是你的指路小星星！今天我们要一起体验哪段奇妙的冒险呢？',
    playMusic: '温和背景音乐',
    adjustVolume: '音量调节',
  }
};

const INITIAL_STORIES: Story[] = [
  {
    id: 1,
    idString: 'wool-stars',
    title: {
      pt: 'O Voo das Estrelas de Lã',
      en: 'The Flight of Woolen Stars',
      es: 'El Vuelo de las Estrellas de Lana',
      fr: 'Le Vol des Étoiles de Laine',
      it: 'Il Volo delle Stelle di Lana',
    },
    category: 'bedtime',
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte',
    },
    ageRange: '3-5',
    themeColor: 'indigo',
    cardGradient: 'from-blue-600 via-indigo-600 to-purple-800',
    premium: false,
    coverEmoji: '🐰',
    coverImage: 'coelho_pijama',
    durationMin: 3,
    introduction: {
      pt: 'Um lindo coelhinho de pelúcia azul ganha vida sob a luz suave da lua de quarto e convida uma menina de pijamas listrados para voar pelos céus estelares.',
      en: 'A soft blue plush bunny comes to life under the warm bedroom moonlight and invites a little girl in striped pajamas to join an aerial starry flight.',
      es: 'Un tierno conejito de peluche azul cobra vida bajo la luz de la luna y abraza a una niña en pijama de rayas para emprender un viaje por los cielos.',
      fr: 'Un petit lapin en peluche bleu s’éveille sous les lueurs de la lune et emmène une fillette en pyjama rayé pour une danse à travers la voûte céleste.',
      it: 'Un morbido coniglietto azzurro prende vita sotto i raggi d’argento della luna e invita una bimba in pigiama a strisce a volare alto nel cielo stellato.'
    },
    characters: {
      pt: ['Duda (Menina de Pijamas)', 'Fofinho (Coelho de Lã Azul)'],
      en: ['Dina (Girl in Pajamas)', 'Fluffy (Cute Blue Woolen Bunny)'],
      es: ['Dina (Niña de Pijamas)', 'Peluchito (Conejito de Lana Azul)'],
      fr: ['Léna (Fillette en Pyjama)', 'Câlinou (Lapin Bleu de Laine)'],
      it: ['Lina (Bambina in Pigiama)', 'Morbido (Coniglietto di Lana)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Duda estava quase dormindo quando viu seu coelho de lã azul, o Fofinho, piscar o olho direito. Sob a luz dourada do quarto, ele deu um pulo alegre e esticou as mãozinhas fofas convidando ela para flutuar.',
          en: 'Duda was almost asleep when she saw her soft blue woolen bunny, Fluffy, wink his right eye. Under the glowing golden bedroom lamp, he gave an affectionate jump and held her hands, inviting her to float.',
          es: 'Dina estaba a punto de dormirse cuando vio a su conejito de lana azul, Peluchito, guiñar su ojo derecho. Bajo la cálida luz dorada, dio un salto alegre y le ofreció sus manos para flotar.',
          fr: 'Léna s’endormait doucement quand elle vit son petit lapin bleu, Câlinou, lui faire un clin d’œil. Sous la douce lumière de la chambre, il fit un bond joyeux et lui tendit les pattes pour s’envoler.',
          it: 'Lina si stava per addormentare quando vide il suo coniglietto di lana azzurro, Morbido, strizzare l’occhio. Sotto la luce dorata, saltò allegramente fuori dal letto per invitarla a volare.'
        },
        visualPrompt: {
          pt: 'Quarto aconchegante iluminado pela lua, menininha fofa de pijama azul listrado de mãos dadas com coelho azul fofinho em 3D brilhando.',
          en: 'Cozy bedroom lit by a golden half-moon, cute little girl in striped pajamas holding hands with a glowing 3D soft blue bunny.',
          es: 'Cuarto acogedor iluminado por la luna, niña dulce en pijama de rayas de la mano con conejo azul adorable parpadeante estilo Pixar 3D.',
          fr: 'Chambre chaleureuse éclairée par la lune, jolie petite fille en pyjama rayé tenant la patte d’un mignon doudou lapin bleu brillant en 3D.',
          it: 'Cameretta calda illuminata dal chiarore della luna, bambina carina in pigiama a strisce che stringe la zampa di un dolcissimo coniglietto 3D.'
        },
        visualScene: {
          background: 'from-slate-900 via-indigo-950 to-purple-900',
          elements: [
            { type: 'cloud', emoji: '☁️', color: 'text-indigo-200', positionClass: 'top-10 left-10 scale-125 opacity-40', animation: 'animate-pulse' },
            { type: 'character', emoji: '👧', color: '', positionClass: 'bottom-20 left-1/4 scale-150', animation: 'group-hover:scale-110 transition-transform' },
            { type: 'character', emoji: '🐰', color: 'text-blue-400', positionClass: 'bottom-20 right-1/4 scale-150', animation: 'animate-bounce' },
            { type: 'star', emoji: '🌟', color: 'text-yellow-300', positionClass: 'top-16 right-20 scale-110', animation: 'animate-wiggle' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'Eles subiram pela janela em direção ao céu e viram uma grande ponte de arco-íris feita de fios coloridos! Em cima de uma nuvem fofa, um amigável filhote de dragão verde, do tamanho de um gatinho fofo, brincava com novelos de lã estelares.',
          en: 'They flew high up through the open window and found a giant rainbow bridge woven out of thin colorful threads! Sitting on a soft cloud, a friendly baby green dragon, the size of a little kitten, was playing with sparkling yarn.',
          es: '¡Se elevaron por la ventana hacia el cielo de noche y vieron un gran puente de arcoíris hecho de hilos brillantes! Sobre una nube esponjosa, un pequeño dragón verde del tamaño de un gatito jugaba con madejas de lana.',
          fr: 'Ils s’envolèrent par la fenêtre ouverte et découvrirent un immense pont arc-en-ciel tissé de fils colorés ! Sur un nuage en sucre, un gentil bébé dragon vert, pas plus grand qu’un chaton, s’amusait avec des pelotes d’or.',
          it: 'Volarono oltre la finestra del balcone e scoprirono un grande ponte di arcobaleno fatto di fili luminosi! Sopra una nuvoletta morbida, un cucciolo di draghetto verde, grande quanto un gatto, giocava con gomitoli di lana.'
        },
        visualPrompt: {
          pt: 'Arco-íris gigante feito de linhas cruzadas luminosas sobre nuvens brancas, dragãozinho verde fofo rindo com novelos de ouro estelar fofos 3D.',
          en: 'Giant rainbow bridge made of glowing thin knit yarn over clouds, cute little baby green dragon laughing and playing with golden wool balls 3D Pixar.',
          es: 'Puente arcoíris majestuoso hecho de hilos brillantes de lana, adorable dragón bebé verde jugando alegremente estilo Disney Pixar 3D.',
          fr: 'Grand pont d’arc-en-ciel en fils soyeux flottant parmi les nuages, mini dragon vert tout doux jouant avec de superbes pelotes dorées.',
          it: 'Grande ponte arcobaleno intessuto di fili d’oro sopra le nuvole, tenerissimo draghetto verde che gioca con gomitoli splendenti.'
        },
        visualScene: {
          background: 'from-indigo-900 via-purple-900 to-pink-900',
          elements: [
            { type: 'item', emoji: '🌈', color: '', positionClass: 'top-8 left-1/2 -translate-x-1/2 scale-150', animation: 'none' },
            { type: 'character', emoji: '🐉', color: '', positionClass: 'bottom-16 left-1/3 scale-125', animation: 'animate-pulse' },
            { type: 'item', emoji: '🧶', color: '', positionClass: 'bottom-20 right-1/3', animation: 'animate-spin' },
            { type: 'star', emoji: '✨', color: 'text-pink-300', positionClass: 'top-10 left-5 scale-125', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'De volta ao quarto quentinho, Duda acariciou seu coelhinho azul e percebeu que seu coração brilhava de alegria. Ela fechou as pálpebras sabendo que os sonhos mais sinceros deixam caminhos cintilantes no mundo real.',
          en: 'Back in her cozy little warm bed, Dina hugged her blue woolen rabbit and felt her chest radiating with gentle peace. She closed her eyes knowing that true and beautiful dreams leave bright trails in the real world.',
          es: 'De vuelta en su cama bien protegida, Dina abrazó a su conejito de lana y sintió una inmensa felicidad en su pecho. Cerró los ojos con una sonrisa, sabiendo que los sueños de amor siempre iluminan la realidad.',
          fr: 'De retour dans son bon lit douillet, Léna serra très fort son lapin bleu contre son cœur. Elle ferma les yeux apaisée, car elle savait désormais que les plus merveilleux rêves laissent des traces d’or dans la vraie vie.',
          it: 'Di ritorno nel suo lettino soffice, Lina abbracciò il suo coniglietto e sentì il suo piccolo cuore battere di gioia infinita. Chiuse gli occhi sognante, sapendo che i sogni più puri illuminano sempre la realtà.'
        },
        visualPrompt: {
          pt: 'Menininha adormecida sorrindo com brinquedo de coelho aconchegado nos braços, fumaça mágica de estrelas saindo da sua cabeça em 3D acolhedor.',
          en: 'Sleeping little girl smiling with the blue plush rabbit in her arms, whimsical trail of sparkling star dust rising from her blanket 3D rendering.',
          es: 'Niña durmiendo plácidamente con sonrisa y tierno conejo en sus brazos, rastro suave de polvillo de estrellas de ensueño de fondo Pixar.',
          fr: 'Petite fille endormie avec le sourire serrant fort son lapin contre elle, volutes de poussière magique scintillante au-dessus du lit.',
          it: 'Bambina addormentata con sorriso dolce mentre stringe il coniglio azzurro, polvere magica di stelle che luccica sopra il lettino.'
        },
        visualScene: {
          background: 'from-purple-950 via-slate-900 to-indigo-950',
          elements: [
            { type: 'character', emoji: '😴', color: '', positionClass: 'bottom-16 left-1/4 scale-150', animation: 'animate-wiggle' },
            { type: 'item', emoji: '🧸', color: '', positionClass: 'bottom-16 right-1/4 scale-125', animation: 'animate-pulse' },
            { type: 'star', emoji: '🌙', color: 'text-yellow-100', positionClass: 'top-10 right-20 scale-150', animation: 'animate-pulse' },
            { type: 'star', emoji: '💤', color: 'text-indigo-300', positionClass: 'top-14 left-1/4 scale-110', animation: 'animate-bounce' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    idString: 'pocket-mermaid',
    title: {
      pt: 'A Sereia dos Relógios Quebrados',
      en: 'The Pocket Watch Mermaid',
      es: 'La Sirena de los Relojes Rotos',
      fr: 'La Sirène des Montres Brisées',
      it: 'La Sirena degli Orologi Rotti',
    },
    category: 'fantasy',
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia',
    },
    ageRange: '6-8',
    themeColor: 'teal',
    cardGradient: 'from-emerald-600 via-teal-600 to-sky-800',
    premium: false,
    coverEmoji: '🧜‍♀️',
    coverImage: 'sereia_relogio',
    durationMin: 4,
    introduction: {
      pt: 'Um menino encontra um antigo relógio de bolso que goteja areia prateada brilhante, revelando uma sereiazinha que o convida para uma viagem submarina de engrenagens de luz.',
      en: 'A young boy discovers a rusty pocket watch dripping shiny silver sand, revealing a tiny mermaid who invites him to a subaquatic world of golden gears.',
      es: 'Un niño curioso encuentra un reloj de bolsillo oxidado que gotea arena de plata viva, revelando una sirenita mágica que lo lleva a un océano de engranajes.',
      fr: 'Un garçon trouve une ancienne montre à gousset d’où coule du sable argenté, libérant une sirène minuscule qui l’invite dans un océan d’horloges dorées.',
      it: 'Un bimbo trova un vecchio orologio da taschino che lascia cadere sabbia argentata, rivelando una microscopica sirena che lo guida in un mare di ingranaggi.'
    },
    characters: {
      pt: ['Leo (Menino Curioso)', 'Marina (Sereiazinha dos Ponteiros)'],
      en: ['Leo (Curious Boy)', 'Marina (Little Watch Mermaid)'],
      es: ['Leo (El Explorador)', 'Marina (Sirenita de los Tiempos)'],
      fr: ['Léo (Le Petit Curieux)', 'Marina (Sirène des Engrenages)'],
      it: ['Leo (Piccolo Ricercatore)', 'Marina (Sirenetta del Tempo)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Leo vasculhava o baú do sótão quando achou um relógio antigo. Ao aproximá-lo do ouvido, percebeu que ele não fazia tique-taque, mas suspirava suavemente como as ondas de uma praia sob o vento.',
          en: 'Leo was searching in the old attic chest when he found an ancient pocket watch. Putting it close to his ear, it didn’t make a tick-tock sounds, but sighed like warm sea breeze waves.',
          es: 'Leo exploraba un baúl antiguo en el desván cuando vio un hermoso reloj de bolsillo. Al acercarlo a su oído, no escuchó tiquitac, sino un susurro cálido de olas lejanas de mar.',
          fr: 'Léo fouillait dans un vieux coffre du grenier lorsqu’il tomba sur une montre de cuivre. En la collant à son oreille, il n’entendit pas de tic-tac, mais le murmure des marées sous le vent.',
          it: 'Leo stava frugando nel solaio quando trovò un orologio dorato. Avvicinandolo all’orecchio, non sentì alcun tic-tac, ma il dolce sussurrargi delle onde sulla spiaggia.'
        },
        visualPrompt: {
          pt: 'Menino no sótão empoeirado segurando relógio de bolso redondo gigante brilhando com luz azul d’água mágica do mar 3D estilo Pixar.',
          en: 'Boy holding a large shining gold pocket watch with aqua rays emerging from the glass interface, dust particles in an attic 3D volumetric light Pixar.',
          es: 'Niño asombrado en un ático cálido sosteniendo un reloj brillante de oro que destella olas azules agua marina fofa 3D.',
          fr: 'Enfant émerveillé dans un grenier ensoleillé tenant une montre géante dorée qui diffuse de douces lueurs d’eau azurées en 3D.',
          it: 'Bambino sbalordito in soffitta che tiene un orologio dorato che irraggia fasci di luce azzurra marina e pulviscolo fatato.'
        },
        visualScene: {
          background: 'from-emerald-950 via-teal-900 to-cyan-900',
          elements: [
            { type: 'character', emoji: '🧑', color: '', positionClass: 'bottom-20 left-10 scale-125', animation: 'none' },
            { type: 'item', emoji: '🕵️', color: '', positionClass: 'top-10 left-10 scale-110', animation: 'animate-pulse' },
            { type: 'item', emoji: '⏱️', color: 'text-yellow-400', positionClass: 'bottom-28 right-12 scale-150', animation: 'animate-wiggle' },
            { type: 'cloud', emoji: '🫧', color: '', positionClass: 'top-20 right-1/3 scale-125', animation: 'animate-bounce' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'Uma gotinha de água prateada saiu do vidro e se transformou em uma sereiazinha de cabelos ruivos! Ela esticou o braço e acenou para que Leo mergulhasse com ela para consertar o Grande Relógio do mar.',
          en: 'A tiny drop of silver water leaked out of the glass screen, reshaping into a friendly red-haired mermaid! She stretched her hand and invited Leo to dive with her inside the great engine of time.',
          es: '¡Una gotita de agua plateada brilló en el cristal y se convirtió en una sirenita pelirroja! Con un gesto alegre, invitó a Leo a zambullirse con ella para curar el reloj del océano.',
          fr: 'Une gouttelette argentée s’échappa du verre et prit la forme d’une minuscule sirène aux cheveux roux ! D’un geste gracieux, elle invita Léo à plonger avec elle dans l’horloge des mers.',
          it: 'Una gocciolina argentea scivolò via dal quadrante e si trasformò in una sirenetta con i capelli rossi! Con un gesto affettuoso, tese la mano invitando Leo a tuffarsi sul fondo.'
        },
        visualPrompt: {
          pt: 'Sereia minúscula de cauda dourada flutuando em cima de uma engrenagem dourada gigante dentro d’água brilhante azul-turquesa, peixes coloridos 3D.',
          en: 'Tiny cute red-haired mermaid sitting on a giant golden pocket watch cog wheel underwater, surrounding school of gear-shaped colorful fishes 3D Pixar.',
          es: 'Sirenita pelirroja pequeña sentada sobre engranajes dorados brillantes bajo el agua color esmeralda, pececillos tiernos nadando Pixar 3D.',
          fr: 'Minuscule sirène aux cheveux de feu assise sur un engrenage d’horlogerie flottant sous l’eau turquoise éclatante, faune sous-marine féerique.',
          it: 'Sirenetta piccolissima con coda dorata che riposa sopra un ingranaggio di spingole luccicanti sotto onde smeraldine.'
        },
        visualScene: {
          background: 'from-teal-900 via-cyan-950 to-blue-900',
          elements: [
            { type: 'character', emoji: '🧜‍♀️', color: '', positionClass: 'bottom-20 left-1/3 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '⚙️', color: 'text-amber-400', positionClass: 'bottom-12 right-1/4 scale-150', animation: 'animate-pulse' },
            { type: 'character', emoji: '🐠', color: '', positionClass: 'top-20 right-20 scale-125', animation: 'animate-bounce' },
            { type: 'item', emoji: '🫧', color: '', positionClass: 'top-32 left-1/3 scale-110', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'A cada parafuso dourado que apertavam com amor, o mar cantava uma nova melodia e a areia parava de escorrer. Leo entendeu que algumas coisas bonitas do passado precisam ser guardadas como pérolas.',
          en: 'With every golden screw they adjusted with care, the ocean sang a new cute melody and the silver sand stopped leaking. Leo realized that precious childhood memories are kept safe like hidden forest pearls.',
          es: 'Con cada tornillito dorado que ajustaban con amor, el agua cantaba dulces melodías e historias. Leo aprendió que los días felices son tesoros eternos que se protegen en el corazón.',
          fr: 'À chaque petit rouage qu’ils réparaient avec tendresse, la mer se mettait à chanter de doux accords. Léo comprit que les tendres moments d’autrefois sont des perles éternelles.',
          it: 'A ogni ingranaggio riparato con amore, il mare intonava una nuova dolcissima armonia. Leo capì che i ricordi più belli d’infanzia vanno custoditi come gemme.'
        },
        visualPrompt: {
          pt: 'Menino feliz abraçando relógio luminoso no quarto, estrela de luz cintilante flutuando no ar, cores vibrantes azul e esmeralda 3D fofo.',
          en: 'Happy young boy hugging a beautifully restored glowing pocket watch in his bedroom, magic warm green and blue neon elements 3D cinematic layout.',
          es: 'Niño alegre sosteniendo su reloj restaurado y brillante en el pecho, estrellas de paz flutuando, tonos templados tiernos Pixar 3D.',
          fr: 'Petit garçon souriant contre son cœur un éclatant médaillon de lumière dorée, lumière cinématique chaleureuse et joyeuse en 3D.',
          it: 'Bambino felice che custodisce l’orologio luminoso, scintillio diffuso tutto intorno e tonalità acquamarina splendide.'
        },
        visualScene: {
          background: 'from-emerald-950 via-slate-900 to-indigo-950',
          elements: [
            { type: 'character', emoji: '👦', color: '', positionClass: 'bottom-16 left-1/4 scale-125', animation: 'animate-pulse' },
            { type: 'item', emoji: '💎', color: '', positionClass: 'bottom-20 right-1/3 scale-110', animation: 'animate-spin' },
            { type: 'star', emoji: '🌟', color: 'text-amber-200', positionClass: 'top-12 left-10 scale-150', animation: 'animate-bounce' },
            { type: 'star', emoji: '✨', color: 'text-white', positionClass: 'top-16 right-12 scale-125', animation: 'animate-wiggle' }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    idString: 'cotton-clouds',
    title: {
      pt: 'O Reino das Nuvens de Algodão-Doce',
      en: 'The Kingdom of Cotton Candy Clouds',
      es: 'El Reino de las Nubes de Algodón de Azúcar',
      fr: 'Le Royaume des Nuages de Barbapapa',
      it: 'Il Regno delle Nuvole di Zucchero filato',
    },
    category: 'fantasy',
    categoryLabel: {
      pt: 'Fantasia',
      en: 'Fantasy Category',
      es: 'Fantasía',
      fr: 'Contes et Fantaisie',
      it: 'Magia e Fantasia',
    },
    ageRange: '3-5',
    themeColor: 'pink',
    cardGradient: 'from-pink-500 via-rose-400 to-violet-700',
    premium: false,
    coverEmoji: '☁️',
    coverImage: 'reino_nuvens',
    durationMin: 3,
    introduction: {
      pt: 'Um dirigível fofo puxado por andorinhas de prata entra pela janela de uma menina e a leva para um reino doce de pontes de açúcar e palácios de merengue.',
      en: 'A whimsical wicker airship pulled by silver swallows flies into a bedroom, steering a little girl towards a sugar kingdom of caramel bridges.',
      es: 'Un dirigible de mimbre tirado por golondrinas de plata aterriza en el cuarto de una niña y la guía a un palacio de nubes dulces y torres de merengue.',
      fr: 'Un extraordinaire dirigeable en osier tiré par des hirondelles d’argent se pose devant la fenêtre d’une petite fille pour un voyage gourmand.',
      it: 'Un dirigibile trainato da rondini argentate atterra nella cameretta di una bambina e la porta in un regno di ponti e castelli di caramello.'
    },
    characters: {
      pt: ['Sofia (Menina Sonhadora)', 'Pingo (Castor Costureiro de Doce)'],
      en: ['Sofia (Dreamer Girl)', 'Pingo (Sweet candy beaver tailor)'],
      es: ['Sofía (Niña Dulce)', 'Pingo (Castor repostero de caramelo)'],
      fr: ['Sophie (Rêveuse Gourmet)', 'Gribouille (Castor couturier de bonbons)'],
      it: ['Sofia (Bambina Sognatrice)', 'Pingo (Castoro sarto delle caramelle)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Uma brisa que cheirava a baunilha e açúcar soprou no quarto de Sofia. Pela janela, surgiu um lindo dirigível feito de galhos de vime e balões cor-de-rosa, empurrado suavemente por andorinhas que pareciam de prata reluzente.',
          en: 'A soft breeze smelling like delicious sweet vanilla and strawberry sugar blew through Sofia’s window. Guided by silver swallows, a cute pink wicker ballon airship sailed next to her bed.',
          es: 'Una suave brisa que olía a vainilla dulce y fresas sopló en el cuarto de Sofía. Por la ventana llegó un dirigible de mimbre y globos rosas, empujado por golondrinas de pura plata brillante.',
          fr: 'Une joyeuse brise parfumée à la vanille et à la fraise caressa le visage de Sophie. Par sa fenêtre ouverte, un dirigeable tressé de rose s’approcha, tracté par des hirondelles d’argent pur.',
          it: 'Un vento dolce che profumava di vaniglia soffiò nella stanza di Sofia. Dalla finestra apparve un dirigibile di vimini e palloncini rosa, trainato da rondini splendenti come argento.'
        },
        visualPrompt: {
          pt: 'Dirigível de vime marrom com grande balão rosa pastel flutuando com andorinhas prateadas brilhantes perto de janela aberta 3D fofo.',
          en: 'Brown wicker basket airship with a large pastel-pink cloud balloon, pulled by sparkling silver swallows through a bedroom window 3D Pixar render.',
          es: 'Dirigible de fantasía de mimbre con globos de gas rosados fofos, golondrinas de plata flotantes estilo Disney 3D.',
          fr: 'Magnifique montgolfière rose et petit panier d’osier guidée par des oiseaux de lumière argentée aux portes de la chambre.',
          it: 'Dirigibile di vimini con pallone rosa morbido trainato da uccelli d’argento vicino alla finestra.'
        },
        visualScene: {
          background: 'from-pink-900 via-rose-950 to-violet-900',
          elements: [
            { type: 'item', emoji: '🎈', color: '', positionClass: 'top-8 left-1/3 scale-150', animation: 'animate-bounce' },
            { type: 'character', emoji: '🐦', color: '', positionClass: 'top-14 right-1/4 scale-110', animation: 'animate-wiggle' },
            { type: 'character', emoji: '👧', color: '', positionClass: 'bottom-16 left-12 scale-125', animation: 'none' },
            { type: 'cloud', emoji: '☁️', color: 'text-pink-100', positionClass: 'bottom-20 right-1/4 scale-150', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'O dirigível pousou no Reino das Nuvens, onde o chão era de algodão-doce azul e rosa! Lá encontraram Pingo, um castor fofinho com capacete de casquinha de sorvete, que moldava pontes com caramelo transparente.',
          en: 'The ballon landed in the Cloud Kingdom, where the ground was safe and soft, made of blue and pink cotton candy! There they met Pingo, a chubby beaver wearing an ice cream cone helmet, building sugar bridges.',
          es: 'El dirigible aterrizó en el Reino de las Nubes, ¡donde la tierra era de algodón de azúcar rosa y celeste! Allí vieron a Pingo, un castor cariñoso con casco de galleta de helado, construyendo puentes.',
          fr: 'Ils se posèrent au Royaume des Nuages, où le sol était entièrement tricoté en barbapapa bleue ! Gribouille, un castor très rigolo coiffé d’un cône de glace, construisait des ponts de caramel chaud.',
          it: 'Il fantastico mezzo atterrò nel Regno del Zucchero Filato, con dune rosate e celesti ! Lì incontrarono Pingo, un castoro tondo con un elmetto di cono gelato, che costruiva ponti di caramello trasparente.'
        },
        visualPrompt: {
          pt: 'Cenário doce com rios de calda rosa, castor fofinho de capacete de casquinha construindo ponte caramelo transparente sorrindo 3D Pixar.',
          en: 'Whimsical sweet valley with pink rivers, cute cartoon beaver wearing an ice cream cone helmet working on a glossy transparent sugar bridge 3D Pixar.',
          es: 'Castor fofo muy feliz con casco hecho de barquillo de helado, puentes de caramelo cristalino y colinas rosadas dulces Pixar 3D.',
          fr: 'Petit castor joyeux chaussé de laine et d’un cône de glace sur la tête, rivière de sucre et douces montagnes sucrées en gros plan.',
          it: 'Paesaggio zuccheroso con colline rosa, castoro felice con elmetto di biscotto gelato che modella un ponte caramelloso.'
        },
        visualScene: {
          background: 'from-rose-900 via-pink-950 to-amber-900',
          elements: [
            { type: 'character', emoji: '🦫', color: '', positionClass: 'bottom-16 left-1/3 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '🍦', color: '', positionClass: 'bottom-24 right-1/3 scale-110', animation: 'animate-pulse' },
            { type: 'cloud', emoji: '☁️', color: 'text-blue-100', positionClass: 'top-10 left-12 scale-125', animation: 'animate-pulse' },
            { type: 'item', emoji: '🍭', color: '', positionClass: 'top-12 right-20 scale-125', animation: 'animate-wiggle' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'Pingo deu a Sofia uma estrelinha doce que brilhava com aroma de mel. Sofia se despediu sabendo que a amizade torna os dias mais doces e ensina a importância de sempre compartilhar nossos melhores docinhos.',
          en: 'Pingo handed Sofia a small glowing honey-scented candy star. Sofia waved goodbye, learning that sweet sweet friendships make our normal days warmer and remind us to share our treasures.',
          es: 'Pingo le regaló a Sofía una pequeña estrella de miel brillante. Ella volvió a casa feliz, entendiendo que el amor y la amistad son los dulces más valiosos que siempre debemos compartir.',
          fr: 'Le castor offrit à l’enfant une petite étoile au goût de miel d’acacia. Sophie s’envola le cœur léger, ayant appris que la gentillesse est la plus divine des friandises à offrir.',
          it: 'Pingo regalò a Sofia una stella dolce al miele. Sofia lo ringraziò con un abbraccio, comprendendo che l’amicizia è il dolce più prezioso da dividere con chi amiamo.'
        },
        visualPrompt: {
          pt: 'Menina feliz sorrindo e brilhando com dente doce de estrela dourada na palma da mão, luz volumétrica de arco-íris, estilo Pixar fofo 3D.',
          en: 'Cute smiling girl holding a small radiant gold star-shaped solid candy candle in her hands, magic soft pastel sparkles, 3D character.',
          es: 'Niña de ojos luminosos sosteniendo estrella dorada fofita en sus manitas de muñeco, fondos dulces pasteles suaves estilo Pixar 3D.',
          fr: 'Visage radieux d’enfant tenant une magnifique étoile brillante d’or et de miel sur ses mains jointes, style Pixar 3D sublime.',
          it: 'Bambina felice con una stella magica d’oro sulla mano, caldi riflessi intorno e colori favolosi.'
        },
        visualScene: {
          background: 'from-violet-950 via-pink-950 to-slate-900',
          elements: [
            { type: 'character', emoji: '👧', color: '', positionClass: 'bottom-16 left-1/4 scale-150', animation: 'none' },
            { type: 'star', emoji: '⭐', color: 'text-yellow-200', positionClass: 'bottom-24 right-1/3 scale-125', animation: 'animate-pulse' },
            { type: 'star', emoji: '✨', color: 'text-amber-300', positionClass: 'top-10 left-1/3 scale-110', animation: 'animate-pulse' },
            { type: 'cloud', emoji: '☁️', color: 'text-pink-200', positionClass: 'top-16 right-10 scale-125', animation: 'animate-bounce' }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    idString: 'butterfly-train',
    title: {
      pt: 'O Trem das Borboletas Noturnas',
      en: 'The Night Butterfly Train',
      es: 'El Tren de las Mariposas Nocturnas',
      fr: 'Le Train des Papillons de Nuit',
      it: 'Il Treno delle Farfalle Notturne',
    },
    category: 'space',
    categoryLabel: {
      pt: 'Espaço sideral',
      en: 'Outer Space',
      es: 'Espacio Sideral',
      fr: 'Espace et Galaxies',
      it: 'Spazio e Stelle',
    },
    ageRange: '6-8',
    themeColor: 'purple',
    cardGradient: 'from-purple-600 via-fuchsia-500 to-indigo-900',
    premium: true,
    coverEmoji: '🦋',
    coverImage: 'trem_borboleta',
    durationMin: 4,
    introduction: {
      pt: 'Uma névoa cor de lavanda entra pela janela e vira um trem mágico feito de casulos translúcidos iluminados, guiado por borboletas de asas prateadas.',
      en: 'An lavender scent fog rolls into a bedroom, solidifying into a train of glowing soft cocoons, piloted by butterflies with silver wings.',
      es: 'Una niebla de color lavanda se transforma en una vía mágica donde corre un tren hecho de capullos de seda, guiado por mariposas plateadas.',
      fr: 'Une brume lavande parfumée s’étire et donne naissance à un train féerique fait de cocons de soie pure, guidé par de grands papillons argentés.',
      it: 'Una nebbia color lavanda si trasforma in un treno incantato fatto di bozzoli di seta e guidato da bellissime farfalle dalle ali d’argento.'
    },
    characters: {
      pt: ['Camila (Menina de Camisola)', 'Prata (A Rainha das Borboletas)'],
      en: ['Camila (Girl in Gown)', 'Silver (The Butterfly Queen)'],
      es: ['Camila (La Pasajera)', 'Plata (La Reina Mariposa)'],
      fr: ['Camille (La Voyageuse)', 'Argentine (La Reine Papillon)'],
      it: ['Camilla (Piccola Passeggera)', 'Argento (La Regina delle Farfalle)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Uma neblina cheirosa de lavanda soprou embaixo da porta do quarto de Camila. A fumaça se transformou em vagões brilhantes e de seda! Era o Trem Noturno, que viajava pelas estrelas sem fazer nenhum barulhinho.',
          en: 'A beautiful sweet lavender cloud drifted under Camila’s bedroom door. The soft fog turned into luminous silk transparent train cars! It was the Silent Cosmic train sailing quietly through planets.',
          es: 'Una neblina con perfume de lavanda se deslizó por el cuarto de Camila. El humo de vapor se convirtió en vagones de seda relucientes: el Tren de la Luna, que viaja por el cosmos en total silencio.',
          fr: 'Un parfum d’étoile et de lavande envahit la pièce. La douce brume prit la forme de wagons translucides et brillants de mille feux : le Train de Nuit qui glissait silencieusement vers l’infini.',
          it: 'Una nebbiolina profumata di lavanda si diffuse nella stanza di Camilla. I fumi si trasformarono in vagoni scintillanti di seta: era il Treno della Notte, che viaggiava fra le stelle in silenzio.'
        },
        visualPrompt: {
          pt: 'Vapor cor de lavanda virando trem cintilante em trilhos de fumaça azul, menininha sorrindo olhando da janela do quarto 3D estilo Pixar.',
          en: 'Glowing lavender train rising from a cloud smoke track in the night bedroom, young girl in white night gown smiling in wonder, Pixar 3D art.',
          es: 'Vapor luminoso color amatista dando forma a un hermoso vagón de cristal sobre nubes, niña asombrada en pijama de seda Pixar 3D.',
          fr: 'Magnifique train de vapeur violette flottant sur un rail de nuages, fillette aux grands yeux admirant le chef-d’œuvre.',
          it: 'Treno di fumo color lavanda che viaggia su binari invisibili, bambina felice che guarda dalla finestra.'
        },
        visualScene: {
          background: 'from-purple-950 via-fuchsia-950 to-indigo-950',
          elements: [
            { type: 'item', emoji: '🚂', color: '', positionClass: 'bottom-16 left-1/3 scale-150', animation: 'animate-pulse' },
            { type: 'character', emoji: '👧', color: '', positionClass: 'bottom-20 left-12 scale-125', animation: 'none' },
            { type: 'star', emoji: '🌌', color: '', positionClass: 'top-10 right-20 scale-150', animation: 'animate-pulse' },
            { type: 'item', emoji: '🦋', color: 'text-purple-300', positionClass: 'top-16 left-1/3 scale-110', animation: 'animate-wiggle' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'A Rainha Prata, uma borboleta de asas tão brilhantes que pareciam joias, bateu as asinhas e guiou o trem até o Jardim das Flores-Sonho, onde cada flor guardava uma lembrança bonita de brinquedos e risadas.',
          en: 'Queen Silver, a huge butterfly with royal glowing wings like precious gems, guided the cocoon cars to the Dream Flower Garden, where each beautiful flower kept a memory of warm laughter.',
          es: 'La Reina Plata, una gran mariposa con alas de cristal templado, guió el tren al Jardín de las Flores de Ensueño, donde cada pétalo guardaba el recuerdo de una risa de niño.',
          fr: 'La Reine Argentine, un splendide papillon aux mille éclats, emmena les voyageurs au Jardin des Fleurs de Miel. Là, chaque pétale de rose recelait un souvenir joyeux de câlins de maman.',
          it: 'La Regina Argento, una farfalla con le ali splendenti come diamanti, guidò il vagoni di seta al Giardino dei Fiori Segreti, dove ogni fiore custodiva il ricordo di calde risate.'
        },
        visualPrompt: {
          pt: 'Borboleta mágica gigante brilhando com luz azul neon prateada no topo de flores gigantes que emitem pequenos hologramas de crianças sorrindo 3D.',
          en: 'Giant beautiful silver butterfly hovering above glowing holographic oversized flowers, reflections of children playing inside petals, 3D Pixar.',
          es: 'Mariposa gigante resplandeciente con escarchas de plata y azul sobre flores silvestres, hologramas dorados de juegos infantiles Pixar 3D.',
          fr: 'Papillon d’argent majestueux planant au-dessus de tulipes lumineuses géantes, scènes de jeux d’enfants se jouant dans l’air chaud.',
          it: 'Farfalla gigante che risplende d’argento sopra fiori giganti luminosi, riflessi d’oro e tonalità fucsia.'
        },
        visualScene: {
          background: 'from-indigo-900 via-fuchsia-950 to-violet-900',
          elements: [
            { type: 'character', emoji: '🦋', color: '', positionClass: 'top-12 left-1/2 -translate-x-1/2 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '🌸', color: '', positionClass: 'bottom-16 left-1/4 scale-125', animation: 'animate-pulse' },
            { type: 'item', emoji: '🪻', color: '', positionClass: 'bottom-16 right-1/4 scale-125', animation: 'animate-bounce' },
            { type: 'star', emoji: '✨', color: 'text-amber-200', positionClass: 'top-20 right-10 scale-125', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'Camila acordou descansada sob a luz da manhã, com um perfuminho de lavanda no nariz, sabendo que todas as histórias bonitas ficam guardadas brilhando no coração para sempre.',
          en: 'Camila woke up relaxed in the warm morning light, with the sweet scent of fresh lavender in her nose, feeling so safe and knowing that beautiful adventures live in our souls forever.',
          es: 'Camila despertó tranquila con el sol de la mañana, un aroma de flores en su almohada y la certeza de que las historias de amor nos acompañan y protegen por siempre.',
          fr: 'Camille s’éveilla reposée sous le soleil du matin, un doux parfum de fleurs sur son oreiller, sachant désormais que les merveilleux souvenirs vivent en nous pour toujours.',
          it: 'Camilla si svegliò riposata sotto il sole del mattino, con un profumo delicato di lavanda sul cuscino, sapendo che le avventure d’amore vivono nel nostro cuore per sempre.'
        },
        visualPrompt: {
          pt: 'Menininha abrindo olhos com sol da manhã dourado entrando pela floresta de tecidos, sorriso doce, 3D render alegre e profissional.',
          en: 'Smiling little girl waking up happily in a sun-drenched warm bedroom, golden volumetric light beams coming through curtains style 3D.',
          es: 'Niña sonriente despertando alegremente, luz dorada de la mañana bañando su cuarto abrigado en 3D volumétrico tierno Pixar.',
          fr: 'Enfant qui s’éveille en souriant sous un rayon de soleil doré, réveil en douceur dans une chambre aux couleurs pastel 3D.',
          it: 'Bambina che si sveglia con un dolce sorriso, fasci di luce dorata del mattino che entrano dalla finestra.'
        },
        visualScene: {
          background: 'from-amber-900 via-orange-950 to-indigo-950',
          elements: [
            { type: 'character', emoji: '☀️', color: 'text-amber-300', positionClass: 'top-6 right-10 scale-150', animation: 'animate-pulse' },
            { type: 'character', emoji: '👧', color: '', positionClass: 'bottom-16 left-1/3 scale-150', animation: 'animate-wiggle' },
            { type: 'item', emoji: '🛏️', color: '', positionClass: 'bottom-16 right-1/4 scale-125', animation: 'none' },
            { type: 'star', emoji: '✨', color: 'text-yellow-400', positionClass: 'top-16 left-12 scale-110', animation: 'animate-pulse' }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    idString: 'flying-cats',
    title: {
      pt: 'A Ilha dos Gatos Que Sabiam Voar',
      en: 'The Island of Flying Cats',
      es: 'La Isla de los Gatos Voladores',
      fr: 'L’Île des Chats Volants',
      it: 'L’Isola dei Gatti con le Ali',
    },
    category: 'animals',
    categoryLabel: {
      pt: 'Animais mágicos',
      en: 'Magical Animals',
      es: 'Animales Mágicos',
      fr: 'Animaux Rigolos',
      it: 'Animali Straordinari',
    },
    ageRange: '3-5',
    themeColor: 'cyan',
    cardGradient: 'from-cyan-500 via-sky-400 to-indigo-800',
    premium: true,
    coverEmoji: '🐱',
    coverImage: 'gato_voando',
    durationMin: 3,
    introduction: {
      pt: 'Nesta ilha mágica de nuvens de algodão, um menino solitário descobre gatinhos fofos com asas transparentes que o ensinam a tecer pontes com fios de riso.',
      en: 'On a floating cotton island, a lonely kid discovers orange kittens with clear fairy wings who teach him to weave colorful bridges of smiles.',
      es: 'En una hermosa isla flotante, un niño que se sentía solo descubre gatitos con alitas de hada que le enseñan a reír y a encontrar amigos.',
      fr: 'Sur une île flottante en sucre, un petit garçon timide fait la rencontre de adorables chatons ailés qui lui apprennent à faire des ponts de joie.',
      it: 'In un’isola fluttuante dalle spiagge rosa, un bimbo timido scopre gattini con le ali di fata che gli insegnano a tessere ponti di allegria.'
    },
    characters: {
      pt: ['Benjamin (O Menino Paciente)', 'Mimi (A Gatinha de Asas de Vidro)'],
      en: ['Benjamin (The Patient Boy)', 'Mimi (The Glass-winged Kitten)'],
      es: ['Benjamín (El Niño Valiente)', 'Mimi (La Gatita Dulce con Alitas)'],
      fr: ['Benjamin (Le Doux Garçon)', 'Mimi (Le Chaton aux Ailes Cristallines)'],
      it: ['Benjamin (Piccolo Amico)', 'Mimi (La Gattina dalle Ali di Cristallo)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Benjamin estava triste porque não tinha com quem brincar. De repente, uma nuvem em formato de gato pousou no quintal! De dentro dela saiu Mimi, uma gatinha laranja com lindas asas de borboleta transparentes que brilhavam.',
          en: 'Benjamin was feeling a bit sad with nobody to play catch. Suddenly, a cat-shaped cloud slowly landed in his backyard! Inside sat Mimi, a cute orange kitten with shiny clear butterfly wings.',
          es: 'Benjamín estaba un poco triste bajo el árbol de jardín. ¡De pronto, una nube con forma de gato bajó suavemente! De ella salió Mimi: una gatita naranja con hermosas alas de mariposa.',
          fr: 'Benjamin se sentait seul dans son jardin fleuri. Soudain, un joli nuage en forme de chat descendit du ciel ! En sortit Mimi, un chaton roux doté de magiques ailes de papillon transparentes.',
          it: 'Benjamin era triste perché non aveva nessuno con cui giocare nel parco. All’improvviso, una nuvoletta a forma di gatto scese dall’alto! Lì dentro c’era Mimi, una gattina dalle ali di fata.'
        },
        visualPrompt: {
          pt: 'Menino surpreso no jardim sob árvore frondosa, gatinha laranja com asas brilhando fofa estilo Pixar 3D.',
          en: 'Surprised young boy in a sunny backyard, lovely orange kitten with translucent wings jumping towards him, 3D Pixar character asset.',
          es: 'Niño alegre asombrado en pasto verde, gatito carismático naranja con alitas transparentes flotando de frente estilo Pixar 3D.',
          fr: 'Garçonnet souriant dans l’herbe verte, chaton roux tout mignon flottant dans les airs avec des ailes scintillantes.',
          it: 'Bambino felice in giardino, gattina arancione con alette trasparenti che vola verso di lui.'
        },
        visualScene: {
          background: 'from-cyan-900 via-sky-950 to-indigo-950',
          elements: [
            { type: 'character', emoji: '🧑', positionClass: 'bottom-16 left-12 scale-125', animation: 'none' },
            { type: 'character', emoji: '🐱', positionClass: 'bottom-20 right-14 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '☁️', positionClass: 'top-10 left-1/4 scale-125', animation: 'animate-pulse' },
            { type: 'star', emoji: '✨', positionClass: 'top-16 right-1/4 scale-110', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'Mimi segurou a mão de Benjamin e, com um bater de asas suave, eles voaram até a Ilha dos Gatos! Lá, dezenas de gatinhos alados faziam pontes feitas de fios cintilantes de riso para ligar suas nuvens.',
          en: 'Mimi held his hand with her soft paws and, with a gentle flap, they flew together to the Cat Island! There, dozens of winged kittens were spinning bridges out of golden lines of laughter.',
          es: 'Mimi abrazó la mano de Benjamín y volaron juntos a la Isla de los Felinos. Allí, decenas de gatitos voladores tejían puentes de luz con risas y juegos compartidos.',
          fr: 'Mimi prit la main de l’enfant et s’envola vers l’Île des Chats ! Là-bas, des dizaines de chatons faisaient de magnifiques ponts d’arcs-en-ciel pour relier leurs maisons sucrées.',
          it: 'Mimi tese la zampetta e con un battito d’ali volarono all’Isola dei Gatti! Lì, decine di gattini alati tessevano grandi corde di fili d’oro per unire le nuvole fluttuanti.'
        },
        visualPrompt: {
          pt: 'Arquipélago de ilhas flutuantes com palmeiras e grama rosa, muitos gatinhos fofos com asas voando no ar entre arco-íris brilhante 3D.',
          en: 'Breathtaking scene of floating green islands with yellow flowers, many cute colorful winged cats flying near rainbow bridges 3D Pixar.',
          es: 'Islas flotantes mágicas en cielos celestes, muchos gatitos de colores volando alegres con alas brillantes estilo Disney 3D.',
          fr: 'Archipel céleste avec de vertes îles suspendues et de jolis petits chats de toutes couleurs volant joyeusement dans les airs.',
          it: 'Paesaggio da sogno con isole fluttuanti nel cielo, decine di gattini con le ali che giocano felici.'
        },
        visualScene: {
          background: 'from-sky-900 via-cyan-950 to-teal-900',
          elements: [
            { type: 'item', emoji: '🏝️', positionClass: 'bottom-12 left-1/4 scale-125', animation: 'animate-pulse' },
            { type: 'character', emoji: '🐱', positionClass: 'top-12 left-1/3 scale-110', animation: 'animate-bounce' },
            { type: 'character', emoji: '🐈', positionClass: 'top-16 right-1/4 scale-110', animation: 'animate-wiggle' },
            { type: 'star', emoji: '🌈', positionClass: 'bottom-20 right-1/3 scale-125', animation: 'none' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'Benjamin percebeu que um sorriso sincero é a ponte mais forte para fazer um amiguinho. Ele voltou ao jardim sabendo que quem abre o coração nunca fica sozinho nesse mundo mágico.',
          en: 'Benjamin learned that a pure smile is the strongest bridge to make a friend. He returned home knowing that an open loving heart is never alone in this beautiful world.',
          es: 'Benjamín comprendió que una sonrisa sincera y tierna es la llave de la amistad. Volvió a su jardín sabiendo que el amor siempre nos reúne con grandes compañeros.',
          fr: 'Benjamin comprit qu’un franc sourire est le plus beau chemin vers l’amitié. Il redescendit ravi, sachant que quiconque partage sa joie n’est jamais seul.',
          it: 'Benjamin comprese che un dolce sorriso è il ponte più solido per stringere nuove amicizie. Tornò a casa felice, sapendo che chi ama non è mai solo.'
        },
        visualPrompt: {
          pt: 'Menino sorrindo feliz abraçado com um gato gordinho, sol dourado quente no quintal, estilo Pixar 3D de alta qualidade com afeto.',
          en: 'Adorable 3D illustration of a little boy happily hugging a chubby smiling orange kitten, sunny garden backdrop volumetric light Pixar style render.',
          es: 'Niño extremadamente feliz abrazando a gatito gordo peluche, rayos de sol templado de tarde sobre pasto Pixar 3D.',
          fr: 'Gros plan d’un enfant serrant un adorable chaton roux joufflu contre sa joue, lumières cinématiques douces et tendres 3D.',
          it: 'Bambino felice che abbraccia teneramente la gattina nel prato, colori meravigliosi e luce d’oro.'
        },
        visualScene: {
          background: 'from-teal-950 via-slate-900 to-cyan-950',
          elements: [
            { type: 'character', emoji: '👦', positionClass: 'bottom-16 left-1/3 scale-125', animation: 'none' },
            { type: 'character', emoji: '😻', positionClass: 'bottom-16 right-1/3 scale-125', animation: 'animate-bounce' },
            { type: 'item', emoji: '🌻', positionClass: 'bottom-10 left-12 scale-110', animation: 'animate-pulse' },
            { type: 'star', emoji: '✨', positionClass: 'top-10 right-12 scale-125', animation: 'animate-spin' }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    idString: 'lost-keys',
    title: {
      pt: 'O Jardim das Chaves Perdidas',
      en: 'The Garden of Lost Keys',
      es: 'El Jardín de las Llaves Perdidas',
      fr: 'Le Jardin des Clés Perdues',
      it: 'Il Giardino delle Chiavi Perdute',
    },
    category: 'education',
    categoryLabel: {
      pt: 'Educação infantil',
      en: 'Children Education',
      es: 'Educación Infantil',
      fr: 'Apprentissage et Éducation',
      it: 'Educazione Creativa',
    },
    ageRange: '3-5',
    themeColor: 'emerald',
    cardGradient: 'from-emerald-600 via-green-500 to-teal-800',
    premium: true,
    coverEmoji: '🔑',
    coverImage: 'jardim_chaves',
    durationMin: 3,
    introduction: {
      pt: 'Flores mágicas que brotam fechaduras delicadas, e chaves de ouro que abrem portas secretas para sonhos antigos e divertidos.',
      en: 'Magical keys grow directly on green branches, waiting for kind-hearted children to open secret gates of ancient dreamlands.',
      es: 'Flores hermosas con forma de candados secretos, e hilos dorados que guían a un niño a abrir cofres de risas olvidadas.',
      fr: 'Un jardin secret d’où germent de fantastiques fleurs en forme de verrous dorés, s’ouvrant grâce aux clés des enfants sages.',
      it: 'Fiori colorati a forma di lucchetti d’oro e chiavi d’argento che crescono nei rami, svelando sentieri di bellissimi sogni.'
    },
    characters: {
      pt: ['Arthur (O Menino Curioso)', 'Gabi (A Estrelinha Verde das Plantas)'],
      en: ['Arthur (The Curious Explorer)', 'Gabi (The Green Leaf Sprite)'],
      es: ['Arturo (El Pequeño Sabio)', 'Gabi (El Duendecillo de las Hojas)'],
      fr: ['Arthur (Le Petit Botaniste)', 'Gaby (Le Lutin Vert des Forêts)'],
      it: ['Arthur (Piccolo Botanico)', 'Gaby (Il Folletto delle Foglie)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Arthur encontrou uma velha chave dourada escondida em uma flor de lótus de argila. Ao girá-la no ar, as plantas de seu quarto começaram a se abrir, revelando um caminho secreto e luminoso por trás da estante de brinquedos.',
          en: 'Arthur found an antique golden key hidden inside a clay lotus flower. When he turned it in the air, the green bedroom vines opened up, showing a bright path behind his toy shelf.',
          es: 'Arturo halló una llave dorada en el pétalo de una flor. Al darle vuelta en el aire, las ramas y flores se abrieron en un hermoso camino brillante detrás de sus juguetes.',
          fr: 'Arthur dénicha une clé en or massif cachée au fond d’une marguerite. En la faisant tourner, les plantes de sa chambre s’écartèrent pour dévoiler un chemin scintillant.',
          it: 'Arthur trovò una vecchia chiave lucente nascosta dentro un loto d’argilla. Facendola girare, le piante della stanza si aprirono rivelando un sentiero dorato.'
        },
        visualPrompt: {
          pt: 'Menino girando chave brilhando, plantas floridas com pétalas abrindo, cores vibrantes verde e dourado 3D Pixar.',
          en: 'Young boy turning a glowing magical key, surrounding flowers blooming with warm golden sparkles, green leaves background 3D Pixar render.',
          es: 'Niño girando llave dorada, plantas fantásticas creciendo con luces, tonos esmeralda y oro fofos Pixar 3D.',
          fr: 'Garçonnet tenant une clé de diamant d’où jaillit de la lumière dorée, végétation luxuriante qui s’ouvre en 3D.',
          it: 'Bambino che fa girare una chiave d’oro, fiori magici che si schiudono emanando particelle lucenti.'
        },
        visualScene: {
          background: 'from-emerald-900 via-green-950 to-teal-950',
          elements: [
            { type: 'item', emoji: '🔑', positionClass: 'top-10 left-1/3 scale-150', animation: 'animate-wiggle' },
            { type: 'character', emoji: '👦', positionClass: 'bottom-16 left-12 scale-125', animation: 'none' },
            { type: 'item', emoji: '🪴', positionClass: 'bottom-16 right-12 scale-125', animation: 'animate-pulse' },
            { type: 'star', emoji: '✨', positionClass: 'top-16 right-1/4 scale-125', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'No fim do caminho, Arthur viu um lindo lago cercado por fechaduras gigantes em árvores! Gabi, a estrelinha herbanária, o ensinou que cada chave certa representa paciência, carinho e respeito aos amiguinhos.',
          en: 'At the end of the path, Arthur saw a giant calm lake with trees growing keylocks! Gabi, the green leaf fairy, told him that keys represent patience, love, and respect for our loved ones.',
          es: 'Al final vio un hermoso lago rodeado de árboles con flores de cerradura. Gabi el duendecillo le explicó que cada llave es la llave de la paciência y el amor al prójimo.',
          fr: 'Au bout de la clairière, Arthur découvrit un lac bordé de portes en bois. Gaby le lutin lui apprit que la clé du bonheur réside dans la politesse et la gentillesse.',
          it: 'In fondo scoprì un lago maestoso circondato da alberi con grandi serrature d’oro. Il folletto Gaby gli insegnò che ogni chiave simboleggia amore, pazienza e rispetto.'
        },
        visualPrompt: {
          pt: 'Lago brilhante azul cercado por cipós verdes e flores com formatos de corações de fechaduras, estrelinha verde sorridente voando Pixar 3D.',
          en: 'Beautiful blue tropical lake with lock-shaped heart-flowers growing on vines, floating smiling green leaf sprite 3D Pixar design.',
          es: 'Lago hermoso con flores mágicas en forma de candados, hada verde pequeñita flotando mística Pixar 3D.',
          fr: 'Lac bleu féerique et lianes fleuries aux verrous d’or, petit lutin suspendu dans les airs souriant en 3D.',
          it: 'Lago incantato circondato da rampicanti e fiori a forma di cuore, grazioso folletto verde sospeso.'
        },
        visualScene: {
          background: 'from-green-905 via-emerald-950 to-sky-950',
          elements: [
            { type: 'character', emoji: '🧚‍♂️', positionClass: 'top-10 right-1/4 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '🪵', positionClass: 'bottom-12 left-1/4 scale-110', animation: 'none' },
            { type: 'item', emoji: '🔒', positionClass: 'bottom-16 right-1/4 scale-125', animation: 'animate-pulse' },
            { type: 'star', emoji: '✨', positionClass: 'top-20 left-12 scale-110', animation: 'animate-spin' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'Arthur inseriu a chave da amizade e um baú repleto de livros de historinhas se abriu cintilando! Ele aprendeu que ler livros com carinho é a melhor chave de ouro para libertar a imaginação de todas as crianças.',
          en: 'Arthur used his golden friendship key and a beautiful trunk filled with colorful storybooks opened with light! He understood that reading and learning is the keys to free our mind.',
          es: 'Arturo abrió el cofre de la concordia y encontró decenas de libros de historietas brillantes. Descubrió que los libros son las llaves más grandes que abren mundos maravillosos.',
          fr: 'Arthur ouvrit le grand coffre et découvrit des dizaines de livres de contes dorés ! Il comprit que la lecture est la clé suprême de la créativité et de la joie.',
          it: 'Arthur inserì la chiave dell’amicizia e si aprì un forziere pieno di magnifici libri! Scoprì che leggere è la chiave d’oro più bella per far volare la fantasia.'
        },
        visualPrompt: {
          pt: 'Cofre antigo aberto brilhando com dezenas de livros infantis coloridos saindo borboletas de papel deles, estilo Pixar 3D de alta qualidade.',
          en: 'Antique chest opened showing beautiful children books with tiny paper butterflies flying out of them in magical light style 3D Pixar.',
          es: 'Cofre antiguo del que brotan libros coloridos con mariposas de papel volando en luces doradas cálidas Pixar 3D.',
          fr: 'Coffre d’or ouvert d’où s’élèvent de jolis livres illustrés et de petits oiseaux en origami multicolores de lumière.',
          it: 'Forziere antico aperto da cui escono libri coloratissimi e farfalle di carta fluttuanti.'
        },
        visualScene: {
          background: 'from-teal-950 via-green-950 to-slate-900',
          elements: [
            { type: 'character', emoji: '👦', positionClass: 'bottom-16 left-12 scale-125', animation: 'none' },
            { type: 'item', emoji: '🧳', positionClass: 'bottom-16 right-1/3 scale-150', animation: 'animate-pulse' },
            { type: 'item', emoji: '📚', positionClass: 'top-12 left-1/3 scale-125', animation: 'animate-bounce' },
            { type: 'star', emoji: '✨', positionClass: 'top-20 right-14 scale-125', animation: 'animate-pulse' }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    idString: 'singing-river',
    title: {
      pt: 'O Rio das Pedras que Cantam',
      en: 'The River of Singing Stones',
      es: 'El Río de las Piedras Cantoras',
      fr: 'Le Ruisseau des Pierres Cantatrices',
      it: 'Il Fiume delle Pietre Cantanti',
    },
    category: 'animals',
    categoryLabel: {
      pt: 'Animais mágicos',
      en: 'Magical Animals',
      es: 'Animales Mágicos',
      fr: 'Animaux Rigolos',
      it: 'Animali Straordinari',
    },
    ageRange: '3-5',
    themeColor: 'blue',
    cardGradient: 'from-blue-500 via-sky-400 to-emerald-900',
    premium: true,
    coverEmoji: '🦫',
    coverImage: 'castor_rio',
    durationMin: 3,
    introduction: {
      pt: 'Um castor arquiteto com capacete de sementes e um lápis de galho transforma um rio barulhento em suaves melodias de ninar.',
      en: 'An architect beaver wearing a cute wooden acorn helmet turns a noisy waterfall into sweet quiet bedtime melodies for forest animals.',
      es: 'Un castor inventor con casco de nuez y un lápiz de madera calma un río ruidoso tejiendo cascadas musicales de paz.',
      fr: 'Un castor ingénieur au casque de gland accorde les pierres de la rivière pour jouer une mélodie qui berce toute la forêt.',
      it: 'Un castoro architetto con cappello di ghianda trasforma le cascate rumorose in dolci melodie per far dormire gli animali.'
    },
    characters: {
      pt: ['Castorino (O Castor Arquiteto)', 'Pedrita (A Pedra Cantora Azul)'],
      en: ['Castorino (The Builder Beaver)', 'Pedrita (The Singing Stone)'],
      es: ['Castorino (El Castor Constructor)', 'Pedrita (La Piedra musical)'],
      fr: ['Castorino (Le Castor Ingénieur)', 'Pedrita (Le Galet Chantant)'],
      it: ['Castorino (Il Castoro Ingegnere)', 'Pedrita (La Pietra Cantante)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Castorino adorava construir barragens com musgo e troncos secos. Seu maior desafio era o Rio Barulhão, cujas correntezas agitadas assustavam os filhotes da floresta inteira quando chegava a hora de ir para o bercinho dormir.',
          en: 'Castorino loved building dams out of soft green moss and dry branches. His biggest project was the Noisy River, whose rapid waves standardly scared all the baby animals when bedtime approached.',
          es: 'Castorino amaba construir diques de musgo y troncos. Su gran desafío era el Río Ruidoso, cuyas aguas agitadas asustaban a los animalitos bebés de todo el bosque cuando llegaba la hora de dormir.',
          fr: 'Castorino adorait construire des digues de mousse tendre. Son grand projet était de calmer le Ruisseau Bruyant, dont le fracas perturbait la sieste des bébés oiseaux et écureuils.',
          it: 'Castorino amava costruire dighe con rami e muschio. Il suo problema più grande era il Fiume Rumoroso, le cui onde spaventavano i cuccioli del bosco prima di andare a nanna.'
        },
        visualPrompt: {
          pt: 'Castor fofinho de capacete marrom e lápis no dente sorrindo ao lado de barragem de madeira verde sob floresta 3D Pixar.',
          en: 'Chubby cute beaver wearing a wooden acorn helmet holding a pencil branch, standing next to a tiny timber dam in a lush green forest 3D Pixar.',
          es: 'Castor dulce sonriente con casco de nuez y lapicito en la mano al lado de un arroyo, bosque luminoso Pixar 3D.',
          fr: 'Petit castor trop mignon au casque marron et crayon en bois sur l’oreille, posant près d’un joli barrage d’osier.',
          it: 'Castoro tondo con cappello a forma di ghianda che tiene un rametto e sorride vicino a una diga.'
        },
        visualScene: {
          background: 'from-blue-900 via-sky-950 to-emerald-950',
          elements: [
            { type: 'character', emoji: '🦫', positionClass: 'bottom-16 left-12 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '🪵', positionClass: 'bottom-14 right-1/3 scale-110', animation: 'none' },
            { type: 'item', emoji: '✏️', positionClass: 'bottom-20 left-1/3 scale-110', animation: 'animate-wiggle' },
            { type: 'cloud', emoji: '🌲', positionClass: 'top-10 right-14 scale-150', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'Usando seu lápis de galho, Castorino organizou as pedrinhas redondas conforme seus tamanhos. Ao passarem pelos canais que desenhou, as águas batiam docemente produzindo notas de xilofone mágicas e reconfortantes.',
          en: 'Using his wooden pencil branch, Castorino structured the round colorful stones based on their mass. When flowing through his smart layout, the water touched them gently, creating nice soothing xylophone sounds.',
          es: 'Con su lápiz de madera, Castorino ordenó las piedritas de colores. Al cruzar los canales, el agua pasaba rozando y producía notas de xilófono sumamente suaves y dulces para calmar todo.',
          fr: 'Grâce à son crayon de liège, il ordonna les galets de la rivière. En coulant entre les roches arquées, l’eau se mit à chantonner de douces mélodies de piano de bois qui apaisaient les cœurs.',
          it: 'Con il suo rametto-lapis, Castorino posizionò i sassi lucidi. Quando l’acqua fluiva nei canali, toccava le pietre producendo note dolci come un magico xilofono.'
        },
        visualPrompt: {
          pt: 'Cascata de água cristalina caindo sobre pedras brilhantes de cores azul, verde e rosa que flutuam pequenas claves de sol brilhantes 3D Pixar.',
          en: 'Crystal clear small waterfall flowing over perfectly layered shining blue, pink, and yellow stones, neon glowing music notes floating in the mist 3D Pixar.',
          es: 'Pequeño arroyo de agua pura con piedras de colores de las que flotan notas musicales luminosas, estilo Disney Pixar 3D.',
          fr: 'Cascade d’eau scintillante ruisselant sur des pierres rondes de pastel, jolies notes de musique dorées émergeant de l’écume.',
          it: 'Cascata cristallina con note musicali d’oro che fluttuano nell’aria frizzante del bosco.'
        },
        visualScene: {
          background: 'from-sky-900 via-blue-950 to-emerald-950',
          elements: [
            { type: 'item', emoji: '💧', positionClass: 'top-10 left-12 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '🎵', positionClass: 'top-14 right-1/3 scale-125', animation: 'animate-wiggle' },
            { type: 'item', emoji: '🪨', positionClass: 'bottom-16 left-1/3 scale-125', animation: 'animate-pulse' },
            { type: 'item', emoji: '🎶', positionClass: 'bottom-20 right-12 scale-125', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'Todas as criancinhas e filhotes da floresta dormiram felizes ao som da música da barragem. Castorino sorriu em sua casinha sabendo que com engenho, afeto e calma, podemos resolver qualquer turbulência do dia.',
          en: 'All the baby rabbits and standard little children slept soundly to the cute song of the dam. Castorino smiled, cozy in his cabin, knowing that peace and love can tame any hard challenge.',
          es: 'Todos los conejitos y bebés del bosque durmieron abrigados gracias a la canción de cuna del castor. Castorino sonrió, aprendiendo que con calma e ingenio todo se calma.',
          fr: 'Bientôt, tous les petits du bois s’endormirent paisiblement sous les douces notes. Castorino ferma les yeux heureux, ayant prouvé que l’ingéniosité et la douceur résolvent tous les soucis.',
          it: 'Tutti i cuccioli del bosco si addormentarano con il dolce suono del fiume. Castorino sorrise felice, sapendo che con pazienza e ingegno ogni tempesta si placa.'
        },
        visualPrompt: {
          pt: 'Castor deitado em caminha de palha sob o luar, lua redonda maravilhosa amarela, estrelas piscando, estilo Pixar 3D fofo.',
          en: 'Tired cute beaver sleeping peacefully in a tiny straw nest under a giant yellow moon, dreamlike forest atmosphere 3D Pixar rendering.',
          es: 'Castor fofo durmiendo arropado en su casita de hojas secas, hermosa luna llena en la ventana Pixar 3D.',
          fr: 'Adorable castor dormant dans sa petite cabane de branches d’arbre, grande lune brillante à travers la lucarne 3D.',
          it: 'Castoro addormentato in un nido di foglie calde sotto una maestosa luna d’oro.'
        },
        visualScene: {
          background: 'from-indigo-950 via-slate-900 to-emerald-950',
          elements: [
            { type: 'character', emoji: '😴', positionClass: 'bottom-16 left-12 scale-150', animation: 'none' },
            { type: 'item', emoji: '🌙', positionClass: 'top-10 right-14 scale-150', animation: 'animate-pulse' },
            { type: 'star', emoji: '🌟', positionClass: 'top-16 left-1/3 scale-110', animation: 'animate-pulse' },
            { type: 'star', emoji: '✨', positionClass: 'bottom-20 right-12 scale-110', animation: 'animate-spin' }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    idString: 'last-dream',
    title: {
      pt: 'O Último Sonho da Noite',
      en: 'The Nights Last Dream',
      es: 'El Último Sueño de la Noche',
      fr: 'Le Dernier Rêve de la Nuit',
      it: 'L’Ultimo Sogno della Notte',
    },
    category: 'bedtime',
    categoryLabel: {
      pt: 'Histórias para dormir',
      en: 'Bedtime Stories',
      es: 'Cuentos para Dormir',
      fr: 'Histoires du soir',
      it: 'Storie della buonanotte',
    },
    ageRange: '3-5',
    themeColor: 'violet',
    cardGradient: 'from-purple-900 via-violet-800 to-black',
    premium: true,
    coverEmoji: '✨',
    coverImage: 'ultimo_sonho',
    durationMin: 3,
    introduction: {
      pt: 'A história final da coleção revela um segredo mágico: crianças descobrem que seus sonhos são presentes delicadamente tecidos por anjinhos adormecidos.',
      en: 'The ultimate final story of our collection: children discover their dreams are beautiful light fabrics woven by sleeping ceiling stars.',
      es: 'La historia final que revela el secreto más alegre: los sueños de los niños son telas tejidas por ángeles celestiales de luz dorada.',
      fr: 'Le dernier conte de notre livre magique : les enfants découvrent que leurs voyages nocturnes sont de délicats cadeaux tissés par des anges endormis.',
      it: 'Il racconto finale della raccolta: due bambini scoprono che i sogni sono meravigliosi fili di nuvola tessuti da stelline custodi.'
    },
    characters: {
      pt: ['Pedro e Luiza (Irmãozinhos)', 'Anjinho Luz (O Guardião Celestial)'],
      en: ['Peter and Lou (Siblings)', 'Angel Light (The Celestial Guardian)'],
      es: ['Pedro y Luisa (Hermanos)', 'Angelito Luz (El Guardián del Cielo)'],
      fr: ['Pierre et Louise (Fratrie)', 'Ange de Lumière (Le Gardien du Sommeil)'],
      it: ['Pietro e Luisa (Fratellini)', 'Angelo di Luce (Il Custode d’Oro)']
    },
    pages: [
      {
        id: 1,
        text: {
          pt: 'Pedro e Luiza adoravam ver a lua da janela. Naquela noite, um pequeno ponto de poeira dourada flutuou e encostou no vidro, revelando um anjinho fofo com asinhas de nuvem branca e bochechas rosadas que dormia sorrindo.',
          en: 'Peter and Lou loved staring at the round half-moon. Tonight, a tiny speck of golden cosmic dust landed on the glass glass tab, revealing a chubby sleeping angel with clouds as wings.',
          es: 'Pedro y Luisa adoraban admirar la luna por la ventana. Esa noche, un pequeño punto de luz brillante brilló y reveló a un ángel pequeñito y tierno con alas tejidas de nubes blancas.',
          fr: 'Pierre et Louise adoraient dessiner la lune. Ce soir-là, un point de lumière d’or se posa sur la vitre, révélant un ange minuscule aux joues rebondies et aux petites ailes de nuages.',
          it: 'Pietro e Luisa amavano guardare la luna prima di dormire. Quella notte, un punto di luce brillò sul vetro rivelando un delizioso angioletto con alette di nuvola.'
        },
        visualPrompt: {
          pt: 'Anjinho fofo de bochechas rosadas dormindo no topo de nuvem branca redonda, duas criancinhas de pijamas olhando da janela rindo Pixar 3D.',
          en: 'Cute baby angel with pink cheeks sleeping on a cloud, two kids in pajamas looking in amazement from a bedroom window 3D Pixar.',
          es: 'Angelito tierno dormido en nube mullida blanca, niños curiosos sonriendo estilo Disney Pixar 3D.',
          fr: 'Ange joufflu endormi sur un nuage de coton, deux enfants en pyjama l’admirant avec bonheur en 3D.',
          it: 'Angioletto dolce che riposa su una soffice nuvola, fratellini in pigiama che ridono alla finestra.'
        },
        visualScene: {
          background: 'from-purple-950 via-slate-900 to-indigo-950',
          elements: [
            { type: 'character', emoji: '😇', positionClass: 'top-10 left-1/3 scale-150', animation: 'animate-bounce' },
            { type: 'character', emoji: '🧑', positionClass: 'bottom-16 left-12 scale-110', animation: 'none' },
            { type: 'character', emoji: '👧', positionClass: 'bottom-16 left-28 scale-110', animation: 'none' },
            { type: 'star', emoji: '🌟', positionClass: 'top-14 right-14 scale-125', animation: 'animate-pulse' }
          ]
        }
      },
      {
        id: 2,
        text: {
          pt: 'O anjinho se espreguiçou e abriu um baú flutuante. De lá de dentro saíam mantas de luz lilás e azul que cobriam a cidade inteira. "São as historinhas de ninar!", sussurrou Pedro surpreso.',
          en: 'The angel stretched his arms and unlocked a floating magic chest. Inside emerged beautiful violet and blue fabrics of pure light blankets covering the city streets below. "They are the bedtime stories!", whispered Peter.',
          es: 'El angelito estiró sus bracitos y abrió un cofre flotante. Del baúl brotaban mantas de luces suaves de color lila que envolvían la ciudad. "¡Son los cuentos!", susurró Pedro radiante.',
          fr: 'L’ange s’étira doucement et ouvrit un précieux coffre volant. S’en échappèrent de longs voiles de lumière violette qui enveloppèrent la ville. "Ce sont nos rêves !", chuchota Pierre.',
          it: 'L’angioletto si stiracchiò e aprì un forziere fluttuante. Ne uscirono coperte di luce lilla e blu che abbracciarono l’intera città. "Sono le fiabe!", sussurrò Pietro stupefatto.'
        },
        visualPrompt: {
          pt: 'Cofre voador derramando fumaça violeta brilhante com pequenas naves e animais flutuando acima da cidade iluminada à noite em 3D Pixar.',
          en: 'Whimsical scene of floating magical trunk spilling light violet mist over a dark blue illuminated city model, tiny light animals 3D style.',
          es: 'Cofre místico que vierte polvos plateados amatistas en una noche de ciudad, estrellas y casitas luminosas Pixar 3D.',
          fr: 'Coffre suspendu déversant des volutes de lumière pastel et de petites étoiles filantes sur une ville illuminée en 3D.',
          it: 'Forziere fluttuante che sprigiona nebbia viola splendente con stelline dorate sopra i tetti della città.'
        },
        visualScene: {
          background: 'from-violet-900 via-indigo-950 to-purple-950',
          elements: [
            { type: 'item', emoji: '📦', positionClass: 'top-12 left-1/3 scale-125', animation: 'animate-pulse' },
            { type: 'character', emoji: '😇', positionClass: 'bottom-16 right-12 scale-150', animation: 'animate-bounce' },
            { type: 'item', emoji: '🌃', positionClass: 'bottom-12 left-1/4 scale-150 opacity-30', animation: 'none' },
            { type: 'star', emoji: '✨', positionClass: 'top-8 right-12 scale-125', animation: 'animate-spin' }
          ]
        }
      },
      {
        id: 3,
        text: {
          pt: 'Eles voltaram para a cama macia sabendo que todas as noites estão protegidas por esses seres de luz que cuidam das crianças com carinho. E assim, fecharam os olhos com um enorme sorriso de gratidão.',
          en: 'They got back under their warm blankets knowing that every nights sleep is fully guarded by loving angels. Resting their heads on their fluffy pillows, they finally closed their eyes in deep gratitude.',
          es: 'Los niños volvieron a sus camas abrigadas sabiendo que cada noche es guardada por ángeles celestiais. Cerraron los ojitos con sonrisas tiernas y un inmenso amor.',
          fr: 'Ils retournèrent se blottir sous leurs couvertures chaudes, rassurés par l’amour des étoiles. Alors, ils fermèrent leurs petits yeux avec un grand sourire reconnaissant.',
          it: 'I bimbi ritornarono sotto le calde coperte, sapendo che ogni notte è protetta con infinito amore. E così, chiusero gli occhi con un dolcissimo sorriso.'
        },
        visualPrompt: {
          pt: 'Dois irmãozinhos dormindo felizes abraçados no quarto quentinho, anjinho pequeno de luz zelando por eles na cabeceira estilo Pixar 3D fofo.',
          en: 'Two young siblings sleeping peacefully in a bunk bed, small cute glowing cartoon angel sitting on the headboard guarding them, 3D render.',
          es: 'Hermanos durmiendo con sonrisas dulces en cama acogedora, tierno angelito luminoso cuidando en la repisa Pixar 3D.',
          fr: 'Deux enfants assoupis avec sérénité dans leur lit, petit ange de lumière dorée assis près d’eux veillant sur leur sommeil 3D.',
          it: 'Fratellini che dormono abbracciati nel lettino caldo, piccolo angelo custode di luce che veglia su di loro.'
        },
        visualScene: {
          background: 'from-purple-950 via-slate-900 to-indigo-950',
          elements: [
            { type: 'character', emoji: '😇', positionClass: 'top-10 left-12 scale-125', animation: 'animate-pulse' },
            { type: 'character', emoji: '🛌', positionClass: 'bottom-16 left-1/3 scale-150', animation: 'none' },
            { type: 'star', emoji: '💤', positionClass: 'top-14 right-1/4 scale-110', animation: 'animate-bounce' },
            { type: 'star', emoji: '✨', positionClass: 'bottom-12 right-12 scale-110', animation: 'animate-pulse' }
          ]
        }
      }
    ]
  }
];

export const STORIES: Story[] = [...INITIAL_STORIES, ...EXTRA_STORIES, ...FORTY_STORIES].sort((a, b) => a.id - b.id);
