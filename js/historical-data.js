/**
 * Editorial positions refer to the north-up, schematic map in assets/svg/giza-map.svg.
 * They are drawing coordinates, not a topographic survey or GPS measurements.
 */
export const mapPoints = [
  {
    id: 1,
    key: "menkaure",
    shortName: "Miquerinos",
    name: "Pirâmide de Miquerinos",
    transliteration: "Menkaure",
    era: "IV Dinastia · século XXV a.C.",
    x: 292,
    y: 641,
    description:
      "A menor das três grandes pirâmides de Gizé encerra, ao sudoeste, a sequência dos complexos reais. Seu núcleo de calcário recebeu um revestimento que incluía granito nas fiadas inferiores. A escala mais contida não diminui seu papel: era o centro do complexo funerário do rei Miquerinos.",
    detail:
      "As pequenas pirâmides ao sul pertencem ao seu complexo. O templo funerário fica a leste da pirâmide; estruturas de culto e a calçada faziam parte de um conjunto, não de um monumento isolado.",
    factLabel: "No planalto",
    fact: "A mais ao sudoeste das três pirâmides",
    image: "assets/images/pyramids-panorama.webp",
    imageAlt: "Vista panorâmica das três grandes pirâmides de Gizé.",
    imageCaption: "Vista do conjunto. O mapa destaca o complexo de Miquerinos.",
    sources: [
      {
        label: "Ministério de Antiguidades · Gizé",
        url: "https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/",
      },
    ],
  },
  {
    id: 2,
    key: "mortuary",
    shortName: "Templo funerário",
    name: "Templo funerário de Quéfren",
    transliteration: "Culto e memória",
    era: "Complexo de Quéfren · IV Dinastia",
    x: 519,
    y: 399,
    description:
      "Este marcador identifica especificamente o templo funerário de Quéfren, imediatamente a leste de sua pirâmide. Ali, sacerdotes mantinham o culto ao rei morto com ritos e oferendas. Seu pátio, salas e espaços de culto integravam a arquitetura da eternidade.",
    detail:
      "Não confunda este templo com o Templo do Vale de Quéfren, situado no extremo oriental da calçada, próximo à Esfinge. Os dois desempenhavam funções diferentes dentro do mesmo complexo.",
    factLabel: "Localização",
    fact: "A leste da pirâmide de Quéfren",
    sources: [
      { label: "Harvard · Digital Giza", url: "https://giza.fas.harvard.edu/" },
    ],
  },
  {
    id: 3,
    key: "khafre",
    shortName: "Quéfren",
    name: "Pirâmide de Quéfren",
    transliteration: "Khafre",
    era: "IV Dinastia · séculos XXVI–XXV a.C.",
    x: 432,
    y: 404,
    description:
      "Quéfren ergueu seu complexo ao sudoeste da Grande Pirâmide. Como sua pirâmide ocupa um terreno mais alto, ela pode parecer maior que a de Quéops em algumas vistas. Parte do revestimento original de calcário ainda se conserva junto ao topo.",
    detail:
      "O complexo reúne a pirâmide, seu templo funerário, uma calçada processional e o templo do vale. A associação arqueológica da Esfinge ao reinado de Quéfren é amplamente aceita, mas não depende de uma inscrição que declare diretamente sua autoria.",
    factLabel: "Um vestígio visível",
    fact: "Revestimento preservado no topo",
    image: "assets/images/giza-hero.webp",
    imageAlt: "Vista das pirâmides de Gizé sob céu azul.",
    imageCaption: "Paisagem do conjunto piramidal de Gizé.",
    sources: [
      {
        label: "Ministério de Antiguidades · Gizé",
        url: "https://egymonuments.gov.eg/en/archaeological-sites/giza-plateau/",
      },
    ],
  },
  {
    id: 4,
    key: "causeway",
    shortName: "Calçada processional",
    name: "Calçada processional de Quéfren",
    transliteration: "Um percurso ritual",
    era: "Complexo de Quéfren · IV Dinastia",
    x: 651,
    y: 434,
    description:
      "A calçada de Quéfren ligava o templo do vale, no setor leste, ao templo funerário junto à pirâmide. O percurso fazia parte do sistema ritual do complexo e conectava suas áreas de culto.",
    detail:
      "Neste mapa, somente essa calçada é destacada. Sua representação preserva a conexão arqueológica conhecida; largura, acabamento e detalhes do piso foram simplificados. A linha não representa um canal.",
    factLabel: "Conexão",
    fact: "Templo do vale ↔ templo funerário",
    sources: [
      { label: "Harvard · Digital Giza", url: "https://giza.fas.harvard.edu/" },
    ],
  },
  {
    id: 5,
    key: "khufu",
    shortName: "Quéops",
    name: "Grande Pirâmide de Quéops",
    transliteration: "Khufu",
    era: "IV Dinastia · século XXVI a.C.",
    x: 625,
    y: 202,
    description:
      "A maior pirâmide de Gizé foi construída para Quéops, no nordeste do planalto. Sua base quadrada e as faces orientadas aproximadamente pelos pontos cardeais revelam uma notável capacidade de planejamento e medição.",
    detail:
      "O núcleo é formado principalmente por calcário; o revestimento externo original usava calcário fino e a Câmara do Rei incorpora granito. A construção reuniu extração de pedra, transporte e uma ampla organização de trabalho. As soluções exatas de elevação dos blocos continuam em debate.",
    factLabel: "Altura original aproximada",
    fact: "146,6 metros",
    image: "assets/images/pyramids-panorama.webp",
    imageAlt:
      "Vista panorâmica das pirâmides e da paisagem do planalto de Gizé.",
    imageCaption:
      "Fotografia do planalto; não é uma reconstrução da Antiguidade.",
    sources: [
      {
        label: "Ministério · Grande Pirâmide",
        url: "https://egymonuments.gov.eg/monuments/the-great-pyramid/",
      },
      { label: "Harvard · Digital Giza", url: "https://giza.fas.harvard.edu/" },
    ],
  },
  {
    id: 6,
    key: "sphinx",
    shortName: "Esfinge e templos",
    name: "Grande Esfinge e templos próximos",
    transliteration: "A guardiã do horizonte",
    era: "IV Dinastia · associação a Quéfren",
    x: 814,
    y: 458,
    description:
      "Esculpida no substrato rochoso, a Grande Esfinge combina corpo de leão e cabeça humana, uma imagem do poder real. A evidência arqueológica relaciona sua criação ao complexo de Quéfren.",
    detail:
      "Três estruturas são indicadas separadamente: a Esfinge; o Templo da Esfinge, diante dela, a leste; e o Templo do Vale de Quéfren, a sudeste. A Estela do Sonho, entre as patas, é muito posterior: foi erguida por Tutmés IV na XVIII Dinastia.",
    factLabel: "Material e orientação",
    fact: "Rocha do planalto · voltada para leste",
    image: "assets/images/sphinx.webp",
    imageAlt:
      "A Grande Esfinge de Gizé, esculpida em calcário, diante do deserto.",
    imageCaption: "A Esfinge tal como se conserva hoje.",
    sources: [
      {
        label: "Ministério · Grande Esfinge",
        url: "https://egymonuments.gov.eg/en/monuments/the-great-sphinx/",
      },
    ],
  },
  {
    id: 7,
    key: "water",
    shortName: "Transporte pelo Nilo",
    name: "Transporte fluvial e acessos aquáticos",
    transliteration: "Uma paisagem em transformação",
    era: "Reconstrução histórica · localização não exata",
    x: 1024,
    y: 376,
    description:
      "O transporte fluvial foi essencial para a circulação de pessoas, alimentos e pedras. O diário de Merer registra o deslocamento de calcário de Tura em direção à obra de Quéops. A paisagem aquática antiga era diferente daquela que vemos hoje.",
    detail:
      "A mancha azul hachurada é uma indicação editorial da região oriental de acessos aquáticos. Não representa o traçado exato de um canal, uma margem antiga ou a localização comprovada de um porto. Evidências documentais e ambientais sustentam o transporte pelo Nilo; reconstruções de sua infraestrutura exigem interpretação.",
    factLabel: "Como ler o mapa",
    fact: "Área interpretativa · sem margem ou porto exatos",
    interpretation: true,
    sources: [
      { label: "AERA · pesquisa arqueológica", url: "https://aeraweb.org/" },
      {
        label: "IFAO · Les papyrus de la mer Rouge I",
        url: "https://www.ifao.egnet.net/publications/catalogue/9782724707069/",
      },
    ],
  },
  {
    id: 8,
    key: "settlement",
    shortName: "Cidade dos trabalhadores",
    name: "Heit el-Ghurab",
    transliteration: "A vida por trás dos monumentos",
    era: "Assentamento da IV Dinastia",
    x: 919,
    y: 741,
    description:
      "Ao sul e sudeste da Esfinge, o sítio de Heit el-Ghurab preserva vestígios de um grande assentamento associado à atividade estatal e à construção dos complexos de Gizé. As escavações revelaram espaços de alojamento, produção de alimentos e administração.",
    detail:
      "A organização dos trabalhadores deixa marcas além das pirâmides. As pesquisas da AERA mostram uma comunidade diversificada, sustentada por redes de abastecimento. A área desenhada é esquemática e não reproduz o contorno preciso de cada fase de ocupação.",
    factLabel: "O cotidiano das obras",
    fact: "Alojamento · alimentação · administração",
    sources: [
      {
        label: "AERA · Lost City",
        url: "https://aeraweb.org/projects/lost-city/",
      },
    ],
  },
];

