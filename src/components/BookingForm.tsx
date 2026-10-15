import React, { useState } from 'react';
import { servicesData, teamData } from '../content/data/barberData';
import { Calendar, CheckCircle2, User, Phone, Mail, Scissors, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  notes: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: 'grooming-completo',
    barberId: 'cualquiera',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '11:30',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const timeSlots = [
    '10:00', '11:00', '12:00', '13:30', '15:00', '16:30', '17:30', '19:00'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (slot: string) => {
    setFormData((prev) => ({ ...prev, timeSlot: slot }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedCode = 'BRB-' + Math.floor(1000 + Math.random() * 9000);
      setBookingCode(generatedCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setBookingCode('');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceId: 'grooming-completo',
      barberId: 'cualquiera',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '11:30',
      notes: '',
    });
  };

  const selectedService = servicesData.find((s) => s.id === formData.serviceId) || servicesData[0];
  const selectedBarber = teamData.find((b) => b.id === formData.barberId);

  const whatsappBookingMsg = encodeURIComponent(
    `¡Hola BARBER Studio! Acabo de registrar mi cita en la web:\n` +
    `Código: ${bookingCode}\n` +
    `Nombre: ${formData.fullName}\n` +
    `Servicio: ${selectedService.name} ($${selectedService.price} USD)\n` +
    `Barbero: ${selectedBarber ? selectedBarber.name : 'Primer barbero disponible'}\n` +
    `Fecha: ${formData.date} a las ${formData.timeSlot} hrs\n` +
    `¿Podrían confirmarme el espacio? Muchas gracias.`
  );

  return (
    <div className="w-full bg-tertiary border border-quaternary p-6 sm:p-9 shadow-xl relative overflow-hidden">
      {/* Sutil acento superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent/20 via-accent to-accent/20"></div>

      {isSuccess ? (
        // Pantalla de Confirmación de Reserva Exitosa
        <div className="text-center py-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-dark border border-accent/40 text-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/10">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>

          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent uppercase block mb-1">
            // Cita Registrada Exitosamente
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-light tracking-tight uppercase">
            Te Esperamos en el Studio
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-light/70 max-w-md mx-auto font-light">
            Hemos reservado tu butaca. Recibirás un recordatorio por WhatsApp antes de tu horario pactado.
          </p>

          {/* Tarjeta Recibo de la Cita Geométrica */}
          <div className="mt-6 p-5 bg-dark border border-quaternary text-left max-w-md mx-auto space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-quaternary/80 pb-2">
              <span className="text-light/50">Código de Reserva:</span>
              <span className="text-accent font-bold text-sm tracking-wider">{bookingCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-light/50">Titular:</span>
              <span className="text-light font-sans font-medium">{formData.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-light/50">Servicio:</span>
              <span className="text-light font-sans font-medium">{selectedService.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-light/50">Especialista:</span>
              <span className="text-light font-sans font-medium">
                {selectedBarber ? selectedBarber.name : 'Primer disponible'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-quaternary/80 pt-2">
              <span className="text-light/50">Fecha y Hora:</span>
              <span className="text-accent font-bold">
                {formData.date} • {formData.timeSlot} hrs
              </span>
            </div>
          </div>

          {/* Botones de Acción Post-Reserva */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href={`https://wa.me/525549203311?text=${whatsappBookingMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-widest bg-accent text-dark hover:bg-accent-dark transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirmar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-bold uppercase tracking-widest bg-dark border border-quaternary text-light hover:text-accent hover:border-accent transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nueva Reserva</span>
            </button>
          </div>
        </div>
      ) : (
        // Formulario Interactivo Geométrico
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-light tracking-tight uppercase">
                Reserva Tu Experiencia
              </h3>
            </div>
            <span className="text-[10px] font-mono text-light/50 bg-dark px-2.5 py-1 border border-quaternary">
              PASO 1 / 1
            </span>
          </div>

          {/* Nombre Completo */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
              Nombre Completo *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light/40">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ej. Roberto Morales"
                className="w-full pl-10 pr-4 py-3 bg-dark border border-quaternary text-sm text-light placeholder-light/30 focus:outline-none focus:border-accent focus:ring-0 transition-colors"
              />
            </div>
          </div>

          {/* Teléfono y Correo en 2 Columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
                Teléfono / WhatsApp *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light/40">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                  className="w-full pl-10 pr-4 py-3 bg-dark border border-quaternary text-sm text-light placeholder-light/30 focus:outline-none focus:border-accent focus:ring-0 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nombre@ejemplo.com"
                  className="w-full pl-10 pr-4 py-3 bg-dark border border-quaternary text-sm text-light placeholder-light/30 focus:outline-none focus:border-accent focus:ring-0 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Servicio y Barbero en 2 Columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="serviceId" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
                Servicio Deseado *
              </label>
              <div className="relative">
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark border border-quaternary text-sm text-light focus:outline-none focus:border-accent focus:ring-0 transition-colors cursor-pointer appearance-none"
                >
                  {servicesData.map((service) => (
                    <option key={service.id} value={service.id} className="bg-dark text-light">
                      {service.name} (${service.price} USD)
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-light/40">
                  <Scissors className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="barberId" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
                Preferencia de Barbero
              </label>
              <div className="relative">
                <select
                  id="barberId"
                  name="barberId"
                  value={formData.barberId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark border border-quaternary text-sm text-light focus:outline-none focus:border-accent focus:ring-0 transition-colors cursor-pointer appearance-none"
                >
                  <option value="cualquiera" className="bg-dark text-light">
                    Primer barbero disponible
                  </option>
                  {teamData.map((barber) => (
                    <option key={barber.id} value={barber.id} className="bg-dark text-light">
                      {barber.name} ({barber.role})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-light/40">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Selección de Fecha y Franja Horaria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
                Fecha Preferida *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light/40">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-dark border border-quaternary text-sm text-light focus:outline-none focus:border-accent focus:ring-0 transition-colors cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
                Horario ({formData.timeSlot} hrs)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleTimeSelect(slot)}
                    className={`py-2 px-1 text-center text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${formData.timeSlot === slot
                      ? 'bg-accent text-dark font-bold'
                      : 'bg-dark border border-quaternary text-light/70 hover:text-light hover:border-accent'
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mensaje Opcional */}
          <div>
            <label htmlFor="notes" className="block text-xs font-mono font-bold uppercase tracking-wider text-light/80 mb-2">
              Instrucciones Especiales o Notas (Opcional)
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-light/40">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="¿Tienes alguna preferencia en tu corte o requerimiento?"
                className="w-full pl-10 pr-4 py-3 bg-dark border border-quaternary text-sm text-light placeholder-light/30 focus:outline-none focus:border-accent focus:ring-0 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* Botón de Envío Interactivo Geométrico */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 font-bold uppercase tracking-widest text-xs bg-accent text-dark hover:bg-accent-dark transition-all duration-200 shadow-xl shadow-accent/15 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-dark" />
                  <span>Procesando Reserva...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirmar &amp; Bloquear Mi Horario</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-light/50 mt-3 font-mono">
              🔒 Sin cobros anticipados. Cancelación gratuita hasta 2 horas antes de tu sesión.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
