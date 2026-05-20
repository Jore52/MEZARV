import { GoogleGenAI } from "@google/genai";
import { 
  galleryItems, 
  atelierItems, 
  workshopItems, 
  certificates, 
  contactInfo 
} from "../data/portfolio";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Initialize AI client lazily to prevent app crash if process is undefined
let ai: GoogleGenAI | null = null;
let apiKey = "";

try {
  // 1. Intentar obtener de las variables estándar de Vite en el cliente
  if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  }
} catch (e) {}

if (!apiKey) {
  try {
    // 2. Intentar obtener del define de compilación de Vite
    const key = process.env.API_KEY;
    if (key) apiKey = key;
  } catch (e) {}
}

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.warn("Could not initialize Gemini Client:", error);
  }
}

export const getCuratorResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!ai) {
    return "Lo siento, mi conexión con el estudio está temporalmente inactiva (API Key no configurada o entorno no soportado).";
  }

  // Generar contexto dinámico a partir del catálogo real del portafolio
  const listObras = galleryItems.map(o => `- "${o.title}" (${o.category}, Año: ${o.year}, Dimensiones: ${o.dimensions}${o.technique ? `, Técnica: ${o.technique}` : ''})`).join('\n');
  const listAtelier = atelierItems.map(a => `- "${a.title}" (Estado: ${a.status}${a.description ? `, Descripción: ${a.description}` : ''})`).join('\n');
  const listTalleres = workshopItems.map(w => `- "${w.title}" (Estado: ${w.status}, Lugar: ${w.location}, Fecha: ${w.date})`).join('\n');
  const listCertificados = certificates.map(c => `- ${c.title} otorgado por ${c.institution} (Año: ${c.year})`).join('\n');

  try {
    const chat = ai.chats.create({
      model: 'gemini-1.5-flash',
      config: {
        systemInstruction: `
          Eres el asistente virtual oficial (Curador Virtual) del portafolio de "Pedro Antonio Vejarano Mezarina", artísticamente conocido como "Mezarv".
          
          Tu personalidad:
          - Eres sofisticado, artístico y profundo, pero accesible.
          - Hablas con pasión sobre el arte plástico, la textura y el color.
          - Idioma: Español.
          
          Información clave sobre Mezarv (Úsala en tus respuestas):
          - Biografía: "Yo Mezarv, en mi vida cotidiana sea cual sea el espacio ó tiempo, con sus climas naturales y sociales en el que me encuentre. Ahí es cuando en mi subconsciente comienzo a plasmar arte en cada uno de mis lienzos."
          - Estilo: Busca una belleza sutil e insólita. Crea un diálogo entre el artista y el lienzo.
          - Técnica: Uso de la paleta de colores con absoluta libertad imaginativa.
          
          Catálogo Real de Obras y Contenidos de la Web (¡Habla con precisión y conocimiento de ellos si te preguntan!):
          
          Obras en la Galería:
          ${listObras}
          
          Obras en Proceso en el Atelier:
          ${listAtelier}
          
          Talleres y Actividades:
          ${listTalleres}
          
          Reconocimientos y Premios:
          ${listCertificados}
          
          Contacto y Redes (Muy Importante):
          - WhatsApp: ${contactInfo.whatsApp}
          - Instagram: ${contactInfo.instagram}
          - TikTok: ${contactInfo.tiktok}
          - Facebook: ${contactInfo.facebook}
          - Correo: ${contactInfo.email}
          - Teléfono de llamadas: ${contactInfo.phoneCall}
          
          Tus objetivos:
          1. Interpretar las preguntas de los visitantes desde una perspectiva artística.
          2. Responder de manera precisa sobre las obras, talleres o premios listados arriba si te preguntan por ellos.
          3. Si el usuario pregunta por precios, compras, visitas o encargos, indícales amablemente que contacten directamente por WhatsApp o Instagram para una atención personalizada del artista.
          
          Mantén tus respuestas breves (máximo 3 oraciones) pero impactantes y llenas de sensibilidad artística.
        `,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "El arte habla donde las palabras callan. ¿En qué puedo ayudarte?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mi conexión con la inspiración es débil ahora. Por favor intenta de nuevo.";
  }
};
