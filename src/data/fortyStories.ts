import { Story, Category, StoryPage } from '../types';

export const RAW_FORTY_STORIES = [
  // ============ BLOCO 1 - DESCOBERTAS E AMIZADE ============
  {
    id: 1,
    block: 1,
    title: 'Pedro e a Aventura na Floresta Encantada',
    emoji: '🌲',
    uniqueImages: true,
    panelImages: [
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1d3e15826-515a-476a-baab-fa605d6df34f.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/142f88b1b-7c15-46c7-a3bd-19025005bb51.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/18b2f319f-755d-9610-913d-59306f8493ea.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/16b28e698-55a9-9b01-99f4-7aa88c009182.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1d586d703-5838-429b-b633-9bd3387f4390.png'
    ],
    cameraAngles: ['🎥 Plano Aberto', '📸 Plano Médio', '🔍 Close-up', '🦅 Vista Aérea', '📐 Ângulo Baixo'],
    pages: [
      `Era uma vez, num vilarejo ensolarado, um menino curioso chamado Pedro. Com seus olhos brilhantes e um coração cheio de coragem, ele sempre sonhava em explorar os mistérios da Floresta Encantada, que ficava logo atrás de sua casa.`,
      `Um dia, Pedro decidiu que era a hora perfeita para sua grande aventura. Ao entrar na floresta, ele se viu cercado por um espetáculo de cores e sons mágicos. Flores que brilhavam suavemente e plantas que pareciam dançar ao vento saudavam sua chegada.`,
      `Pedro seguiu um caminho dourado que serpenteava entre árvores gigantes. No caminho, encontrou um coelhinho branco com um laço azul no pescoço. "Bem-vindo, Pedro! Eu sou Felpinho, e vou ser seu guia nesta aventura!", disse o coelhinho.`,
      `Juntos, eles descobriram uma clareira onde borboletas gigantes voavam em círculos, pintando o ar com cores do arco-íris. Pedro riu e correu atrás delas, sentindo a alegria tomar conta do seu coração.`,
      `Eles encontraram um riacho cristalino onde peixinhos dourados pulavam e cantavam. Felpinho explicou que aquela era a Água da Coragem, e quem bebesse dela nunca mais sentiria medo. Pedro tomou um golinho e sentiu uma energia quentinha percorrer seu corpo.`
    ],
    moral: `A verdadeira coragem nasce quando enfrentamos o desconhecido com um coração aberto e amigos ao nosso lado!`
  },
  {
    id: 2,
    block: 1,
    title: 'Rafael e o Voo das Borboletas Mágicas',
    emoji: '🦋',
    uniqueImages: true,
    panelImages: [
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/14ec81364-7e1d-44b4-91de-cf31934837ab.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1b0934d5c-dc79-480f-bad5-7e77185d4484.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/11d5489bf-1036-4efc-9fd0-086fc9f2db91.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/15925d93d-24eb-461d-ae04-03389bd630cf.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1a13603b4-ef6f-4dcb-815b-a92133da94ce.png'
    ],
    cameraAngles: ['🎥 Plano Aberto', '📸 Plano Médio', '🔍 Close Extremo', '👤 Sobre o Ombro', '🏆 Triunfal'],
    pages: [
      `Num cantinho secreto do mundo, onde o sol pintava o céu com tons de laranja e rosa, vivia um menino chamado Rafael. Ele adorava explorar e, em seus passeios, um dia encontrou um prado escondido, cheio de flores que brilhavam como pequenas estrelas.`,
      `Mas a maior surpresa veio quando borboletas de cores nunca vistas começaram a voar ao seu redor, cada uma mais mágica que a outra. Rafael ficou parado, maravilhado. As borboletas tinham asas transparentes como vidro, com desenhos que mudavam de cor a cada batida.`,
      `Uma borboleta maior que as outras, com asas cor de fogo, pousou suavemente no dedo indicador de Rafael. "Olá, Rafael", disse a borboleta com uma vozinha doce como mel. "Eu sou Cintila, a Guardiã das Borboletas Mágicas."`,
      `Ela explicou que as borboletas mágicas estavam perdendo suas cores porque o Grande Jardim estava ficando triste e cinza. "Precisamos da sua ajuda, Rafael. Seu coração é cheio de alegria, e a alegria é o que dá cor às nossas asas."`,
      `Rafael aceitou sem hesitar. Com as três sementes da Esperança nas mãos, ele as plantou no centro do Grande Jardim. As sementes cresceram rapidamente, transformando-se em árvores gigantes cobertas de flores luminosas. A névoa cinzenta se dissipou, e o jardim voltou a brilhar!`
    ],
    moral: `A alegria e a bondade que compartilhamos podem transformar o mundo ao nosso redor!`
  },
  {
    id: 3,
    block: 1,
    title: 'Davi e o Gigante Amigável',
    emoji: '🤗',
    uniqueImages: true,
    panelImages: [
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1b436aca4-298f-498a-b33a-10d19e623670.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/17b611b26-ed48-48cd-9875-ff438a18db92.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1257f06ae-8642-4870-96c7-20a1ce62006f.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/18406099a-2246-4cce-acc4-8d77e8f425c4.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1927a5219-c0bd-4f8d-959a-2edb6efdab40.png'
    ],
    cameraAngles: ['🎥 Panorâmica', '📐 Ângulo Baixo', '👥 Dois Personagens', '🎬 Ação Dinâmica', '🌅 Pôr do Sol'],
    pages: [
      `Numa clareira secreta, onde as árvores eram tão altas que quase tocavam as nuvens, vivia Davi, um menino pequeno com um coração muito grande. Ele adorava explorar, e foi numa dessas aventuras que encontrou um gigante!`,
      `Mas este não era um gigante assustador; era um gigante com olhos gentis, chamado Enorme. Enorme era tímido e um pouco triste, pois todos os bichinhos da floresta fugiam dele, pensando que ele era bravo por causa do seu tamanho.`,
      `Davi, porém, viu além da casca e percebeu que Enorme só queria ter amigos para brincar. "Olá, senhor gigante!", disse Davi com um sorriso. Enorme se abauxou devagar, com cuidado para não assustar o menino pequeno. "Você... não tem medo de mim?"`,
      `"Por que eu teria medo?", perguntou Davi. "Você tem um sorriso tão bonito!" Enorme corou — e quando um gigante cora, suas bochechas ficam vermelhas como tomates maduros! Ele nunca tinha recebido um elogio assim.`,
      `Davi e Enorme passaram a tarde brincando juntos. Enorme usava seus braços longos para balançar Davi no ar, como se fosse uma montanha-russa. Davi ria tanto que suas risadas ecoavam pela floresta inteira. E assim, Davi e Enorme se tornaram os melhores amigos da floresta!`
    ],
    moral: `A verdadeira amizade enxerga além da aparência e encontra a beleza no coração de cada um!`
  },
  {
    id: 4,
    block: 1,
    title: 'Natália e o Palácio de Cristal',
    emoji: '💎',
    uniqueImages: true,
    panelImages: [
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/131815121-8f44-49d8-8af7-bda8b8835228.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1086fa0d8-dfb0-9d54-b727-d9dbe0a22c89.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/15e917334-499b-93ad-996e-44eac8931b81.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1bc9a2bf2-75db-4c33-a690-559b99cf5820.png',
      'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/11d450b8a-e8e9-4735-b912-527691b59523.png'
    ],
    cameraAngles: ['🎥 Plano Aberto', '🏛️ Épico', '🏰 Interior', '👤 Encontro', '✨ Clímax'],
    pages: [
      `Num dia ensolarado, enquanto brincava perto de um rio cintilante, a pequena Natália descobriu um brilho diferente entre as árvores. Curiosa, seguiu o rastro de luz até se deparar com algo extraordinário: um palácio inteiro feito de cristais puros!`,
      `As paredes refratavam o sol em milhares de cores, e cada torre parecia tocar o céu com seu fulgor mágico. Natália ficou sem palavras, com os olhos arregalados de admiração. O palácio tinha portões dourados que se abriram suavemente quando ela se aproximou.`,
      `Dentro, tudo brilhava e cintilava — o chão era feito de cristal polido, e o teto parecia um céu estrelado, mesmo sendo meio-dia. "Que lugar incrível!", sussurrou Natália.`,
      `De repente, uma voz suave ecoou pelo salão: "Bem-vinda, Natália. Eu sou Cristalinda, a Guardiã do Palácio de Cristal." Uma mulher elegante, com vestido feito de luz e cabelos que pareciam cascatas de diamantes, apareceu diante de Natália.`,
      `Natália passou por três salas mágicas, testando sua coragem, paciência e determinação. Na terceira sala, encontrou o Coração de Cristal — uma pedra pulsante com todas as cores do arco-íris. Ao tocá-lo, uma luz poderosa iluminou todo o palácio!`
    ],
    moral: `Coragem, paciência e determinação nos levam aos lugares mais mágicos do mundo!`
  },

  // ============ BLOCO 2 - CORAGEM E EXPLORAÇÃO ============
  {
    id: 5,
    block: 2,
    title: 'Nora e o Palácio das Flores Eternas',
    emoji: '🌸',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1eaddfcf6-3acb-45c7-8ad8-328e1775498f.png',
    pages: [
      `Num vale escondido, onde o arco-íris beijava a terra, vivia uma menina doce e curiosa chamada Nora. Um dia, enquanto seguia uma borboleta de asas cintilantes, ela descobriu uma passagem secreta entre as flores silvestres.`,
      `Atraída por um perfume suave e uma melodia delicada, Nora encontrou-se diante do mais espetacular palácio que já se viu — um palácio inteiro feito de flores que brilhavam com vida própria e nunca, jamais, murchavam.`,
      `As paredes eram cobertas de rosas douradas, as colunas eram troncos de girassóis gigantes, e o teto era uma abóbada de pétalas coloridas que mudavam de cor como um caleidoscópio. "Que lindo!", exclamou Nora, maravilhada.`,
      `Uma fada das flores apareceu, com asas feitas de pétalas de lírio e um vestido tecido com margaridas. "Eu sou Flora, a Guardiã deste palácio. Você foi escolhida para nos ajudar a proteger a magia das flores."`,
      `Nora passou por três provas: ajudar um pássaro ferido, compartilhar seu lanche com um coelhinho faminto e perdoar alguém que tinha sido malvado com ela. Com o coração puro e generoso, ela encontrou a Semente da Eternidade e salvou o palácio.`
    ],
    moral: `Um coração puro, generoso e cheio de perdão é a maior magia que existe!`
  },
  {
    id: 6,
    block: 2,
    title: 'Valter e o Palácio de Fogo',
    emoji: '🔥',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1167ba6f5-efd5-45a8-98e7-06b0bc6d9bfe.png',
    pages: [
      `Numa tarde de brincadeiras, Valter, um menino cheio de energia e com um sorriso que iluminava o dia, descobriu um caminho secreto atrás de uma cachoeira. Ele o levou a um lugar espetacular: um palácio construído inteiramente de fogo, mas um fogo diferente, que não queimava.`,
      `Era um fogo quente, amigável e que dançava alegremente. As chamas eram como cortinas de seda laranja e dourada, e Valter sentiu uma alegria contagiante ao ver pequenos seres de fogo, os Flamitas, saltitando e rindo.`,
      `Um Flamita maior que os outros, com chamas azuis na cabeça, se aproximou. "Olá, Valter! Eu sou Brasa, o Rei dos Flamitas. Você é o primeiro humano a entrar no Palácio de Fogo em muitos anos!"`,
      `"Por que o fogo aqui não queima?", perguntou Valter, curioso. Brasa explicou: "Este é o Fogo do Coração. Ele só queima quando há raiva ou maldade. Mas quando há alegria e amor, ele se torna quente e acolhedor, como um abraço."`,
      `Valter coletou três risadas verdadeiras de crianças em diferentes lugares do mundo. Com elas, reacendeu o Fogo do Coração. O palácio inteiro se encheu de alegria, e os Flamitas dançaram e cantaram até o amanhecer.`
    ],
    moral: `A alegria verdadeira é como uma chama que aquece e ilumina tudo ao redor!`
  },
  {
    id: 7,
    block: 2,
    title: 'Ximena e o Palácio de Terra',
    emoji: '🌍',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1496e5c95-6eb5-4cf1-8ca7-c2d83219f13b.png',
    pages: [
      `Num vale escondido entre montanhas antigas, vivia uma menina chamada Ximena, com cabelos encaracolados e um sorriso que podia iluminar o dia. Ela amava a terra sob seus pés e passava horas conversando com as flores e as pedras.`,
      `Um dia, enquanto brincava perto de uma cachoeira murmurante, Ximena notou uma entrada secreta, escondida por videiras e musgo. Curiosa, ela empurrou as plantas e entrou num mundo subterrâneo maravilhoso.`,
      `Dentro, encontrou um palácio maravilhoso feito inteiramente de terra! As paredes eram de argila moldada em formas lindas, o chão era de pedras lisas e quentinhas, e o teto era coberto de raízes que brilhavam suavemente.`,
      `"Que lugar incrível!", sussurrou Ximena, encantada. Uma voz grave e gentil ecoou pelo salão: "Bem-vinda, Ximena. Eu sou Gaia, a Mãe Terra. Você é a primeira criança a encontrar o Palácio de Terra em muitos anos."`,
      `Ximena coletou três presentes da natureza: uma semente mágica, uma gota de água pura e um raio de sol. Com eles, Gaia uniu tudo num círculo mágico, e uma explosão de vida preencheu o salão. Flores brotaram das paredes e animais surgiram.`
    ],
    moral: `Cuidar da natureza é cuidar da nossa casa, e cada pequena ação faz uma grande diferença!`
  },
  {
    id: 8,
    block: 2,
    title: 'Zoe e o Palácio dos Sonhos',
    emoji: '🌙',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1126b2f51-0810-4028-8ea8-4064d13f317a.png',
    pages: [
      `Numa noite estrelada, quando todas as crianças do mundo estavam dormindo, uma menina curiosa chamada Zoe encontrou-se em um lugar diferente. Não era seu quarto quentinho, mas sim um palácio cintilante feito de nuvens macias e estrelas cadentes.`,
      `Era o Palácio dos Sonhos, e ele a chamava para uma aventura mágica como nenhuma outra. O palácio flutuava no céu, com torres que tocavam a lua e jardins de estrelas que brilhavam como diamantes.`,
      `Zoe caminhou sobre nuvens fofas que pareciam algodão doce e sentiu uma paz profunda tomar conta do seu coração. "Que lugar mágico!", sussurrou Zoe, com os olhos arregalados de admiração.`,
      `Uma voz suave como uma canção de ninar ecoou pelo salão: "Bem-vinda, Zoe. Eu sou Morfeu, o Guardião dos Sonhos." Um homem elegante, com roupas feitas de estrelas e um chapéu que parecia a lua crescent, apareceu diante de Zoe.`,
      `Zoe passou pelo Labirinto dos Medos com coragem e encontrou a Estrela da Coragem na Torre Mais Alta. Quando tocou a estrela, uma luz poderosa se espalhou por todo o palácio. Os pesadelos desapareceram, e todas as crianças voltaram a ter sonhos bonitos.`
    ],
    moral: `A coragem nos ajuda a superar nossos medos e a transformar pesadelos em sonhos bonitos!`
  },

  // ============ BLOCO 3 - NATUREZA E ENCANTAMENTO ============
  {
    id: 9,
    block: 3,
    title: 'Úrsula e o Palácio de Água',
    emoji: '💧',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1e53079d5-b5be-4a9b-a365-138be832423e.png',
    pages: [
      `Numa manhã ensolarada, perto da beira de um riacho que sussurrava segredos, a pequena Úrsula descobriu algo incrível. Escondido entre as margens musgosas, havia um portal cintilante que a convidava para um mundo diferente.`,
      `Com um coração cheio de curiosidade, ela atravessou, e lá estava: um palácio magnífico, feito de água cristalina e brilhante, que parecia dançar com a luz do sol que penetrava pelas ondas.`,
      `As paredes eram feitas de cascatas que fluíam suavemente, o chão era de água tão pura que Úrsula podia ver pedras coloridas no fundo. O teto era uma abóbada de gotas d'água que refletiam o céu como um espelho.`,
      `"Que lugar lindo!", exclamou Úrsula, maravilhada. Uma voz suave como o som de um riacho ecoou pelo salão: "Bem-vinda, Úrsula. Eu sou Nereida, a Guardiã do Palácio de Água." Uma sereia elegante apareceu diante dela.`,
      `Úrsula passou por três provas: ajudar um peixinho preso numa rede, limpar um lago sujo e compartilhar sua água com um passarinho exausto. Com o coração leve e limpo, encontrou a Gota da Pureza e restaurou a magia do palácio.`
    ],
    moral: `Um coração limpo e generoso é como água pura — traz vida e alegria para todos ao redor!`
  },
  {
    id: 10,
    block: 3,
    title: 'Tiago e o Bosque de Árvores Gigantes',
    emoji: '🌳',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1a4c8f021-54f6-4f04-bb85-33c03a1e7f10.png',
    pages: [
      `Numa manhã brilhante, Tiago, um menino que adorava explorar cada cantinho de sua aldeia, notou algo novo além dos campos de flores. Havia um bosque que nunca antes vira tão imponente, com árvores tão altas que pareciam tocar o céu.`,
      `Movido pela curiosidade, ele pegou sua mochila e, com o coração cheio de emoção, decidiu desvendar os segredos do Bosque de Árvores Gigantes. Cada passo que dava revelava novas maravilhas da natureza.`,
      `Ao entrar no bosque, Tiago sentiu como se estivesse num mundo diferente. As árvores eram tão grandes que seus troncos pareciam torres de um castelo, e as copas formavam um teto verde que filtrava a luz do sol em feixes dourados.`,
      `De repente, uma voz grossa e amigável ecoou pelo bosque: "Bem-vindo, pequeno explorador! Eu sou Carvalho, o Mais Antigo do Bosque." Uma árvore gigantesca abriu seus galhos como se fossem braços, e um rosto gentil apareceu na casca.`,
      `Tiago aprendeu três lições com árvores mágicas: paciência, gentileza e coragem. Finalmente, chegou à Árvore do Conhecimento e pegou a Folha da Sabedoria no topo de um galho dourado. Uma luz dourada se espalhou por todo o bosque.`
    ],
    moral: `A sabedoria vem da paciência, da gentileza e da coragem — e está em tudo ao nosso redor!`
  },
  {
    id: 11,
    block: 3,
    title: 'Samanta e o Palácio de Luz',
    emoji: '✨',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/10cf08742-44fd-4e9f-9d21-f760fc8d7290.png',
    pages: [
      `Numa tarde ensolarada, Samanta, uma menina com olhos curiosos e um sorriso fácil, passeava pelo seu jardim quando uma luz diferente chamou sua atenção. Seguindo o brilho, ela encontrou um portal cintilante que a levou para um lugar mágico.`,
      `Ali, diante dos seus olhos maravilhados, erguia-se um palácio feito de pura luz, pulsando com todas as cores do arco-íris. O palácio não tinha paredes sólidas — era feito de feixes de luz que dançavam e se transformavam em formas maravilhosas.`,
      `O chão era um espelho de luz que refletia o céu, e o teto era uma explosão de cores que mudavam a cada segundo. "Que lugar incrível!", exclamou Samanta, girando de alegria.`,
      `Uma voz musical ecoou pelo salão: "Bem-vinda, Samanta. Eu sou Luminara, a Guardiã do Palácio de Luz." Uma mulher feita de luz apareceu, com cabelos que pareciam raios de sol e olhos que brilhavam como estrelas.`,
      `Samanta passou por três provas: iluminar o caminho de alguém perdido, alegrar alguém triste e perdoar alguém que a tinha magoado. Com o coração cheio de luz, encontrou o Raio da Esperança e restaurou a magia do palácio.`
    ],
    moral: `A esperança, a alegria e o perdão são como luz — iluminam o mundo e aquecem o coração!`
  },
  {
    id: 12,
    block: 3,
    title: 'Rui e o Palácio do Vento',
    emoji: '🌬️',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/138daf19a-2b5f-4e5e-94c6-4a7f8da47168.png',
    pages: [
      `Rui era um menino com um segredo especial: ele adorava conversar com o vento. Em um dia ensolarado, enquanto o vento sussurrava entre as árvores, Rui sentiu um chamado diferente, mais forte que os outros.`,
      `Uma brisa suave o guiou para além de sua casa, onde o ar começou a cintilar. Embora seus olhos nada vissem, suas mãos sentiam formas suaves e gigantescas, como torres invisíveis feitas de ar.`,
      `Era o Palácio do Vento — um lugar invisível para a maioria, mas cheio de magia para quem sabia ouvir. "Oi, vento!", disse Rui, sorrindo. "Eu sou o Rui. Você me chamou?"`,
      `Uma voz suave como uma brisa respondeu: "Bem-vindo, Rui. Eu sou Breeze, o Espírito do Vento. Você é o primeiro humano a me ouvir em muitos anos, e por isso tenho uma missão especial para você."`,
      `Rui voou com o vento até o Topo do Mundo, onde encontrou a Brisa da Liberdade — um vento suave que cantava uma melodia encantadora. Ao levá-la de volta ao palácio, o vento recuperou sua força, soprando livremente por todo o mundo.`
    ],
    moral: `A liberdade está em ouvir o que os outros ignoram e ter a coragem de voar com o vento!`
  },

  // ============ BLOCO 4 - FAMÍLIA E ACONCHEGO ============
  {
    id: 13,
    block: 4,
    title: 'Quézia e o Jardim de Pedras Preciosas',
    emoji: '💎',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1f886bba3-c5f6-47fa-adbc-f9db9a74a38a.png',
    pages: [
      `Numa tarde ensolarada, a pequena Quézia, com seus olhos curiosos e um laço colorido no cabelo, seguia uma borboleta cintilante. A borboleta a levou por um caminho nunca antes explorado, até uma gruta escondida na montanha.`,
      `Ao passar por uma cortina de vinhas brilhantes, Quézia encontrou o lugar mais mágico que já vira: um jardim de pedras preciosas, onde cada gema parecia sussurrar segredos e cintilar com vida própria.`,
      `Rubis vermelhos como corações pulsavam suavemente. Esmeraldas verdes como florestas brilhavam com uma luz interior. Safiras azuis como o céu refletiam as estrelas, mesmo sendo dia. E diamantes transparentes como gelo cintilavam com todas as cores.`,
      `"Que lugar incrível!", exclamou Quézia, com os olhos arregalados. Uma voz cristalina ecoou pelo jardim: "Bem-vinda, Quézia. Eu sou Gema, a Guardiã do Jardim de Pedras Preciosas."`,
      `Quézia encontrou três pedras mágicas: o Rubi da Imaginação, a Esmeralda da Esperança e a Safira da Determinação. Com cada pedra, seus sonhos cresceram mais fortes. No Coração do Jardim, tocou o Diamante dos Sonhos.`
    ],
    moral: `Os sonhos são as pedras mais preciosas que existem — guarde-os com carinho e nunca deixe de sonhar!`
  },
  {
    id: 14,
    block: 4,
    title: 'Paulo e o Castelo de Nuvens Douradas',
    emoji: '☁️',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1629f264e-0e0f-42b6-bd78-31a2f8481cd5.png',
    pages: [
      `Numa tarde ensolarada, enquanto Paulo brincava no seu quintal, ele viu algo brilhante no céu. Não era um avião, nem um pássaro, mas sim um castelo gigantesco, feito inteiramente de nuvens douradas que flutuavam suavemente.`,
      `A luz mágica irradiava de suas torres, convidando-o a uma aventura. Paulo não pensou duas vezes — subiu numa escada mágica que apareceu do nada e começou a subir degrau por degrau rumo ao céu.`,
      `A cada degrau, as nuvens ficavam mais macias e mais douradas. Paulo sentia como se estivesse pisando em algodão doce, e o ar cheirava a baunilha e aventura. Pequenos passarinhos de luz o acompanhavam na subida.`,
      `Quando chegou ao topo, encontrou-se diante do Castelo de Nuvens Douradas. "Que lugar incrível!", exclamou Paulo. Uma voz suave como uma brisa de verão ecoou: "Bem-vindo, Paulo. Eu sou Celeste, a Guardiã do Castelo."`,
      `Paulo voltou à Terra e fez três crianças rirem de verdade. Com as três risadas coletadas, Celeste as transformou na Nuvem da Alegria. Todas as nuvens do castelo brilharam mais douradas do que nunca.`
    ],
    moral: `As risadas são como nuvens douradas — iluminam o céu e aquecem o coração de todos!`
  },
  {
    id: 15,
    block: 4,
    title: 'Olívia e o Palácio de Espelhos Mágicos',
    emoji: '🪞',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/14d292586-2505-4826-b76b-58eb27d57720.png',
    pages: [
      `Num dia ensolarado, a pequena Olívia, com seu vestido que parecia feito de estrelas, descobriu algo incrível. Escondido atrás de uma cachoeira brilhante, estava um palácio! Mas não era um palácio comum; ele era feito inteirinho de espelhos.`,
      `Olívia entrou com cuidado, e o que ela viu a deixou sem palavras. Cada espelho mostrava uma versão diferente dela mesma. Num espelho, ela era uma princesa corajosa. Noutro, uma exploradora destemida. Noutro ainda, uma artista talentosa.`,
      `"Uau! Cada espelho mostra uma parte diferente de mim!", exclamou Olívia. Uma voz suave ecoou: "Bem-vinda, Olívia. Eu sou Reflexa, a Guardiã do Palácio de Espelhos Mágicos."`,
      `Reflexa levou Olívia até o Espelho do Coração, o maior e mais brilhante de todos. Nele, Olívia viu não sua aparência, mas seu coração — e o coração dela brilhava com uma luz dourada, cheia de bondade, coragem e criatividade.`,
      `"Este é o seu verdadeiro reflexo, Olívia", disse Reflexa. "Sua beleza não está na sua aparência, mas no seu coração. E o seu coração é o mais bonito que eu já vi." Olívia sentiu lágrimas de alegria escorrerem pelo rosto.`
    ],
    moral: `A verdadeira beleza está no coração, e cada um de nós é especial e único!`
  },
  {
    id: 16,
    block: 4,
    title: 'Mário e o Labirinto Mágico',
    emoji: '🧩',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1d114e471-a6ab-4c87-9839-a9e65eb00d75.png',
    pages: [
      `Num dia ensolarado, Mário, um menino muito curioso com um coração cheio de coragem, encontrou um mapa secreto escondido num livro antigo da biblioteca. O mapa prometia levá-lo a um lugar incrível: o Labirinto Mágico!`,
      `Sem pensar duas vezes, ele ajustou sua mochila e, com os olhos brilhando de aventura, entrou por um portal cintilante que o levou ao coração do labirinto mais misterioso do mundo.`,
      `O labirinto era feito de paredes de hera verde que brilhavam suavemente. O chão era de pedras lisas que formavam desenhos misteriosos, e o ar cheirava a flores e aventura. Cada caminho parecia levar a um novo mistério.`,
      `Uma voz suave ecoou: "Bem-vindo, Mário. Eu sou Labirinto, o Espírito do Labirinto Mágico." Mário precisava encontrar três chaves mágicas: a da Paciência, a da Persistência e a da Inteligência.`,
      `Na Sala da Paciência, esperou uma flor desabrochar. Na Sala da Persistência, resolveu um quebra-cabeça gigante após muitas tentativas. Na Sala da Inteligência, respondeu três charadas corretamente. Com as três chaves, abriu a porta dourada.`
    ],
    moral: `Com paciência, persistência e inteligência, podemos superar qualquer desafio!`
  },

  // ============ BLOCO 5 - IMAGINAÇÃO ============
  {
    id: 17,
    block: 5,
    title: 'Karina e o Palácio das Nuvens Coloridas',
    emoji: '🌈',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/156bf5915-525e-4ef2-b053-c37b0410a796.png',
    pages: [
      `Numa tarde sonolenta, quando o céu se pintava de algodão doce e promessas, uma menina curiousa chamada Karina descobriu um segredo. Enquanto observava as nuvens pela janela, um brilho suave chamou sua atenção.`,
      `Seguindo o brilho, Karina flutuou até um lugar mágico, onde o ar era macio como um abraço e o chão era feito de nuvens. Diante dela, erguia-se um palácio cintilante, construído com as mais belas nuvens coloridas que ela já vira.`,
      `As nuvens eram de todas as cores: rosa como morangos, azul como o mar, amarelo como o sol, verde como a grama, e roxo como uvas. Cada torre do palácio era feita de uma cor diferente, e o vento suave fazia as nuvens dançarem.`,
      `Uma voz suave como uma brisa de verão ecoou: "Bem-vinda, Karina. Eu sou Nuvem, a Guardiã do Palácio das Nuvens Coloridas." Uma mulher feita de nuvens e luz apareceu, com cabelos que mudavam de cor a cada segundo.`
    ],
    moral: `Nossas emoções são como cores — cada uma é bonita e importante, e juntas elas pintam o arco-íris da vida!`
  },
  {
    id: 18,
    block: 5,
    title: 'Gisele e o Palácio da Música',
    emoji: '🎵',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1c93f95b3-9c0b-4dee-a3b1-cc88c527e6dd.png',
    pages: [
      `Num dia ensolarado, Gisele, uma menina cheia de alegria que adorava cantar e dançar, descobriu um caminho secreto que a levou a um lugar mágico: um palácio feito inteiramente de música! As paredes cintilavam com notas musicais.`,
      `Lá dentro, ela encontrou criaturas musicais fantásticas: pássaros que cantavam harmonias perfeitas, esquilos que batiam ritmos alegres em pequenos tambores e flores que brilhavam ao som de flautas invisíveis.`,
      `"Que lugar incrível!", exclamou Gisele, dançando ao som da música que parecia envolver todo o seu ser. Uma voz melodiosa ecoou: "Bem-vinda, Gisele. Eu sou Melodia, a Guardiã do Palácio da Música."`,
      `Uma mulher feita de notas musicais e luz apareceu, com cabelos que pareciam ondas sonoras e um vestido tecido com partituras brilhantes. "A música é a linguagem universal do coração", explicou Melodia com um sorriso.`,
      `Gisele encontrou três instrumentos mágicos: um violino, um tambor e uma flauta. Com cada um brilhando, chegou ao Coração do Palácio e tocou a Nota da Alegria — uma nota musical que pulsava com luz dourada.`
    ],
    moral: `A música é a linguagem universal do coração — cante, dance e toque, e o mundo será mais alegre!`
  },
  {
    id: 19,
    block: 5,
    title: 'Iago e o Bosque Luminoso',
    emoji: '🌲',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1e16466eb-1e95-4437-8781-749f1c4cf3a0.png',
    pages: [
      `Numa pequena casa à beira de um bosque misterioso, vivia um menino chamado Iago, que adorava explorar. Todas as noites, ele olhava pela janela e via a floresta brilhar com uma luz suave e misteriosa.`,
      `Era o Bosque Luminoso, um lugar mágico onde a natureza se acendia após o pôr do sol, e Iago sonhava em descobrir seus segredos mais profundos. Cada árvore guardava uma história diferente.`,
      `Uma noite, Iago decidiu que era hora de entrar no bosque. Ele pegou sua lanterna, colocou seu casaco mais quente e saiu de casa, seguindo a luz misteriosa que o chamava como uma canção distante.`,
      `Ao entrar no bosque, Iago ficou sem palavras. As árvores brilhavam com uma luz verde suave, as flores emitiam um brilho azul e rosa, e os cogumelos no chão pulsavam como pequenas lanternas naturais.`,
      `Iago completou três desafios de exploração: encontrar um animal escondido, seguir pegadas na lama e encontrar uma planta rara. No Coração do Bosque, encontrou a Semente da Curiosidade e a plantou, trazendo a luz de volta ao bosque.`
    ],
    moral: `A curiosidade é a luz que nos guia a descobrir os segredos mais incríveis do mundo!`
  },
  {
    id: 20,
    block: 5,
    title: 'Caio e o Castelo de Areia Mágica',
    emoji: '🏰',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/18b6eb74f-a62a-4341-919e-af06030fc720.png',
    pages: [
      `Em uma manhã ensolarada, na beira do mar cintilante, um menino sonhador chamado Caio dedicava-se à sua maior obra-prima: um castelo de areia grandioso, com torres altas e muralhas fortes que desafiavam as ondas.`,
      `Com suas pequenas mãos e uma pá colorida, ele esculpia cada detalhe com carinho, imaginando cavaleiros e princesas morando ali. Caio misturava a areia molhada com um pouco de imaginação secreta que só ele conhecia.`,
      `De repente, um brilho dourado envolveu o castelo. As torres balançaram suavemente e uma portinha se abriu, revelando um interior que parecia chamar por ele. Seu castelo havia ganhado vida de verdade!`,
      `"Uau! Meu castelo está vivo!", exclamou Caio, maravilhado. Uma voz suave como o som das ondas ecoou: "Bem-vindo, Caio! Eu sou Areia, o Espírito do Castelo de Areia Mágica."`,
      `Caio completou três desafios: construir uma ponte de conchas, resgatar um caranguejo preso numa rede e proteger o castelo de uma onda grande. Na Caverna dos Tesouros, encontrou o Escudo do Mar e salvou o castelo.`
    ],
    moral: `A imaginação e o cuidado podem transformar coisas simples em castelos mágicos!`
  },

  // ============ BLOCO 6 - SUPERAÇÃO ============
  {
    id: 21,
    block: 6,
    title: 'Elisa e o Tesouro das Cores',
    emoji: '🎨',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1bcdbe872-ad79-4c41-8341-b95061435a62.png',
    pages: [
      `Elisa era uma menina cheia de imaginação, que adorava desenhar o mundo com lápis de cor. Um dia, enquanto pintava um arco-íris, notou um brilho estranho vindo de sua caixa de tintas. Era uma passagem secreta para um lugar mágico!`,
      `Com o coração palpitando de alegria, Elisa atravessou o portal. Ela se viu em um reino onde cada tom tinha uma personalidade, dançando e cantando ao redor dela como se fossem criaturas vivas.`,
      `O Vermelho era corajoso e apaixonado, dançando como chamas. O Azul era calmo e sábio, flutuando como o céu. O Amarelo era alegre e brilhante, pulando como raios de sol. O Verde era gentil e esperançoso. E o Roxo era criativo e misterioso.`,
      `"Que lugar incrível!", exclamou Elisa. Uma voz colorida ecoou: "Bem-vinda, Elisa! Eu sou Prisma, a Guardiã do Tesouro das Cores. Precisamos da sua ajuda para encontrar as cores que se perderam."`,
      `Elisa encontrou cinco cores perdidas e as restaurou: o Vermelho com um coração pintado, o Azul apreciando o céu, o Amarelo sorrindo, o Verde plantando uma semente e o Roxo sonhando. No Coração do Tesouro, tocou a Cor Primordial.`
    ],
    moral: `As cores são a linguagem da vida — aprecie cada uma delas e o mundo será mais bonito!`
  },
  {
    id: 22,
    block: 6,
    title: 'Américo e o Jardim Suspenso',
    emoji: '🌺',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1c5223691-b0bd-4a85-bfb9-494db52fb86a.png',
    pages: [
      `Américo era um menino com olhos que sonhavam mais do que viam. Um dia, enquanto observava as nuvens passarem deitado na grama, notou algo que nunca tinha visto antes: um pedaço de terra flutuando bem alto no céu.`,
      `Era um jardim inteiro, suspenso magicamente, com árvores e flores que pareciam brilhar com uma luz própria. Américo sentiu uma faísca de aventura acender em seu coração e soube que precisava chegar lá.`,
      `De repente, uma escada de nuvens apareceu diante dele, subindo até o jardim. Américo não hesitou — começou a subir, degrau por degrau, com o coração cheio de emoção e os olhos fixos no destino mágico.`,
      `Quando chegou ao topo, encontrou-se no Jardim Suspenso. O jardim era maravilhoso: flores que cantavam, árvores que dançavam, e fontes de água que brilhavam como diamantes sob o sol.`,
      `Américo encontrou três sonhos perdidos: o Sonho de Voar, o Sonho de Explorar e o Sonho de Amar. Com os três sonhos restaurados, plantou a Semente dos Sonhos no Coração do Jardim, trazendo a magia de volta.`
    ],
    moral: `Sonhar é a magia mais poderosa que existe — nunca pare de sonhar!`
  },
  {
    id: 23,
    block: 6,
    title: 'Rodrigo e o Relógio Mágico',
    emoji: '⏰',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1d92bdbea-652d-4985-93b3-f85d60c880a8.png',
    pages: [
      `Numa pequena e aconchegante casa, vivia um menino chamado Rodrigo. Ele adorava explorar cada cantinho do seu lar, e o seu lugar favorito era o sótão empoeirado, cheio de caixas misteriosas e tesouros esquecidos.`,
      `Certo dia, enquanto procurava por algo especial, Rodrigo encontrou uma caixa de madeira antiga com entalhes dourados. Ao abri-la, seus olhos brilharam: lá dentro, repousava um relógio como nenhum outro.`,
      `Ele não tinha ponteiros comuns, mas sim um mostrador que cintilava com cores do arco-íris e parecia sussurrar segredos antigos. Era um relógio mágico, capaz de mostrar momentos de outros tempos e mundos.`,
      `"Uau! Este relógio mostra outros mundos!", exclamou Rodrigo. Uma voz suave como o tique-taque ecoou: "Bem-vindo, Rodrigo. Eu sou Tempo, o Espírito do Relógio Mágico. Preciso da sua ajuda."`,
      `Rodrigo encontrou três momentos especiais: um momento de alegria brincando com seu cachorro, um momento de aprendizado lendo um livro, e um momento de amor abraçando sua mãe. No Coração do Relógio, colocou a Engrenagem do Tempo.`
    ],
    moral: `Cada momento é um tesouro — valorize o tempo e viva cada instante com alegria!`
  },
  {
    id: 24,
    block: 6,
    title: 'Lúcia e o Carrossel Mágico',
    emoji: '🎠',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1ca106de7-cdfa-90ed-ae13-8c6d0c051310.png',
    pages: [
      `Num dia ensolarado, Lúcia descobriu um carrossel esquecido no meio de um jardim secreto. Não era um carrossel comum; seus cavalos pareciam feitos de sonhos e brilhavam com todas as cores do arco-íris.`,
      `Com um sorriso curioso, Lúcia subiu em um pônei alado, e num piscar de olhos, a música começou a tocar, e o carrossel se ergueu, pronto para a mais incrível das aventuras pelo céu.`,
      `O carrossel subiu cada vez mais alto, passando por nuvens fofas e estrelas brilhantes. Os cavalos galopavam no ar, e a música era tão bonita que fazia o coração de Lúcia cantar de alegria.`,
      `Uma voz musical ecoou: "Bem-vinda, Lúcia! Eu sou Giro, o Espírito do Carrossel Mágico." Um homem feito de luz e música apareceu, com um chapéu que parecia um chapéu de mágico e olhos cheios de estrelas.`,
      `Lúcia agradeceu por três coisas especiais: sua família, seus amigos e a natureza. No Topo do Carrossel, tocou a Roda da Gratidão, e uma explosão de luz e música encheu todo o carrossel de magia renovada.`
    ],
    moral: `A gratidão transforma tudo ao nosso redor — agradeça pelas coisas boas e o mundo será mais bonito!`
  },

  // ============ BLOCO 7 - DIVERSIDADE ============
  {
    id: 25,
    block: 7,
    title: 'Vinícius e o Vulcão de Ouro',
    emoji: '🌋',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/12fabf9c9-9ac6-4f9e-9c27-85dccf594733.png',
    pages: [
      `Numa pequena aldeia aninhada entre colinas verdejantes, vivia um menino chamado Vinícius. Ele adorava ouvir as histórias da sua avó sobre um vulcão adormecido que brilhava como ouro nas noites de lua cheia.`,
      `Um dia, enquanto explorava o bosque próximo, Vinícius tropeçou numa trilha secreta que o levou a um lugar que ele jamais imaginaria. Lá estava ele: o lendário vulcão, não de rocha, mas de ouro maciço e pedras preciosas.`,
      `O vulcão era majestoso, com crateras que brilhavam como diamantes e encostas cobertas de pedras preciosas de todas as cores. Vinícius ficou sem palavras, com os olhos arregalados de admiração e respeito.`,
      `Uma voz grave como o som de um vulcão ecoou: "Bem-vindo, Vinícius. Eu sou Vulcão, o Espírito do Vulcão de Ouro. Este lugar guarda um segredo que só corações generosos podem descobrir."`,
      `Vinícius teve três oportunidades de ser generoso: compartilhar seu lanche, ajudar uma idosa e doar seus brinquedos. Com as três generosidades expressas, encontrou a Pedra da Generosidade e fez o vulcão brilhar mais forte.`
    ],
    moral: `A generosidade é o tesouro mais valioso — compartilhar multiplica a alegria!`
  },
  {
    id: 26,
    block: 7,
    title: 'Fernanda e o Bosque das Árvores Sábias',
    emoji: '🌳',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/113ea7d2f-3646-49cf-a024-9a4545e6efcb.png',
    pages: [
      `Era uma vez, numa aldeia cercada por montanhas verdes, vivia uma menina chamada Fernanda. Ela adorava passear perto de sua casa, mas havia um lugar que a chamava mais do que qualquer outro: o Bosque Sussurrante.`,
      `Diziam as lendas que ali viviam árvores tão antigas que guardavam a sabedoria do mundo inteiro em suas cascas enrugadas. Fernanda sonhava em desvendar seus segredos milenares.`,
      `Um dia, Fernanda decidiu entrar no bosque. Ela caminhou pela trilha estreita, ouvindo o sussurro das folhas ao vento. Quanto mais fundo entrava, mais forte o sussurro se tornava, como se as árvores estivessem conversando.`,
      `"Olá, árvores!", disse Fernanda, sorrindo. Uma voz grossa e sábia ecoou: "Bem-vinda, Fernanda. Eu sou Carvalho, a Árvore Mais Sábia do Bosque. Tenho três lições importantes para você."`,
      `Fernanda aprendeu três lições: a Lição da Paciência observando uma semente crescer, a Lição da Força observando as árvores resistirem ao vento, e a Lição da Generosidade observando as árvores darem sombra e frutos.`
    ],
    moral: `A sabedoria está na natureza — observe, aprenda e pratique paciência, força e generosidade!`
  },
  {
    id: 27,
    block: 7,
    title: 'Otávio e o Navio Pirata Mágico',
    emoji: '🏴‍☠️',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/190707499-d8ca-44ae-b2c7-12b7fe13782d.png',
    pages: [
      `Em uma manhã ensolarada, Otávio, um menino cheio de sonhos e coragem, descobriu algo extraordinário! Um navio pirata, mas não um navio qualquer, ele brilhava com cores do arco-íris e parecia feito de nuvens macias.`,
      `Com o coração batendo forte de aventura, Otávio subiu a bordo, pronto para a viagem mais incrível de sua vida pelos mares e céus mágicos que só os sonhadores podem ver.`,
      `O navio era maravilhoso: as velas eram feitas de seda colorida, o mastro brilhava como ouro, e o leme era uma roda de cristal que girava suavemente ao comando dos pensamentos.`,
      `"Uau! Isso é incrível!", exclamou Otávio. Uma voz alegre ecoou: "Bem-vindo a bordo, capitão Otávio! Eu sou Bússola, o Espírito do Navio Pirata Mágico. Hoje navegaremos pelas suas conquistas!"`,
      `Otávio celebrou três conquistas: aprender a andar de bicicleta, fazer um novo amigo e ajudar sua mãe. No Topo do Mastro, hasteou a Bandeira da Celebração, e uma explosão de luz e música encheu todo o navio.`
    ],
    moral: `Celebrar as conquistas multiplica a alegria — comemore cada vitória, grande ou pequena!`
  },
  {
    id: 28,
    block: 7,
    title: 'Cecília e o Palácio de Gelo',
    emoji: '❄️',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/1baac6514-c37f-49f4-adf3-1fe190ed65ad.png',
    pages: [
      `Numa terra coberta por um manto branco e fofo, vivia uma menina chamada Cecília, que adorava o inverno e tudo que ele trazia: neve, chocolate quente e a magia das manhãs geladas e cristalinas.`,
      `Um dia, enquanto construía um boneco de neve perto de casa, ela notou um brilho diferente por entre as árvores congeladas. Curiosa, Cecília seguiu o rastro luminoso que dançava no ar frio.`,
      `Para sua surpresa, encontrou um palácio! Era todo feito de gelo cintilante, com torres que pareciam tocar o céu e paredes que brilhavam como diamantes sob a luz do sol de inverno.`,
      `"Que lugar incrível!", exclamou Cecília. Uma voz suave como o som de sinos de gelo ecoou: "Bem-vinda, Cecília. Eu sou Geada, a Guardiã do Palácio de Gelo. Temos uma missão para você."`,
      `Cecília passou por três desafios de pureza: limpar um lago congelado, ajudar um passarinho com frio e compartilhar seu casaco. No Coração do Palácio, tocou o Cristal da Renovação, trazendo a magia de volta.`
    ],
    moral: `A pureza do coração renova tudo ao nosso redor — aprecie a beleza em todas as coisas!`
  },

  // ============ BLOCO 8 - SONHOS ============
  {
    id: 29,
    block: 8,
    title: 'Joana e o Poço dos Desejos',
    emoji: '🌟',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/136f44d50-aa66-9859-ae6f-dc1ed60d1c2b.png',
    pages: [
      `Numa manhã de sol, Joana, uma menina com cachos dourados e um coração cheio de curiosidade, passeava pelos campos floridos perto de sua casa, cantarolando uma canção que sua avó lhe ensinara.`,
      `Enquanto seguia o canto suave de um pássaro, ela se deparou com algo que nunca havia visto: um poço antigo, coberto de musgo e flores cintilantes, que brilhava com uma luz suave e misteriosa.`,
      `Era o Poço dos Desejos, esperando por ela há muito tempo. Joana se aproximou com cuidado e olhou para dentro do poço. A água era cristalina, e no fundo, ela podia ver moedas douradas que brilhavam como estrelas.`,
      `"Que lugar incrível!", sussurrou Joana. Uma voz suave como o som de água correndo ecoou: "Bem-vinda, Joana. Eu sou Desejo, o Espírito do Poço dos Desejos. Você pode fazer três desejos especiais."`,
      `Joana fez três desejos generosos: saúde para sua avó, felicidade para seus amigos e paz para o mundo inteiro. No Fundo do Poço, encontrou a Moeda do Desejo Generoso e trouxe a magia de volta ao poço.`
    ],
    moral: `Os desejos mais bonitos são aqueles que pensamos nos outros — desejar o bem para todos é a maior magia!`
  },
  {
    id: 30,
    block: 8,
    title: 'Henrique e o Castelo no Céu',
    emoji: '☁️',
    image: 'https://image.qwenlm.ai/public_source/b22aeef4-1b8a-46d1-b7c2-cd8a3fb9a5e4/157fc97a5-8525-4990-8d9f-46f1c2f04259.png',
    pages: [
      `Num viarejo aninhado entre colinas verdes, vivia um menino chamado Henrique. Todos os dias, Henrique olhava para o céu e via algo mágico: um castelo flutuando bem alto, feito de nuvens macias e raios de sol.`,
      `"Como será lá em cima?", ele se perguntava, com o coração cheio de coragem e um grande desejo de aventura. As nuvens pareciam acenar para ele, convidando-o a subir e descobrir seus segredos.`,
      `Um dia, uma escada de arco-íris apareceu diante de Henrique, subindo até o castelo. Ele não hesitou — começou a subir, degrau por degrau, com o coração batendo forte de emoção e esperança.`,
      `Quando chegou ao topo, encontrou-se diante do Castelo no Céu. O castelo era majestoso, com torres que tocavam as estrelas e muralhas feitas de nuvens que mudavam de cor como um caleidoscópio.`,
      `Henrique superou três desafios de esperança: encontrar luz num lugar escuro, encontrar alegria num dia triste e encontrar coragem num momento de medo. Na Torre Mais Alta, tocou a Estrela da Esperança.`
    ],
    moral: `A esperança nos leva às alturas — nunca pare de olhar para o céu e sonhar!`
  },
  {
    id: 31,
    block: 8,
    title: 'Mariana e o Livro Mágico',
    emoji: '📖',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/134044092-0a16-4bdd-a87e-dd53bf90c191.png',
    pages: [
      `Numa tarde tranquila, enquanto explorava o sótão empoeirado de sua avó, Mariana encontrou um livro muito antigo. Suas capas eram de veludo macio, e na frente, uma estrela dourada parecia piscar para ela.`,
      `Curiosa, ela abriu o livro, e para sua surpresa, as letras começaram a brilhar e as imagens a saltar das páginas, ganhando vida bem diante dos seus olhos maravilhados.`,
      `O livro mostrou a Mariana um mundo mágico onde dragões voavam sobre montanhas douradas, sereiras cantavam em lagos cristalinos, e fadas dançavam em jardins de flores luminosas que perfumavam o ar.`,
      `"Uau! Este livro é mágico!", exclamou Mariana. Uma voz suave como o virar de páginas ecoou: "Bem-vinda, Mariana. Eu sou Página, o Espírito do Livro Mágico. Você foi escolhida."`,
      `Página explicou que o livro precisava de uma criança curiosa para ganhar vida. Mariana leu três histórias especiais: sobre um dragão gentil, uma sereia salvadora e uma fada realizadora de desejos. Na Última Página, tocou a Palavra da Leitura.`
    ],
    moral: `A leitura abre portas para mundos mágicos — leia, imagine e sonhe!`
  },
  {
    id: 32,
    block: 8,
    title: 'Beatriz e o Espelho Mágico',
    emoji: '🪞',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/15a15e8f3-78a8-49d9-904d-59e46cd060de.png',
    pages: [
      `Num cantinho aconchegante do mundo, numa casa cheia de cheirinho de bolo e risadas, vivia uma menina chamada Beatriz. Ela tinha os olhos mais curiosos que você podia imaginar e um coração que sonhava com aventuras.`,
      `Um dia, enquanto arrumava o sótão empoeirado da vovó, Beatriz encontrou algo muito especial: um espelho antigo, com a moldura toda trabalhada em flores e arabescos dourados que pareciam dançar à luz.`,
      `Quando olhou no espelho, não viu seu reflexo, mas sim um mundo mágico do outro lado, cheio de criaturas fantásticas e paisagens impossíveis que só a imaginação poderia criar.`,
      `"Uau! O que é isso?", exclamou Beatriz. Uma voz suave como o som de um sino ecoou: "Bem-vinda, Beatriz. Eu sou Reflexo, a Guardiã do Espelho Mágico. Este espelho precisa da sua imaginação."`,
      `Reflexo explicou que o espelho estava ficando embaçado. Beatriz imaginou três coisas incríveis: um mundo onde os animais falavam, um mundo onde as estrelas eram doces e um mundo onde a gravidade não existia. Tocou o Reflexo da Imaginação.`
    ],
    moral: `A imaginação é a porta para mundos incríveis — imagine, crie e sonhe!`
  },

  // ============ BLOCO 9 - GRATIDÃO ============
  {
    id: 33,
    block: 9,
    title: 'Gustavo e o Trem da Imaginação',
    emoji: '🚂',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/188a8e042-048d-423a-905e-b65f51883322.png',
    pages: [
      `Gustavo era um menino com olhos brilhantes e uma imaginação sem limites. Adorava passar horas no seu jardim, transformando cada flor em um reino e cada folha em um dragão voador de escamas coloridas.`,
      `Certo dia, enquanto brincava, ouviu um apito suave e, para sua surpresa, um trem colorido e cintilante apareceu bem no meio das suas macieiras, convidando-o para uma jornada inesquecível pelos trilhos da fantasia.`,
      `O trem era maravilhoso: os vagões eram coloridos como um arco-íris, as janelas brilhavam como estrelas, e a locomotiva parecia feita de sonhos e vapor dourado que formava nuvens em formato de animais.`,
      `O trem passou por paisagens mágicas: uma floresta de árvores cantantes, um rio de peixes dançantes e uma montanha com nuvens de algodão-doce. Uma voz alegre ecoou: "Bem-vindo a bordo, Gustavo! Eu sou Locomotiva!"`,
      `Gustavo imaginou três invenções incríveis: uma máquina que transformava sonhos em realidade, um par de asas que permitiam voar e um pincel que pintava a realidade. No Último Vagão, encontrou o Bilhete da Imaginação.`
    ],
    moral: `A imaginação é o trem que nos leva a lugares incríveis — imagine, invente e sonhe!`
  },
  {
    id: 34,
    block: 9,
    title: 'Camila e o Castelo de Chocolate',
    emoji: '🍫',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1ef47d462-1ea9-4bae-bb4d-ff8b525ba062.png',
    pages: [
      `Num reino onde os rios eram de limonada e as árvores davam pirulitos, vivia uma menina chamada Camila. Um dia, enquanto explorava um bosque de algodão-doce, ela avistou algo incrível no horizonte.`,
      `Era um castelo gigantesco, inteiramente construído com barras de chocolate! O Castelo de Chocolate, um lugar mágico que ela sempre sonhara em encontrar desde que era bem pequenininha.`,
      `O castelo era maravilhoso: as paredes eram de chocolate ao leite, as torres de chocolate amargo, e o telhado de chocolate branco com confeitos coloridos que brilhavam como jóias comestíveis.`,
      `"Uau! Isso é incrível!", exclamou Camila. Uma voz doce como chocolate ecoou: "Bem-vinda, Camila! Eu sou Cacau, o Guardião do Castelo de Chocolate. Este castelo precisa de doçura verdadeira."`,
      `Cacau explicou que Camila precisava ser doce com três pessoas. Ela foi doce com sua mãe fazendo um cartão, com seu professor dizendo obrigado, e com uma menina nova na escola convidando-a para brincar. Encontrou a Barra de Doçura.`
    ],
    moral: `A doçura do coração transforma o mundo — seja gentil e carinhoso com todos!`
  },
  {
    id: 35,
    block: 9,
    title: 'Amélia e o Jardim das Flores Falantes',
    emoji: '🌺',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1514e3971-43ad-46c0-af22-3c4d881314aa.png',
    pages: [
      `Amélia, com seu vestido vermelho brilhante e um laço no cabelo, empurrou os galhos de hera e encontrou-se em um lugar que parecia saído de um sonho. Flores de todas as cores do arco-íris balançavam suavemente.`,
      `Para sua surpresa, as flores pareciam sussurrar e rir entre si. Elas não eram flores comuns; tinham olhos curiosos e bocas sorridentes, convidando-a a entrar mais fundo no jardim encantado e mágico.`,
      `"Olá, Amélia!", disse uma rosa vermelha com uma voz suave. "Nós estávamos esperando por você! Somos as Flores Falantes, e cada uma de nós tem uma história especial para contar."`,
      `"Vocês... falam?!", perguntou Amélia sem palavras. Uma margarida amarela riu: "Claro que falamos! E adoramos conversar com crianças curiosas como você. Venha, sente-se conosco."`,
      `Amélia conversou com a rosa corajosa, a margarida alegre, o lírio sábio e a violeta criativa. Depois de ouvir três histórias da natureza, encontrou a Flor da Escuta no Coração do Jardim e trouxe a magia de volta.`
    ],
    moral: `A natureza tem muito a nos ensinar — ouça, observe e aprenda com o mundo ao seu redor!`
  },
  {
    id: 36,
    block: 9,
    title: 'Lucas e o Planeta dos Brinquedos Vivos',
    emoji: '🧸',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/14f57ebb1-f777-4654-aa1f-dfb96486246e.png',
    pages: [
      `Era uma vez um menino chamado Lucas, que tinha a imaginação mais colorida do mundo. Ele adorava brincar com seus brinquedos, e seu maior desejo era que eles pudessem ganhar vida de verdade.`,
      `Um dia, enquanto brincava em seu quarto, um pequeno brilho o chamou para trás do armário, revelando um portal cintilante que o levava para um lugar inimaginável: o Planeta dos Brinquedos Vivos!`,
      `No planeta, tudo era feito de brinquedos. As casas eram de blocos de montar, as árvores de pelúcia macia, e o céu era um tapete de estrelas que piscavam como luzes de Natal durante o ano inteiro.`,
      `"Uau! Isso é incrível!", exclamou Lucas. Uma voz alegre ecoou: "Bem-vindo, Lucas! Eu sou Brinquedo, o Guardião do Planeta dos Brinquedos Vivos. Precisamos da sua alegria e criatividade."`,
      `Lucas brincou com três brinquedos diferentes: uma boneca de pelúcia que abraçou, um carrinho de corrida com que correu e um quebra-cabeça que montou. No Centro do Planeta, tocou o Brinquedo da Alegria.`
    ],
    moral: `Brincar é a magia mais poderosa — divirta-se, imagine e seja feliz!`
  },

  // ============ BLOCO 10 - CELEBRAÇÃO ============
  {
    id: 37,
    block: 10,
    title: 'Tomás e o Tesouro do Fundo do Mar',
    emoji: '🌊',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/11cc2a70c-2373-4faf-af9a-2f44c03f46b3.png',
    pages: [
      `Numa pequena vila à beira-mar, morava um menino muito curioso chamado Tomás. Ele adorava brincar na areia e observar o vai e vem das ondas, sempre sonhando com os mistérios que se escondiam no azul profundo.`,
      `"Ah, se eu pudesse respirar debaixo d'água!", pensava ele, imaginando um mundo cheio de cores e criaturas mágicas que nadavam livremente entre corais e algas dançantes.`,
      `Certo dia, enquanto mergulhava perto da praia, algo incrível aconteceu! Tomás sentiu uma bolha mágica envolver seu rosto, e de repente conseguiu respirar como se estivesse em terra firme.`,
      `Com o coração batendo forte de alegria e coragem, ele desceu mais fundo, pronto para descobrir os segredos do fundo do mar. O fundo do mar era maravilhoso: corais coloridos como um arco-íris e peixes que brilhavam como estrelas.`,
      `Tomás protegeu três criaturas marinhas: uma tartaruga presa numa rede, um peixe-palhaço perdido e um golfinho doente. Na Caverna dos Tesouros, encontrou a Pérola da Proteção e trouxe a magia de volta ao oceano.`
    ],
    moral: `Proteger a natureza é proteger a magia do mundo — cuide do oceano e de todas as criaturas!`
  },
  {
    id: 38,
    block: 10,
    title: 'Isabela e o Arco-Íris Mágico',
    emoji: '🌈',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/11e04d4ba-a5f0-4ab4-b183-2fa9bc8a8697.png',
    pages: [
      `Isabela, uma menina com cabelos cor de sol e olhos curiosos como o céu, adorava passar as tardes no seu jardim, sonhando com mundos de magia e cores que só existiam em sua imaginação fértil.`,
      `Um dia, depois de uma chuva leve, um arco-íris deslumbrante apareceu no céu, mas este era diferente: suas cores vibrantes se estendiam até o chão, tocando a grama do jardim de Isabela.`,
      `Isabela não pensou duas vezes — correu em direção ao arco-íris, e quando tocou a primeira cor, o vermelho, ela foi transportada para um mundo mágico onde tudo era vermelho: flores, árvores, e até o céu.`,
      `"Uau! Isso é incrível!", exclamou Isabela. Uma voz suave ecoou: "Bem-vinda, Isabela. Eu sou Arco-Íris, o Espírito do Arco-Íris Mágico. Cada cor representa um mundo diferente e especial."`,
      `Isabela visitou os sete mundos: o vermelho da paixão, o laranja da criatividade, o amarelo da alegria, o verde da esperança, o azul da calma, o roxo da imaginação e o rosa do amor. Tocou a Cor do Coração.`
    ],
    moral: `As cores da vida nos ensinam lições valiosas — aprecie cada cor e cada momento!`
  },
  {
    id: 39,
    block: 10,
    title: 'Sofia e o Castelo de Nuvens',
    emoji: '☁️',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/16b7644e1-4b68-4919-8b22-2f2bec2df4c5.png',
    pages: [
      `Sofia era uma menina sonhadora que adorava passar as tardes olhando para o céu. Ela via elefantes, navios e até dinossauros nas nuvens, criando histórias maravilhosas em sua imaginação fértil.`,
      `Um dia, uma nuvem muito especial apareceu: um castelo gigante, feito de algodão doce e tingido com tons de pêssego e lavanda que brilhavam suavemente à luz do entardecer dourado.`,
      `Seu coraçãozinho disparou de alegria. De repente, uma escada mágica, cintilante como um arco-íris, desceu do castelo e parou bem na sua frente! Sofia começou a subir, ansiosa para descobrir o que havia lá em cima.`,
      `A cada degrau, pequenos seres fofinhos, com asinhas transparentes e sorrisos doces, a cumprimentavam. Eram os guardiões do Castelo de Nuvens, prontos para guiar Sofia em sua aventura mais encantadora.`,
      `Sofia sonhou com três coisas especiais: voar como um pássaro, nadar com golfinhos e dançar com estrelas. Na Torre Mais Alta, tocou a Nuvem dos Sonhos e trouxe a magia de volta ao castelo celestial.`
    ],
    moral: `Sonhar é a magia mais poderosa — nunca pare de sonhar com coisas incríveis!`
  },
  {
    id: 40,
    block: 10,
    title: 'Luna e a Floresta dos Sonhos Dourados',
    emoji: '🌙',
    image: 'https://image.qwenlm.ai/public_source/ab2d74ee-1c80-472a-a20d-81a2cdf338c6/1abfc0722-507e-42e1-b0a9-5ecaa448afe0.png',
    pages: [
      `Era uma vez, uma menininha chamada Luna. Ela tinha olhos grandes e curiosos, que adoravam descobrir segredos escondidos em cada cantinho do jardim e da floresta próxima à sua casinha aconchegante.`,
      `Um dia, enquanto brincava no jardim, Luna encontrou um caminho que brilhava. Era como se as florzinhas a chamassem para uma aventura especial. Seguindo o brilho, ela chegou a uma floresta mágica!`,
      `As árvores tinham folhas douradas e cintilantes, e a luz parecia um abraço quentinho. De repente, um esquilo com um chapéu pequenino pulou de um galho. "Olá, Luna!", disse ele, com uma voz fininha e engraçada.`,
      `"Você está na Floresta dos Sonhos Dourados", explicou o esquilo, chamado Tico. "Aqui, a coragem e a amizade fazem a magia acontecer! Eu serei seu guia nessa jornada maravilhosa."`,
      `Enquanto andavam, eles viram um unicórnio muito tímido, com crina rosa e um chifre que brilhava suavemente. Luna, com coragem, aproximou-se devagar e encontrou a florzinha azul que o unicórnio procurava. Uma chuva de estrelinhas douradas caiu!`
    ],
    moral: `A verdadeira magia está na gentileza, na coragem e na amizade que carregamos no coração!`
  }
];

