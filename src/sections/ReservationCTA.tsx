import React, { useState } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const ReservationCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '19:00',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
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
    setStatus('idle');
  };

  return (
    <section id="reservation" className="py-24 bg-gradient-to-t from-zinc-950 to-zinc-900 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-950/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Container className="max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-gold-500 text-lg font-semibold tracking-wider uppercase mb-2">Book A Table</h3>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">Make A Reservation</h2>
          <p className="text-zinc-400 font-light mt-4 max-w-xl mx-auto leading-relaxed text-sm">
            Join us for an unforgettable dining experience. Secure your table below. For parties larger than 8, please contact us directly.
          </p>
        </div>

        {status === 'success' ? (
          /* Success Message Panel */
          <div className="glass-panel p-10 md:p-16 rounded-xl border border-gold-500/30 text-center animate-fade-in-up max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl"></div>
            
            <div className="h-16 w-16 bg-gold-500/10 border border-gold-500/30 rounded-full flex items-center justify-center text-gold-500 mx-auto mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-4">Table Reserved Successfully</h3>
            
            <div className="text-zinc-300 font-light text-sm space-y-2 mb-8 leading-relaxed max-w-md mx-auto">
              <p>
                Thank you, <strong className="text-white font-medium">{formData.name}</strong>. Your reservation for a party of <strong className="text-white font-medium">{formData.guests}</strong> is confirmed.
              </p>
              <p className="bg-zinc-900/60 py-3 px-4 rounded-lg border border-zinc-800 text-gold-400 font-sans tracking-wide inline-block mt-4">
                {formData.date} at {formData.time}
              </p>
              <p className="text-xs text-zinc-500 mt-4">
                A confirmation summary and details have been sent to {formData.email}.
              </p>
            </div>

            <Button variant="secondary" onClick={handleReset}>
              Make Another Booking
            </Button>
          </div>
        ) : (
          /* Table Booking Form */
          <form 
            onSubmit={handleSubmit} 
            className="glass-panel p-8 md:p-12 rounded-xl border border-zinc-800 shadow-2xl space-y-6 max-w-3xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold">
                  Full Name <span className="text-gold-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Eleanor Vance"
                  required
                  className="bg-zinc-900/40 border border-zinc-800 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none placeholder-zinc-600 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold">
                  Email Address <span className="text-gold-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="eleanor@gildedspoon.com"
                  required
                  className="bg-zinc-900/40 border border-zinc-800 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none placeholder-zinc-600 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Phone */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold">
                  Phone Number <span className="text-gold-500">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                  className="bg-zinc-900/40 border border-zinc-800 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none placeholder-zinc-600 transition-all"
                />
              </div>

              {/* Guests Selector */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>Guests count</span>
                </label>
                <div className="relative">
                  <select 
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
                <label className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>Date *</span>
                </label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-zinc-900/40 border border-zinc-800 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 rounded-lg px-4 py-3 text-sm text-zinc-100 font-sans outline-none transition-all cursor-pointer"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-end">
              {/* Time Selector */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-sans tracking-widest text-zinc-400 uppercase font-semibold flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-gold-500" />
                  <span>Preferable Time</span>
                </label>
                <div className="relative">
                  <select 
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
                  className="w-full py-[13px] tracking-widest font-bold"
                >
                  {status === 'submitting' ? 'Confirming...' : 'Request Reservation'}
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
