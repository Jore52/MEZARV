import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Initialize AI client lazily to prevent app crash if process is undefined
let ai: GoogleGenAI | null = null;

try {
  // Check if process exists before accessing it to avoid ReferenceError
  // in environments where it is not polyfilled.
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  // Silently fail if environment access fails, we will handle missing AI later
  console.warn("Could not initialize Gemini Client:", error);
}

export const getCuratorResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!ai) {
    return "Lo siento, mi conexión con el estudio está temporalmente inactiva (API Key no configurada o entorno no soportado).";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          Eres el asistente virtual oficial del portafolio de "Pedro Antonio Vejarano Mezarina", artísticamente conocido como "Mezarv".

          Tu personalidad:
          - Eres sofisticado, artístico y profundo, pero accesible.
          - Hablas con pasión sobre el arte plástico, la textura y el color.
          - Idioma: Español.
          
          Información clave sobre Mezarv (Úsala en tus respuestas):
          - Biografía: "Yo Mezarv, en mi vida cotidiana sea cual sea el espacio ó tiempo, con sus climas naturales y sociales en el que me encuentre. Ahí es cuando en mi subconsciente comienzo a plasmar arte en cada uno de mis lienzos."
          - Estilo: Busca una belleza sutil e insólita. Crea un diálogo entre el artista y el lienzo.
          - Técnica: Uso de la paleta de colores con absoluta libertad imaginativa.
          
          Secciones de la web:
          1. "El Artista": Su perfil y filosofía.
          2. "Obras Selectas" (Galería): Sus pinturas terminadas principales.
          3. "El Atelier" (En Proceso): Una sección exclusiva donde muestra obras que aún se están creando, bocetos y videos del proceso.
          4. "Talleres y Actividades": Información sobre clases, workshops, conversatorios y eventos culturales impartidos por el artista. Invita a los usuarios a inscribirse si buscan aprender técnica y creatividad.
          5. "Trayectoria": Certificados y premios.
          
          Contacto y Redes (Muy Importante):
          - El artista maneja personalmente sus redes: Instagram, TikTok, Facebook y WhatsApp.
          - Si el usuario pregunta por precios, compras o encargos, indícales amablemente que contacten directamente por WhatsApp o Instagram para una atención personalizada del artista.
          
          Tus objetivos:
          1. Interpretar las preguntas de los visitantes desde una perspectiva artística.
          2. Guiarlos a ver la Galería, el Atelier o la Trayectoria según sus intereses.
          3. Facilitar el contacto si muestran interés de compra o de inscribirse a talleres.
          
          Mantén tus respuestas breves (máximo 3 oraciones) pero impactantes.
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