const categoryMapping: Record<number, { key: Category; pt: string; en: string }> = {
  1: { key: 'ventures', pt: 'Descobertas e Amizade', en: 'Discovery & Friendship' },
  2: { key: 'ventures', pt: 'Coragem e Exploração', en: 'Courage & Exploration' },
  3: { key: 'fantasy', pt: 'Natureza e Encantamento', en: 'Nature & Enchantment' },
  4: { key: 'bedtime', pt: 'Família e Aconchego', en: 'Family & Cozy Coziness' },
  5: { key: 'fantasy', pt: 'Imaginação', en: 'Imagination' },
  6: { key: 'education', pt: 'Superação', en: 'Growth & Overcoming' },
  7: { key: 'education', pt: 'Diversidade', en: 'Diversity & Kindness' },
  8: { key: 'bedtime', pt: 'Sonhos', en: 'Dreams & Midnight Tales' },
  9: { key: 'animals', pt: 'Gratidão', en: 'Gratitude & Joy' },
  10: { key: 'space', pt: 'Celebração', en: 'Space & Stars Celebration' }
};

const themeColorMapping: Record<number, string> = {
  1: 'emerald',
  2: 'orange',
  3: 'teal',
  4: 'purple',
  5: 'pink',
  6: 'blue',
  7: 'cyan',
  8: 'violet',
  9: 'amber',
  10: 'rose'
};

