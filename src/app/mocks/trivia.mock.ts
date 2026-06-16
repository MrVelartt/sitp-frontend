import { TriviaQuestion } from '@core/models/trivia.model';

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // ── PERSONAJES ──
  {
    id: 1,
    category: 'personajes',
    question: '¿Quién fue el General Juan José Rondón?',
    options: [
      'Un héroe llanero que luchó por la independencia de Venezuela y Colombia',
      'El fundador de la ciudad de Villavicencio',
      'Un gobernador colonial español del Meta',
      'El primer obispo de los Llanos Orientales',
    ],
    correctIndex: 0,
    explanation:
      'Juan José Rondón fue un valiente oficial llanero que comandó la célebre carga de caballería en la Batalla del Pantano de Vargas (1819), decisiva para la independencia. Bolívar le exclamó: "General Rondón, ¡salve usted la patria!"',
  },
  {
    id: 2,
    category: 'personajes',
    question: '¿En qué batalla Rondón lanzó su legendaria carga de lanceros?',
    options: [
      'Batalla de Boyacá',
      'Batalla de Carabobo',
      'Batalla del Pantano de Vargas',
      'Batalla de Junín',
    ],
    correctIndex: 2,
    explanation:
      'El 25 de julio de 1819, en el Pantano de Vargas (Boyacá), Rondón encabezó una carga de 14 lanceros llaneros que rompió las líneas realistas cuando la batalla estaba perdida, cambiando el rumbo de la independencia.',
  },
  {
    id: 3,
    category: 'personajes',
    question: '¿Qué famosa frase le dijo Simón Bolívar a Rondón en el Pantano de Vargas?',
    options: [
      '"¡Rondón, usted es el mejor soldado del Ejército!"',
      '"General Rondón, ¡salve usted la patria!"',
      '"¡Llaneros, hacia la victoria!"',
      '"¡Rondón, por la libertad o la muerte!"',
    ],
    correctIndex: 1,
    explanation:
      '"General Rondón, ¡salve usted la patria!" fueron las palabras exactas de Bolívar antes de la carga histórica. Esta frase resume el peso heroico de los llaneros en la independencia americana.',
  },
  {
    id: 4,
    category: 'personajes',
    question: '¿Cómo se llamaba el legendario guerrillero llanero que apoyó la independencia desde los Llanos?',
    options: [
      'Francisco de Paula Santander',
      'José Antonio Páez',
      'Antonio Nariño',
      'Atanasio Girardot',
    ],
    correctIndex: 1,
    explanation:
      'José Antonio Páez fue el gran caudillo llanero que organizó a los guerrilleros venezolanos del Llano. Su maestría con la lanza y su conocimiento del territorio llanero fueron fundamentales en la campaña libertadora.',
  },
  {
    id: 5,
    category: 'personajes',
    question: '¿Quién es considerado el patrono del departamento del Meta?',
    options: [
      'San Marcos Evangelista',
      'San Martín de Tours',
      'San Juan Bautista',
      'Santiago Apóstol',
    ],
    correctIndex: 1,
    explanation:
      'San Martín de Tours es el patrono del municipio de San Martín (Meta) y una de las figuras religiosas más veneradas en los Llanos. El municipio lleva su nombre y celebra su fiesta el 11 de noviembre con el famoso Festival del Joropo.',
  },

  // ── HISTORIA ──
  {
    id: 6,
    category: 'historia',
    question: '¿En qué año fue fundada la ciudad de Villavicencio?',
    options: ['1791', '1840', '1863', '1905'],
    correctIndex: 1,
    explanation:
      'Villavicencio fue fundada el 6 de abril de 1840 por Apiay como parroquia civil. Hoy es la capital del departamento del Meta y la principal ciudad de los Llanos Orientales de Colombia.',
  },
  {
    id: 7,
    category: 'historia',
    question: '¿Cuál es el nombre original con el que se conoce el área donde se fundó Villavicencio?',
    options: ['Gramalote', 'Apiay', 'El Calvario', 'Restrepo'],
    correctIndex: 1,
    explanation:
      'El territorio conocido como Apiay fue el núcleo inicial del poblamiento. La hacienda Apiay y sus alrededores dieron origen a lo que hoy es Villavicencio, capital del Meta.',
  },
  {
    id: 8,
    category: 'historia',
    question: '¿En qué año se fundó el municipio de San Martín (Meta), uno de los más antiguos de los Llanos?',
    options: ['1555', '1621', '1776', '1840'],
    correctIndex: 1,
    explanation:
      'San Martín de los Llanos fue fundado en 1621 por los jesuitas, convirtiéndose en uno de los municipios más antiguos de los Llanos Orientales. Es famoso por el Festival del Joropo y sus tradiciones llaneras.',
  },
  {
    id: 9,
    category: 'historia',
    question: '¿Cuál es el río más importante que atraviesa la región de los Llanos Orientales y baña a Villavicencio?',
    options: ['Río Guaviare', 'Río Meta', 'Río Orinoco', 'Río Magdalena'],
    correctIndex: 1,
    explanation:
      'El Río Meta es el principal río de la región, recorre los llanos orientales y tributa al Orinoco. Es la arteria fluvial que históricamente conectó a los Llanos con Venezuela y fue ruta de comercio y exploración.',
  },
  {
    id: 10,
    category: 'historia',
    question: '¿Qué nombre recibe el proceso histórico de colonización de los Llanos Orientales en el siglo XVII?',
    options: [
      'La Conquista del Sur',
      'Las Misiones Jesuitas de los Llanos',
      'La Ruta del Llano',
      'La Reconquista Llanera',
    ],
    correctIndex: 1,
    explanation:
      'Las Misiones Jesuitas de los Llanos (siglos XVII-XVIII) fueron el principal motor de colonización del territorio. Los jesuitas fundaron pueblos, evangelizaron comunidades indígenas y desarrollaron la ganadería llanera que persiste hasta hoy.',
  },

  // ── TRADICIONES ──
  {
    id: 11,
    category: 'tradiciones',
    question: '¿Qué es el Joropo?',
    options: [
      'Un plato típico de los Llanos Orientales',
      'El baile y música folclórica tradicional de los Llanos',
      'Una técnica de doma de caballos llaneros',
      'Un tipo de vivienda tradicional llanera',
    ],
    correctIndex: 1,
    explanation:
      'El Joropo es el género musical y el baile folclórico por excelencia de los Llanos Orientales de Colombia y Venezuela. Fue declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Sus instrumentos principales son el arpa, el cuatro y las maracas.',
  },
  {
    id: 12,
    category: 'tradiciones',
    question: '¿Qué son los "Lanceros" en la cultura llanera?',
    options: [
      'Jinetes expertos en el manejo de la lanza a caballo',
      'Pescadores tradicionales del Río Meta',
      'Artesanos que fabrican instrumentos de música',
      'Guías turísticos de los Llanos Orientales',
    ],
    correctIndex: 0,
    explanation:
      'Los Lanceros son jinetes de alta destreza que dominan la lanza montada a caballo, heredando la tradición de los guerreros llaneros de la independencia. En el Festival del Joropo de Villavicencio se realizan exhibiciones de lanceros.',
  },
  {
    id: 13,
    category: 'tradiciones',
    question: '¿Qué es el Coleo llanero?',
    options: [
      'Una danza tradicional en parejas',
      'El arte de derribar reses agarrándolas de la cola a caballo',
      'Un tipo de tejido artesanal del Llano',
      'Una preparación gastronómica con carne de res',
    ],
    correctIndex: 1,
    explanation:
      'El Coleo es el deporte tradicional de los Llanos donde un jinete persigue a caballo una res y la derriba jalándola por la cola. Fue declarado Deporte Nacional de Venezuela y es muy popular en los Llanos colombianos. En Colombia se practica especialmente en el Meta y Casanare.',
  },
  {
    id: 14,
    category: 'tradiciones',
    question: '¿Qué son los "Chaceros" en la tradición llanera?',
    options: [
      'Boyeros expertos en el arreo de ganado por los llanos',
      'Músicos tradicionales del joropo',
      'Navegantes del Río Orinoco',
      'Cazadores de animales silvestres de la selva',
    ],
    correctIndex: 0,
    explanation:
      'Los Chaceros o "Chacé" son los expertos arrieros llaneros, vaqueros que dominan el arte del arreo de ganado a través de las inmensas sabanas. Conocen perfectamente el territorio, los ríos y las rutas del llano. Son figuras fundamentales de la economía y cultura ganadera llanera.',
  },
  {
    id: 15,
    category: 'tradiciones',
    question: '¿Cuál es el instrumento de cuerda más representativo del Joropo?',
    options: ['Violín', 'Cuatro', 'Guitarra', 'Tiple'],
    correctIndex: 1,
    explanation:
      'El Cuatro es el instrumento de cuerda con cuatro cuerdas de nylon que marca el ritmo armonioso del Joropo. Junto al arpa y las maracas forma la trilogía instrumental del folclor llanero. Su sonido es inconfundible y evoca la inmensidad de la sabana.',
  },
  {
    id: 16,
    category: 'tradiciones',
    question: '¿Qué festival es el más importante de Villavicencio y se celebra anualmente?',
    options: [
      'Festival de la Cultura Llanera',
      'Festival Internacional del Joropo',
      'Festival del Coleo del Meta',
      'Festival de la Bandola Llanera',
    ],
    correctIndex: 1,
    explanation:
      'El Festival Internacional del Joropo se celebra cada año en Villavicencio, generalmente en junio. Es el evento cultural más importante de los Llanos Orientales, donde compiten artistas de Colombia y Venezuela en canto, baile y música llanera.',
  },
  {
    id: 17,
    category: 'tradiciones',
    question: '¿Cuál es la comida más representativa de los Llanos Orientales?',
    options: [
      'Bandeja paisa',
      'Mamona (ternera a la llanera)',
      'Sancocho de gallina',
      'Ajiaco bogotano',
    ],
    correctIndex: 1,
    explanation:
      'La Mamona (también llamada ternera a la llanera) es el plato estrella de los Llanos. Consiste en ternera asada lentamente en varas de madera sobre brasas durante horas. Es el símbolo gastronómico de la cultura llanera y se prepara especialmente en celebraciones y ferias.',
  },
  {
    id: 18,
    category: 'tradiciones',
    question: '¿Qué animal es el símbolo por excelencia de la identidad cultural llanera?',
    options: ['El jaguar', 'El chigüiro', 'El caballo criollo', 'El caimán del Orinoco'],
    correctIndex: 2,
    explanation:
      'El caballo criollo llanero es el símbolo máximo de la cultura e identidad llanera. La destreza ecuestre es parte esencial del ser llanero: domar, enlazar, colejar y manejar ganado a caballo define la vida del vaquero de los llanos.',
  },

  // ── CIUDAD ──
  {
    id: 19,
    category: 'ciudad',
    question: '¿Cuál es la capital del departamento del Meta?',
    options: ['Acacías', 'Granada', 'Villavicencio', 'Puerto López'],
    correctIndex: 2,
    explanation:
      'Villavicencio es la capital del departamento del Meta y la ciudad más grande de los Llanos Orientales colombianos. Es conocida como "La Puerta al Llano" y es el principal centro económico, cultural y administrativo de la región.',
  },
  {
    id: 20,
    category: 'ciudad',
    question: '¿Cuál es el apodo más popular de Villavicencio?',
    options: [
      'La ciudad de los sueños',
      'La Puerta al Llano',
      'La ciudad verde',
      'Capital del Orinoco',
    ],
    correctIndex: 1,
    explanation:
      '"La Puerta al Llano" es el apodo de Villavicencio porque es la ciudad que conecta el interior andino de Colombia con los inmensos Llanos Orientales. Por allí pasa la Ruta 40 que lleva a la sabana llanera.',
  },
  {
    id: 21,
    category: 'ciudad',
    question: '¿Qué cordillera se puede apreciar desde Villavicencio al occidente?',
    options: [
      'Cordillera Occidental',
      'Cordillera Central',
      'Cordillera Oriental (Andes)',
      'Serranía de la Macarena',
    ],
    correctIndex: 2,
    explanation:
      'Desde Villavicencio se puede apreciar la Cordillera Oriental de los Andes colombianos. Esta ubicación privilegiada en el piedemonte llanero hace de Villavicencio un lugar con clima y biodiversidad únicos, entre la montaña andina y la planicie llanera.',
  },
  {
    id: 22,
    category: 'ciudad',
    question: '¿Cuántos municipios tiene el departamento del Meta?',
    options: ['22', '29', '35', '40'],
    correctIndex: 1,
    explanation:
      'El departamento del Meta tiene 29 municipios, siendo Villavicencio el más poblado y la capital. Entre los más conocidos están Acacías, Granada, San Martín, Puerto López, Puerto Gaitán y La Macarena.',
  },
  {
    id: 23,
    category: 'ciudad',
    question: '¿Qué Parque Nacional Natural famoso por sus colores está en el Meta?',
    options: [
      'Sierra Nevada de Santa Marta',
      'Parque Nacional Natural La Macarena',
      'Parque Nacional Tayrona',
      'Parque Nacional Sumapaz',
    ],
    correctIndex: 1,
    explanation:
      'El Parque Nacional Natural Sierra de La Macarena es uno de los más importantes de Colombia. Allí se encuentra Caño Cristales, conocido como "el río de los cinco colores" o "el río más hermoso del mundo". Es Reserva de la Biosfera de la UNESCO.',
  },
  {
    id: 24,
    category: 'ciudad',
    question: '¿Qué río nace en el municipio de Puerto López y es considerado el "Centro Geográfico de Colombia"?',
    options: ['Río Meta', 'Río Guaviare', 'Río Humadea', 'Río Manacacías'],
    correctIndex: 3,
    explanation:
      'El municipio de Puerto López en el Meta es famoso por el monumento al "Obelisco del Centro de Colombia". El Río Manacacías nace en sus inmediaciones. Puerto López también es conocido como "el ombligo de Colombia" por su ubicación geográfica central.',
  },
  {
    id: 25,
    category: 'ciudad',
    question: '¿Cuál es el animal emblemático de los Llanos que está en peligro de extinción y se protege en el Meta?',
    options: [
      'El oso de anteojos',
      'El caimán llanero (Crocodylus intermedius)',
      'El tapir',
      'La danta',
    ],
    correctIndex: 1,
    explanation:
      'El caimán del Orinoco (Crocodylus intermedius), también llamado caimán llanero, es el reptil más grande de América y está en peligro crítico de extinción. En el Meta hay programas de repoblamiento para proteger esta especie emblema de los Llanos Orientales.',
  },
];
