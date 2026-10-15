import React, { useState } from 'react';

/**
 * ¿Qué cosas se pueden agregar aquí (Componentes React en Astro)?
 * 
 * Componentes con interactividad en el cliente (Islas de Astro):
 * 1. Formularios con validación en tiempo real (inputs controlados, selector de opciones, envío asíncrono).
 * 2. Modales, diálogos y menús desplegables (dropdowns) con animaciones de apertura/cierre.
 * 3. Estados dinámicos locales (useState, useReducer, useEffect) para filtros de búsqueda, pestañas (tabs) o contadores.
 * 4. Carritos de compras interactivos, widgets de likes/favoritos o botones de compartir.
 * 5. Consumo de APIs en cliente con TanStack Query o fetch dentro de useEffect.
 * 
 * Uso en Astro:
 * <Greeting client:load />  -> Se hidrata de inmediato al cargar la página
 * <Greeting client:visible /> -> Se hidrata cuando el componente entra en el viewport
 */
export default function Greeting() {
  const [name, setName] = useState('');
  const [saludoIndex, setSaludoIndex] = useState(0);

  const saludos = [
    '¡Hola y bienvenido a Astro!',
    '¡Qué gusto tenerte aquí!',
    '¡Desarrollando a la velocidad de la luz!',
    '¡Arquitectura limpia y alto rendimiento!'
  ];

  const alternarSaludo = () => {
    setSaludoIndex((prev) => (prev + 1) % saludos.length);
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm text-slate-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/30">
          ⚛️
        </div>
        <div>
          <h3 className="font-semibold text-white text-base">Componente Interactivo de React</h3>
          <p className="text-xs text-slate-400">Hidratado como Isla de Astro con React 19</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <p className="text-sm text-indigo-300 font-medium">
            {saludos[saludoIndex]} {name.trim() ? <span className="text-cyan-400 font-bold">{name.trim()}</span> : null}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escribe tu nombre aquí..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="button"
            onClick={alternarSaludo}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
          >
            Cambiar Saludo
          </button>
        </div>
      </div>
    </div>
  );
}