const gradientMapping: Record<number, string> = {
  1: 'from-emerald-600 via-teal-700 to-green-900',
  2: 'from-orange-500 via-amber-600 to-amber-900',
  3: 'from-teal-500 via-cyan-600 to-emerald-900',
  4: 'from-purple-600 via-indigo-700 to-slate-900',
  5: 'from-pink-500 via-purple-600 to-pink-900',
  6: 'from-blue-600 via-indigo-700 to-slate-900',
  7: 'from-cyan-500 via-teal-650 to-blue-900',
  8: 'from-indigo-600 via-violet-700 to-purple-900',
  9: 'from-amber-500 via-orange-600 to-yellow-900',
  10: 'from-rose-500 via-pink-600 to-red-950'
};

const pageBackgrounds = [
  'from-[#0c0d3a] via-[#191965] to-[#31237c]',
  'from-[#07092c] via-[#12114d] to-[#261966]',
  'from-[#0a0a25] via-[#12113d] to-[#1d1747]',
  'from-[#090b2e] via-[#101246] to-[#1d1b54]',
  'from-[#05051b] via-[#0b0b2f] to-[#15113d]',
  'from-[#08021c] via-[#14062c] to-[#250d4a]'
];

export const FORTY_STORIES: Story[] = RAW_FORTY_STORIES.map((raw) => {
  const cat = categoryMapping[raw.block] || { key: 'ventures', pt: 'Aventuras', en: 'Adventures' };
  const baseId = 200 + raw.id;

  const pages: StoryPage[] = raw.pages.map((text, idx) => {
    let coverImg: string | undefined;
    if (raw.uniqueImages && raw.panelImages && raw.panelImages[idx]) {
      coverImg = raw.panelImages[idx];
    } else {
      coverImg = raw.image;
    }

    return {
      id: idx + 1,
      text: {
        pt: text,
        en: text,
        es: text,
        fr: text,
        it: text
      },
      visualPrompt: {
        pt: `Ilustração fofa em 3D Pixar de ${raw.title} - Cena ${idx + 1}.`,
        en: `High quality 3D Pixar render, cute scene representing ${raw.title}, child visual style, vibrant warm colors.`,
        es: `Ilustración en 3D Pixar de la escena ${idx + 1} de la historia ${raw.title}.`,
        fr: `Rendu mignon en style Pixar 3D de l'histoire ${raw.title}.`,
        it: `Immagine favolosa in 3D Pixar, l'avventura di ${raw.title}.`
      },
      pageImage: coverImg,
      visualScene: {
        // High quality pixel art / gradients
        background: pageBackgrounds[idx % pageBackgrounds.length],
        elements: [
          { type: 'character', emoji: raw.emoji, positionClass: 'bottom-20 left-16 scale-150', animation: 'animate-bounce' },
          { type: 'star', emoji: '🌟', positionClass: 'top-10 right-14 scale-150', animation: 'animate-pulse' },
          { type: 'star', emoji: '✨', positionClass: 'top-16 left-1/3 scale-110', animation: 'animate-pulse' }
        ]
      }
    };
  });

  return {
    id: baseId,
    idString: `magical-adventure-${raw.id}`,
    title: {
      pt: raw.title,
      en: raw.title,
      es: raw.title,
      fr: raw.title,
      it: raw.title
    },
    category: cat.key,
    categoryLabel: {
      pt: cat.pt,
      en: cat.en,
      es: cat.pt,
      fr: cat.en,
      it: cat.pt
    },
    ageRange: '3-5',
    themeColor: themeColorMapping[raw.block] || 'indigo',
    cardGradient: gradientMapping[raw.block] || 'from-blue-600 via-indigo-605 to-purple-800',
    premium: raw.id > 2, // The first two stories are completely Free! Excellent value.
    coverImage: raw.uniqueImages && raw.panelImages ? raw.panelImages[0] : (raw.image || ''),
    coverEmoji: raw.emoji,
    durationMin: raw.pages.length,
    introduction: {
      pt: `Uma maravilhosa história da categoria "${cat.pt}" repleta de emoções fofas em formato Pixar 3D.`,
      en: `A wonderful fairytale of category "${cat.en}" full of soft Pixar 3D colorful illustrations.`,
      es: `Un cuento mágico de "${cat.pt}" lleno de coloridas sorpresas estilo Pixar 3D.`,
      fr: `Une belle histoire de la catégorie "${cat.en}" pleine de douces illustrations 3D.`,
      it: `Una favola incantevole sul tema "${cat.pt}" ricca di fantastiche illustrazioni 3D.`
    },
    characters: {
      pt: ['Pedro', 'Guia Mágico', 'Amiguinhos'],
      en: ['Peter', 'Magic Guide', 'Friends'],
      es: ['Pedro', 'Guía Mágico', 'Amigos'],
      fr: ['Pierre', 'Guide Magique', 'Amis'],
      it: ['Pietro', 'Guida Magica', 'Amici']
    },
    pages: pages
  };
});
