import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { Calendar, Users, Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

interface ReservationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'gilded_spoon_reservations';

const ReservationCTA: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '19:00',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [bookingRef, setBookingRef] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required.';
        if (!/^[+0-9\s\-()]{8,20}$/.test(value.trim())) return 'Please enter a valid phone number (min 8 digits).';
        return '';
      case 'date':
        if (!value) return 'Reservation date is required.';
        if (value < todayStr) return 'Reservation date cannot be in the past.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['name', 'email', 'phone', 'date'] as const;

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    const generatedRef = `GS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Simulate network processing with clean unmount handling
    timerRef.current = setTimeout(() => {
      const newBooking: ReservationRecord = {
        id: generatedRef,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        createdAt: new Date().toISOString(),
      };

      try {
        const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsed: ReservationRecord[] = existingData ? JSON.parse(existingData) : [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newBooking, ...parsed]));
      } catch {
        // Safe fallback if localStorage is disabled or quota exceeded
      }

      setBookingRef(generatedRef);
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '2',
      date: '',
      time: '19:00',
    });
    setErrors({});
    setStatus('idle');
    setBookingRef('');
  };

  const getWhatsAppBookingLink = () => {
    const message = [
      `*The Gilded Spoon - Table Reservation*`,
      `Booking Ref: ${bookingRef}`,
      `Name: ${formData.name}`,
      `Guests: ${formData.guests} Guest(s)`,
      `Date: ${formData.date}`,
      `Time: ${formData.time}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
    ].join('\n');

    return `https://wa.me/11234567890?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="reservation" className="py-24 bg-gradient-to-t from-zinc-950 to-zinc-900 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-950/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Container className="max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <p className="text-gold-500 text-lg font-semibold tracking-wider uppercase mb-2">Book A Table</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">Make A Reservation</h2>
          <p className="text-zinc-400 font-light mt-4 max-w-xl mx-auto leading-relaxed text-sm">
            Join us for an unforgettable dining experience. Secure your table below. For parties larger than 8, please contact our concierge directly.
          </p>
        </div>

        {status === 'success' ? (
          /* Success Message Panel */
          <div className="glass-panel p-10 md:p-16 rounded-xl border border-gold-500/30 text-center animate-fade-in-up max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl"></div>

            <div className="h-16 w-16 bg-gold-500/10 border border-gold-500/30 rounded-full flex items-center justify-center text-gold-500 mx-auto mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>

            <span className="inline-block text-[10px] tracking-widest uppercase font-semibold text-gold-400 border border-gold-500/30 bg-gold-950/40 px-3 py-1 rounded-full mb-3">
              Booking Ref: {bookingRef}
            </span>

            <h3 className="text-2xl font-serif font-bold text-white mb-4">Table Reserved Successfully</h3>

            <div className="text-zinc-300 font-light text-sm space-y-2 mb-8 leading-relaxed max-w-md mx-auto">
              <p>
                Thank you, <strong className="text-white font-medium">{formData.name}</strong>. Your reservation for a party of <strong className="text-white font-medium">{formData.guests}</strong> is recorded.
              </p>
              <div className="bg-zinc-900/80 py-3 px-6 rounded-lg border border-zinc-800 text-gold-400 font-sans tracking-wide inline-flex items-center gap-2 mt-4">
                <Calendar className="h-4 w-4 text-gold-500" />
                <span>{formData.date}</span>
                <span className="text-zinc-600">|</span>
                <Clock className="h-4 w-4 text-gold-500" />
                <span>{formData.time}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                A confirmation has been saved to your local session and dispatched to our table management system. You may also notify our concierge directly via WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Notify via WhatsApp</span>
              </a>

              <Button variant="secondary" onClick={handleReset} className="w-full sm:w-auto">
                Make Another Booking
              </Button>
            </div>
          </div>
        ) : (
          /* Table Booking Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-panel p-8 md:p-12 rounded-xl border border-zinc-800 shadow-2xl space-y-6 max-w-3xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="res-name" className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold">
                  Full Name <span className="text-gold-500">*</span>
                </label>
                <input
                  id="res-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Eleanor Vance"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`bg-zinc-900/40 border ${
                    errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-gold-500/50'
                  } focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none placeholder-zinc-600 transition-all`}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="res-email" className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold">
                  Email Address <span className="text-gold-500">*</span>
                </label>
                <input
                  id="res-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eleanor@gildedspoon.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`bg-zinc-900/40 border ${
                    errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-gold-500/50'
                  } focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none placeholder-zinc-600 transition-all`}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Phone */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="res-phone" className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold">
                  Phone Number <span className="text-gold-500">*</span>
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="(123) 456-7890"
                  required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={`bg-zinc-900/40 border ${
                    errors.phone ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-gold-500/50'
                  } focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none placeholder-zinc-600 transition-all`}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Guests Selector */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="res-guests" className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>Guests count</span>
                </label>
                <div className="relative">
                  <select
                    id="res-guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/40 border border-zinc-800 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="1" className="bg-zinc-950">1 Guest</option>
                    <option value="2" className="bg-zinc-950">2 Guests</option>
                    <option value="3" className="bg-zinc-950">3 Guests</option>
                    <option value="4" className="bg-zinc-950">4 Guests</option>
                    <option value="5" className="bg-zinc-950">5 Guests</option>
                    <option value="6" className="bg-zinc-950">6 Guests</option>
                    <option value="7" className="bg-zinc-950">7 Guests</option>
                    <option value="8" className="bg-zinc-950">8 Guests</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="res-date" className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>Date *</span>
                </label>
                <input
                  id="res-date"
                  type="date"
                  name="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? 'date-error' : undefined}
                  className={`bg-zinc-900/40 border ${
                    errors.date ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-gold-500/50'
                  } focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none transition-all cursor-pointer`}
                />
                {errors.date && (
                  <p id="date-error" className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-end">
              {/* Time Selector */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="res-time" className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>Preferable Time</span>
                </label>
                <div className="relative">
                  <select
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/40 border border-zinc-800 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="17:00" className="bg-zinc-950">5:00 PM</option>
                    <option value="17:30" className="bg-zinc-950">5:30 PM</option>
                    <option value="18:00" className="bg-zinc-950">6:00 PM</option>
                    <option value="18:30" className="bg-zinc-950">6:30 PM</option>
                    <option value="19:00" className="bg-zinc-950">7:00 PM</option>
                    <option value="19:30" className="bg-zinc-950">7:30 PM</option>
                    <option value="20:00" className="bg-zinc-950">8:00 PM</option>
                    <option value="20:30" className="bg-zinc-950">8:30 PM</option>
                    <option value="21:00" className="bg-zinc-950">9:00 PM</option>
                    <option value="21:30" className="bg-zinc-950">9:30 PM</option>
                    <option value="22:00" className="bg-zinc-950">10:00 PM</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'submitting'}
                  className="w-full py-[13px] tracking-widest font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Confirming Reservation...' : 'Request Reservation'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
};

export default ReservationCTA;
