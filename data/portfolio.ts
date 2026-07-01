import { Artwork, ProcessItem, EventItem, Certificate } from '../types';

// ==========================================
// 1. GALERÍA DE OBRAS (Obras Selectas)
// ==========================================
const DEFAULT_AUTHOR = "Pedro Antonio Vejarano Mezarina ( MEZARV )";
const DEFAULT_TECHNIQUE = "Óleo s/ Lienzo";

export const galleryItems: Artwork[] = [
  // --- OBRAS EXISTENTES (Actualizadas con campos técnicos) ---
  { 
    id: '1', 
    title: 'Tiempos inconsecuentes', 
    category: 'Surrealismo', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/IVDmiK5.png', 
    dimensions: '100x120 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '2', 
    title: 'Nostalgia en Astoria', 
    category: 'Surrealismo', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/vUY5LlB.png', 
    dimensions: '80x100 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '3', 
    title: 'El Pedestal de una Guerrera Urbana', 
    category: 'Surrealismo', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/umtfcOL.jpg', 
    dimensions: '120x150 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '4', 
    title: 'Un tierno Diálogo', 
    category: 'Surrealismo', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/0hbzUOo.png', 
    dimensions: '90x110 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '5', 
    title: 'Rolf', 
    category: 'Surrealismo', 
    year: 2022, 
    imageUrl: 'https://i.imgur.com/zdOz1I2.png', 
    dimensions: '110x140 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '6', 
    title: 'Al tiempo le gotean espinas', 
    category: 'Surrealismo', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/iZHJb4I.png', 
    dimensions: '100x130 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '7', 
    title: 'Cruzando Melodías y Culturas', 
    category: 'Surrealismo', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/e7pedrs.png', 
    dimensions: '150x100 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '8', 
    title: 'Juguemos en el Parque', 
    category: 'Abstracto', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/XjONBG2.png', 
    dimensions: '120x120 cm',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },

  // --- NUEVAS OBRAS AGREGADAS (Con datos específicos) ---
  { 
    id: '9', 
    title: 'Sin título', 
    category: 'Abstracto', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/e6hdcJk.jpg', 
    dimensions: '85 x 65 cm',
    technique: 'Óleo s/ Lienzo',
    author: 'Pedro Antonio Vejarano Mezarina ( MEZARV )'
  },
  { 
    id: '10', 
    title: 'Sin título', 
    category: 'Abstracto', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/s6NDt1X.jpg', 
    dimensions: '90 x 70 cm',
    technique: 'Óleo s/ Lienzo',
    author: 'Pedro Antonio Vejarano Mezarina ( MEZARV )'
  },
  { 
    id: '11', 
    title: 'El Embajador Silencioso', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/kWQAb2f.jpg', 
    dimensions: '100 x 75 cm',
    technique: 'Óleo s/ Lienzo',
    author: 'Pedro Antonio Vejarano Mezarina ( MEZARV )'
  },
  { 
    id: '12', 
    title: 'Sin título', 
    category: 'Abstracto', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/2lQgA9u.jpg', 
    dimensions: '100 x 80 cm',
    technique: 'Óleo s/ Lienzo',
    author: 'Pedro Antonio Vejarano Mezarina ( MEZARV )'
  },
  { 
    id: '13', 
    title: 'Sin título (Ref. Azul)', 
    category: 'Abstracto', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/bRCGcDb.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '14', 
    title: 'Fragmentos en el Arenal de Pachacamac', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/muYfAnW.jpg', 
    dimensions: '150 x 100 cm',
    technique: 'Óleo s/ Lienzo',
    author: 'Pedro Antonio Vejarano Mezarina ( MEZARV )'
  },
  { 
    id: '15', 
    title: 'Dame Luz para este Camino Incierto', 
    category: 'Surrealismo', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/Vl8yH53.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '16', 
    title: 'Una Noche de Pasión en el Parque', 
    category: 'Pintura', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/XQVfVyY.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '17', 
    title: 'Sin nombre', 
    category: 'Abstracto', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/H9bT5Ov.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '18', 
    title: 'Sentimientos Insólitos', 
    category: 'Surrealismo', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/kkBydl7.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '19', 
    title: 'Una Diosa de Luz Afrodescendiente Iluminando Tiempo y Espacio', 
    category: 'Pintura', 
    year: 2023, 
    imageUrl: 'https://i.imgur.com/p0kSeKy.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  // --- ÚLTIMAS INCORPORACIONES ---
  { 
    id: '20', 
    title: 'Sin título', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/ykWEO8d.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '21', 
    title: 'Sin título', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/UU1XCB7.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '22', 
    title: 'Sin título', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/RRoSyzw.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '23', 
    title: 'Plantado por un Instinto', 
    category: 'Surrealismo', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/SF2Y8oQ.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '24', 
    title: 'Dos Pecados', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/u7ghCSp.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '25', 
    title: 'Una Libertad Incierta', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/R9RWvXd.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
  { 
    id: '26', 
    title: 'Nunca Apagues tu Luz', 
    category: 'Pintura', 
    year: 2024, 
    imageUrl: 'https://i.imgur.com/O9y63dB.jpg', 
    dimensions: 'Consultar',
    technique: DEFAULT_TECHNIQUE,
    author: DEFAULT_AUTHOR
  },
];

// ==========================================
// 2. EL ATELIER (Proceso Creativo)
// ==========================================
export const atelierItems: ProcessItem[] = [
  {
    id: 'vid_5',
    type: 'video',
    url: 'https://i.imgur.com/MUNlXcw.mp4',
    title: 'Sesión Nocturna',
    status: 'En Proceso',
    date: 'Nov 2024',
    description: 'Avance detallado de la obra en curso, trabajando luces y sombras.',
    isVertical: true
  },
  {
    id: 'vid_1',
    type: 'video',
    url: 'https://i.imgur.com/TadfQnU.mp4', 
    title: 'Génesis del Trazo',
    status: 'Bocetaje',
    date: 'Oct 2024',
    description: 'Los primeros movimientos sobre el lienzo en blanco. La incertidumbre del inicio.',
    isVertical: true
  },
  {
    id: 'img_1',
    type: 'image',
    url: 'https://i.imgur.com/9wB54XS.jpg',
    title: 'Atmósfera en Crudo',
    status: 'Experimental',
    date: 'Sep 2024',
    description: 'Estudio de texturas y fondos para la serie nocturna.',
    isVertical: false
  },
  {
    id: 'vid_2',
    type: 'video',
    url: 'https://i.imgur.com/3fgWiaX.mp4',
    title: 'Diálogo con el Lienzo',
    status: 'Primera Capa',
    date: 'Ago 2024',
    description: 'Aplicando las bases cromáticas. El lienzo empieza a responder.',
    isVertical: true
  },
  {
    id: 'img_2',
    type: 'image',
    url: 'https://i.imgur.com/OTK7JEH.jpg',
    title: 'Pigmentos Vivos',
    status: 'En Proceso',
    date: 'Jul 2024',
    description: 'Detalle de la paleta y mezcla de óleos.',
    isVertical: false
  },
  {
    id: 'vid_3',
    type: 'video',
    url: 'https://i.imgur.com/0VkGg5q.mp4',
    title: 'La Espera del Color',
    status: 'Secado',
    date: 'Jun 2024',
    description: 'Observando cómo la luz interactúa con la materia fresca.',
    isVertical: true
  },
  {
    id: 'img_3',
    type: 'image',
    url: 'https://i.imgur.com/HCYICVY.jpg',
    title: 'Detalles Ocultos',
    status: 'Detallado',
    date: 'May 2024',
    description: 'Pequeños fragmentos de una historia mayor.',
    isVertical: false
  },
  {
    id: 'vid_4',
    type: 'video',
    url: 'https://i.imgur.com/7eiNNmF.mp4',
    title: 'Barniz y Tiempo',
    status: 'Barnizado',
    date: 'Abr 2024',
    description: 'El proceso final de protección y brillo.',
    isVertical: true
  }
];

// ==========================================
// 3. TALLERES Y ACTIVIDADES (DATA REAL)
// ==========================================
export const workshopItems: EventItem[] = [
  // --- TALLERES ---
  {
    id: '1',
    title: 'Dibujo y Pintura: Infantil',
    type: 'Taller Creativo',
    date: 'Sábados y Domingos',
    location: 'Atelier Mezarv',
    description: 'Un espacio donde los niños descubren el color y la forma. Fomentamos la libertad creativa y la motricidad fina en un ambiente seguro e inspirador.',
    status: 'Abierto',
    image: 'https://i.imgur.com/yj8NdcO.jpg',
    category: 'workshop'
  },
  {
    id: '2',
    title: 'Formación Artística Juvenil',
    type: 'Clase Personalizada',
    date: 'Horarios Flexibles',
    location: 'Atelier Mezarv',
    description: 'Instrucción técnica avanzada para jóvenes. Anatomía, perspectiva y óleo. Preparación para desarrollo de estilo propio.',
    status: 'Abierto',
    image: 'https://i.imgur.com/HrRineG.jpg',
    category: 'workshop'
  },
  {
    id: '3',
    title: 'Vacaciones Útiles: Arte Total',
    type: 'Programa de Verano',
    date: 'Enero - Marzo 2025',
    location: 'Atelier Mezarv',
    description: 'Programa intensivo de verano. Exploración de materiales mixtos, historia del arte divertida y creación de proyectos grupales.',
    status: 'Próximamente',
    image: 'https://i.imgur.com/3V3TCHO.jpg',
    category: 'workshop'
  },
  
  // --- CULTURAL (Actualizado con fotos reales) ---
  {
    id: '4',
    title: 'Exposición Anual de Alumnos',
    type: 'Evento Cultural',
    date: 'Diciembre 2024',
    location: 'Galería Local',
    description: 'Muestra anual donde nuestros alumnos presentan sus mejores obras al público, cerrando el ciclo de aprendizaje.',
    status: 'Finalizado',
    image: 'https://i.imgur.com/nHPwBKB.jpg',
    category: 'culture'
  },
  {
    id: '5',
    title: 'Visitas a Museos y Galerías',
    type: 'Salida de Campo',
    date: 'Mensual',
    location: 'Museos de Lima',
    description: 'Recorridos guiados para analizar obras maestras y entender la historia del arte in situ con los alumnos.',
    status: 'Abierto',
    image: 'https://i.imgur.com/LHRdfjW.jpg',
    category: 'culture'
  },
  {
    id: '6',
    title: 'Sorteo y Rifa de Arte',
    type: 'Actividad Benéfica',
    date: 'Anual',
    location: 'Online / Presencial',
    description: 'Eventos donde sorteamos piezas originales y prints para recaudar fondos y fomentar el coleccionismo accesible.',
    status: 'Finalizado',
    image: 'https://i.imgur.com/3b4vFjd.jpg',
    category: 'culture'
  },
];

// Nueva colección para la galería multimedia de alumnos
export const studentGallery: ProcessItem[] = [
    // VIDEOS
    { id: 'v1', type: 'video', url: 'https://i.imgur.com/LgW7uKJ.mp4', title: 'Clase Maestra', status: 'En Proceso', date: '2024', description: 'Corrección de técnica en vivo.' },
    { id: 'v2', type: 'video', url: 'https://i.imgur.com/hdiVeK6.mp4', title: 'Primeros Trazos', status: 'Experimental', date: '2024', description: 'Explorando el carboncillo.' },
    { id: 'v3', type: 'video', url: 'https://i.imgur.com/7cjBu87.mp4', title: 'Concentración Total', status: 'Detallado', date: '2024', description: 'El silencio del trabajo creativo.' },
    { id: 'v4', type: 'video', url: 'https://i.imgur.com/xa06juh.mp4', title: 'Mezcla de Colores', status: 'En Proceso', date: '2024', description: 'Descubriendo nuevos tonos.' },
    { id: 'v5', type: 'video', url: 'https://i.imgur.com/GyoXk8e.mp4', title: 'Guía Personalizada', status: 'Bocetaje', date: '2024', description: 'Instrucción uno a uno.' },
    
    // IMAGENES
    { id: 'i1', type: 'image', url: 'https://i.imgur.com/s59Ve8S.jpg', title: 'Grupo de Sábado', status: 'En Proceso', date: '2024', description: 'Ambiente colaborativo.' },
    { id: 'i2', type: 'image', url: 'https://i.imgur.com/Cwcv4Hj.jpg', title: 'Bocetos Iniciales', status: 'Bocetaje', date: '2024', description: 'Planificación de la obra.' },
    { id: 'i3', type: 'image', url: 'https://i.imgur.com/bDn3PN7.jpg', title: 'Detalle y Paciencia', status: 'Detallado', date: '2024', description: 'Trabajo minucioso.' },
    { id: 'i4', type: 'image', url: 'https://i.imgur.com/csKIVdu.jpg', title: 'Alegría del Arte', status: 'Finalizado', date: '2024', description: 'Disfrutando el proceso.' },
    { id: 'i5', type: 'image', url: 'https://i.imgur.com/wHsgCIu.jpg', title: 'Nuevos Talentos', status: 'Experimental', date: '2024', description: 'Descubriendo capacidades.' },
    { id: 'i6', type: 'image', url: 'https://i.imgur.com/rjYKjD5.jpg', title: 'Concentración', status: 'En Proceso', date: '2024', description: 'Foco absoluto.' },
    { id: 'i7', type: 'image', url: 'https://i.imgur.com/y1jgMyH.jpg', title: 'El Maestro y el Alumno', status: 'En Proceso', date: '2024', description: 'Transmisión de conocimiento.' },
    { id: 'i8', type: 'image', url: 'https://i.imgur.com/0wA3dsX.jpg', title: 'Paleta de Niños', status: 'Experimental', date: '2024', description: 'Libertad de color.' },
    { id: 'i9', type: 'image', url: 'https://i.imgur.com/ysGQzvh.jpg', title: 'Obra Final', status: 'Finalizado', date: '2024', description: 'Orgullo por el trabajo realizado.' },
];

// Nueva colección para la AGENDA CULTURAL (Mix de exposiciones, visitas, rifas)
export const culturalGallery: ProcessItem[] = [
    // Videos Culturales
    { id: 'cv1', type: 'video', url: 'https://i.imgur.com/vFRP5Ob.mp4', title: 'Apertura de Exposición', status: 'Finalizado', date: '2024', description: 'Inauguración de muestra artística.' },
    { id: 'cv2', type: 'video', url: 'https://i.imgur.com/CH1pty4.mp4', title: 'Recorrido en Galería', status: 'Finalizado', date: '2024', description: 'Alumnos observando obras.' },
    { id: 'cv3', type: 'video', url: 'https://i.imgur.com/lECM4sL.mp4', title: 'Entrega de Obra', status: 'Finalizado', date: '2024', description: 'Sorteo de arte.' },
    { id: 'cv4', type: 'video', url: 'https://i.imgur.com/VFlina7.mp4', title: 'Evento Social', status: 'En Proceso', date: '2024', description: 'Compartir con la comunidad.' },
    { id: 'cv5', type: 'video', url: 'https://i.imgur.com/Qca2Nbz.mp4', title: 'Museo de Arte', status: 'Experimental', date: '2024', description: 'Análisis de técnica.' },
    { id: 'cv6', type: 'video', url: 'https://i.imgur.com/9H1wrIK.mp4', title: 'Premiación', status: 'Finalizado', date: '2024', description: 'Reconocimiento a alumnos.' },
    { id: 'cv7', type: 'video', url: 'https://i.imgur.com/kQvTXQn.mp4', title: 'Palabras del Artista', status: 'En Proceso', date: '2024', description: 'Discurso de inauguración.' },
    { id: 'cv8', type: 'video', url: 'https://i.imgur.com/R6Xm3zZ.mp4', title: 'La Rifa', status: 'Finalizado', date: '2024', description: 'Ganadores del sorteo.' },
    { id: 'cv9', type: 'video', url: 'https://i.imgur.com/qMnOUQz.mp4', title: 'Entrevista', status: 'En Proceso', date: '2024', description: 'Cobertura del evento.' },
    { id: 'cv10', type: 'video', url: 'https://i.imgur.com/tQs5d6Q.mp4', title: 'Clausura', status: 'Finalizado', date: '2024', description: 'Cierre de temporada.' },

    // Imágenes Culturales (Selección representativa)
    { id: 'ci1', type: 'image', url: 'https://i.imgur.com/kY5WLBq.jpg', title: 'Galería Llena', status: 'Finalizado', date: '2024', description: 'Gran acogida del público.' },
    { id: 'ci2', type: 'image', url: 'https://i.imgur.com/9tjHPcL.jpg', title: 'Exposición Individual', status: 'Finalizado', date: '2024', description: 'Obras de Mezarv en exhibición.' },
    { id: 'ci3', type: 'image', url: 'https://i.imgur.com/iVVNeGY.jpg', title: 'Salida de Campo', status: 'Experimental', date: '2024', description: 'Grupo de alumnos en museo.' },
    { id: 'ci4', type: 'image', url: 'https://i.imgur.com/tcPjjyU.jpg', title: 'Ganadora del Sorteo', status: 'Finalizado', date: '2024', description: 'Entrega de premio.' },
    { id: 'ci5', type: 'image', url: 'https://i.imgur.com/FiFdAP2.jpg', title: 'Reconocimiento', status: 'Finalizado', date: '2024', description: 'Diploma de honor.' },
    { id: 'ci6', type: 'image', url: 'https://i.imgur.com/ZZzOPCo.jpg', title: 'Arte en Vivo', status: 'En Proceso', date: '2024', description: 'Demostración técnica.' },
    { id: 'ci7', type: 'image', url: 'https://i.imgur.com/Pnk7HQZ.jpg', title: 'Comunidad Artística', status: 'Finalizado', date: '2024', description: 'Alumnos y maestro.' },
    { id: 'ci8', type: 'image', url: 'https://i.imgur.com/1VzfpNc.jpg', title: 'Montaje', status: 'En Proceso', date: '2024', description: 'Preparando la exposición.' },
    { id: 'ci9', type: 'image', url: 'https://i.imgur.com/Ks78yc6.jpg', title: 'Obra Destacada', status: 'Finalizado', date: '2024', description: 'Pieza central de la muestra.' },
    { id: 'ci10', type: 'image', url: 'https://i.imgur.com/O6YiLnE.jpg', title: 'Celebración', status: 'Finalizado', date: '2024', description: 'Brindis de honor.' }
];

// ==========================================
// 4. CERTIFICADOS Y DIPLOMAS (CONTENIDO REAL)
// ==========================================
export const certificates: Certificate[] = [
  { 
    id: '1', 
    title: 'Diploma de Honor al Mérito', 
    institution: 'Escuela Nacional Superior Autónoma de Bellas Artes del Perú', 
    year: 2018, // Año estimado, editable
    description: 'Reconocimiento otorgado por la excelencia académica y el destacado desempeño en las artes plásticas durante el periodo de formación.',
    imageUrl: 'https://i.imgur.com/Gng6UIy.jpg',
    icon: 'award'
  },
  { 
    id: '2', 
    title: 'Reconocimiento por Aporte Cultural', 
    institution: 'Municipalidad Distrital', 
    year: 2021, 
    description: 'Distinción honorífica por la contribución al desarrollo cultural y artístico de la comunidad a través de la exposición de obras.',
    imageUrl: 'https://i.imgur.com/JXFwdOY.jpg',
    icon: 'scroll'
  },
  { 
    id: '3', 
    title: 'Mención Honrosa', 
    institution: 'Concurso Nacional de Pintura', 
    year: 2023, 
    description: 'Galardón obtenido en certamen competitivo por la originalidad técnica y conceptual presentada en la obra concursante.',
    imageUrl: 'https://i.imgur.com/hlc5oS3.jpg',
    icon: 'star'
  }
];

// ==========================================
// 5. CONFIGURACIÓN DE CONTACTO Y REDES SOCIALES
// ==========================================
// Cambia los valores aquí y se actualizarán automáticamente en toda la web.
export const contactInfo = {
  whatsApp: "https://wa.me/51918474169", // WhatsApp de Mezarv
  instagram: "https://www.instagram.com/mezarv65/", // Instagram de Mezarv
  tiktok: "https://www.tiktok.com/@www.tiktok.commezarv", // TikTok de Mezarv
  facebook: "https://www.facebook.com/mezarv.art", // Enlace de Facebook
  email: "contacto@mezarv.art", // Correo electrónico
  phoneCall: "tel:+51918474169" // Teléfono para llamadas de Mezarv
};