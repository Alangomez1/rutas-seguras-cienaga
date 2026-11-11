import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, Lightbulb, MapPin } from 'lucide-react';
import { IncidentReport, ChatMessage } from '../types';
import { processAIQuery } from '../services/aiAssistantService';

interface AiAssistantProps {
  reports: IncidentReport[];
  onNavigateToMap: (barrio?: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ reports, onNavigateToMap }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ia',
      text: '¡Hola! Soy **Rutas Seguras IA**, tu asistente inteligente de movilidad y prevención para Ciénaga, Magdalena durante la temporada de lluvias.\n\nPuedes preguntarme sobre el estado de las vías, qué ruta tomar para llegar al centro desde tu barrio o qué calles evitar por inundaciones y alcantarillas destapadas.',
      timestamp: 'Ahora mismo',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const QUICK_PROMPTS = [
    '¿Qué ruta puedo tomar para llegar al centro desde Kennedy?',
    '¿Cómo está la Calle 13 en Barrio Abajo?',
    '¿Dónde hay alcantarillas destapadas reportadas hoy?',
    '¿Qué vías seguras y transitables hay en Ciénaga ahora?',
    '¿Puedo ir desde Miramar hasta La Floresta sin peligro?'
  ];

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, matchedBarrio } = processAIQuery(userText, reports);
      const aiMsg: ChatMessage = {
        id: `ia-${Date.now()}`,
        sender: 'ia',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        matchedBarrio,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-130px)] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-[#0a192f] via-[#0f2d4e] to-sky-800 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center shadow-lg text-white">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a192f]" />
          </div>
          <div>
            <h3 className="font-extrabold text-base flex items-center">
              Rutas Seguras IA
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/30 text-sky-200 border border-sky-400/30 uppercase">
                Ciénaga Magdalena
              </span>
            </h3>
            <p className="text-xs text-sky-200/80">
              Asistente con análisis de incidentes en tiempo real
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-xs text-emerald-300 font-semibold flex items-center justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
            Base activa
          </span>
          <span className="text-[11px] text-slate-300">{reports.length} reportes indexados</span>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start space-x-2.5 max-w-[85%]">
              {msg.sender === 'ia' && (
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line space-y-2">
                  {msg.text.split('\n').map((paragraph, idx) => {
                    if (!paragraph) return <div key={idx} className="h-1" />;
                    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={idx}>
                        {parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>

                {msg.matchedBarrio && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => onNavigateToMap(msg.matchedBarrio || undefined)}
                      className="bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 mr-1.5" />
                      Ver reportes de {msg.matchedBarrio} en el mapa
                    </button>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-2 text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
            <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-slate-500 dark:text-slate-400 ml-1 text-xs">Consultando reportes en Ciénaga...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Sugerencias Rápidas */}
      <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
        <span className="text-slate-400 font-semibold text-[11px] flex items-center shrink-0">
          <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-500" />
          Consultar:
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInputQuery(prompt)}
            className="bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-xs transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSendMessage} className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ej: ¿Qué ruta puedo tomar para llegar al centro desde mi barrio?"
          className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-3 rounded-2xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white p-3 rounded-2xl shadow-md transition-all active:scale-95 shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

