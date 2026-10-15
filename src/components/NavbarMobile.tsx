import React, { useState, useEffect } from 'react';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarMobileProps {
  links: NavLink[];
}

export default function NavbarMobile({ links }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll de la página y escuchar tecla Escape al estar abierto
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Botón de menu hamburguesa */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-11 h-11 bg-tertiary border border-quaternary flex items-center justify-center text-light hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer focus:outline-none"
        aria-label="Abrir menú de navegación"
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {/* Overlay de Pantalla Completa*/}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex flex-col bg-dark/98 backdrop-blur-2xl text-light h-screen "
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Barra Superior del Men */}
          <div className="h-20 px-6 sm:px-8 border-b border-quaternary flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-heading font-black tracking-[0.25em] text-light uppercase text-xl">
                Barber
              </span>
              <span className="font-bold text-accent uppercase text-[9px] tracking-[0.3em] border-l border-quaternary pl-3">
                Studio
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-11 h-11 bg-tertiary border border-quaternary flex items-center justify-center text-light hover:text-accent hover:border-accent transition-colors cursor-pointer"
              aria-label="Cerrar menú"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lista de Enlaces de Navegación */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 flex flex-col justify-between">
            <nav className="flex flex-col space-y-2">
              <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase mb-3 block font-mono">
                // Navegación Studio
              </span>
              {links.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className="group flex items-center justify-between py-3.5 border-b border-quaternary/40 hover:border-accent transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-accent/60 group-hover:text-accent">
                      0{idx + 1}
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-light group-hover:text-accent transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <span className="text-accent text-lg transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </nav>

            {/* CTA Móvil & Datos Rápidos */}
            <div className="pt-8 space-y-4">
              <a
                href="#contacto"
                onClick={handleClose}
                className="w-full flex items-center justify-center py-4 px-6 font-bold uppercase tracking-widest text-xs bg-accent text-dark hover:bg-accent-dark transition-colors shadow-lg"
              >
                Reservar Cita Ahora
              </a>

              <div className="p-4 bg-tertiary border border-quaternary text-center">
                <p className="text-xs text-light/60">Polanco, Ciudad de México</p>
                <a
                  href="tel:+525584321980"
                  className="text-xs font-mono font-bold text-accent hover:underline block mt-1"
                >
                  (55) 8432-1980
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