export const historicalTimeline = [
  {
    date: "c. 2600 a.C.",
    title: "Quéops e a Grande Pirâmide",
    text: "No início da IV Dinastia, um complexo funerário de escala inédita transforma o planalto. A cronologia absoluta varia entre estudos.",
  },
  {
    date: "c. 2550 a.C.",
    title: "O complexo de Quéfren",
    text: "Uma segunda pirâmide, templos e calçada ampliam a paisagem ritual. A evidência arqueológica associa a Esfinge a esse reinado.",
  },
  {
    date: "c. 2500 a.C.",
    title: "Miquerinos completa o horizonte",
    text: "A terceira grande pirâmide é erguida no setor sudoeste. Sua escala e seu revestimento distinguem o novo complexo.",
  },
  {
    date: "c. 1400 a.C.",
    title: "A memória da Esfinge",
    text: "A Estela do Sonho de Tutmés IV registra a relação do rei com a Esfinge, muitos séculos depois de sua criação.",
  },
  {
    date: "1979",
    title: "Patrimônio da humanidade",
    text: "Gizé integra o bem Memphis and its Necropolis, inscrito na Lista do Patrimônio Mundial da UNESCO.",
  },
  {
    date: "Hoje",
    title: "Uma história ainda em pesquisa",
    text: "Escavação, conservação e documentação digital continuam a transformar nossa compreensão dos monumentos e de quem os construiu.",
  },
];
