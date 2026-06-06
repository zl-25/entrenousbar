import React, { useState } from 'react';
import { validateForm, reservationSchema } from '../../utils/validationSchemas';

const TIME_OPTIONS = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const PERSON_OPTIONS = [2, 4, 6, '8+'];

const ReservationForm = ({ 
  onSubmit, 
  isLoading = false,
  personCount,
  onPersonCountChange,
  selectedTime,
  onTimeChange,
  selectedSpace,
  selectedDate
}) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    address: '', 
    newsletters: false 
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const { isValid, errors: validationErrors } = validateForm(reservationSchema, formData);
    
    if (!isValid || !selectedDate || !selectedSpace) {
      const newErrors = { ...validationErrors };
      if (!selectedDate) newErrors.date = 'Veuillez sélectionner une date';
      if (!selectedSpace) newErrors.space = 'Veuillez sélectionner un espace';
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, date: true, space: true });
      return;
    }

    setErrors({});
    onSubmit({
      ...formData,
      personCount,
      time: selectedTime,
      selectedSpace,
      selectedDate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Person Count */}
      <div>
        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">Nombre de personnes</p>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {PERSON_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onPersonCountChange(opt)}
              className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 ${
                personCount === opt
                  ? 'border-green-600 bg-green-600/20 text-green-400 shadow-[0_0_15px_rgba(21,128,61,0.2)]'
                  : 'border-white/15 bg-white/5 text-white hover:border-green-500/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">Heure de réservation</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {TIME_OPTIONS.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onTimeChange(time)}
              className={`py-3 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedTime === time
                  ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'border-white/15 bg-white/5 text-white hover:border-yellow-500/50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5 pt-4">
        <div>
          <label htmlFor="reservation-name" className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
            Nom Complet <span className="text-red-500">*</span>
          </label>
          <input 
            id="reservation-name"
            type="text" 
            name="name"
            placeholder="Ex: Jean Dupont" 
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white transition-all focus:outline-none ${
              touched.name && errors.name
                ? 'border-red-500 focus:bg-red-600/5'
                : 'border-white/10 focus:border-green-600 focus:bg-green-600/5'
            }`}
          />
          {touched.name && errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reservation-phone" className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input 
              id="reservation-phone"
              type="tel" 
              name="phone"
              placeholder="Ex: +241 62 12 34 56" 
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white transition-all focus:outline-none ${
                touched.phone && errors.phone
                  ? 'border-red-500 focus:bg-red-600/5'
                  : 'border-white/10 focus:border-green-600 focus:bg-green-600/5'
              }`}
            />
            {touched.phone && errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="reservation-email" className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              id="reservation-email"
              type="email" 
              name="email"
              placeholder="votre@email.com" 
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white transition-all focus:outline-none ${
                touched.email && errors.email
                  ? 'border-red-500 focus:bg-red-600/5'
                  : 'border-white/10 focus:border-green-600 focus:bg-green-600/5'
              }`}
            />
            {touched.email && errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="reservation-address" className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Adresse (Facultatif)</label>
          <textarea 
            id="reservation-address"
            name="address"
            placeholder="Votre adresse de résidence" 
            rows="3" 
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 focus:border-green-600 focus:bg-green-600/5 focus:outline-none rounded-xl text-sm text-white resize-none transition-all"
          ></textarea>
        </div>

        <div className="flex items-start gap-3">
          <input 
            type="checkbox" 
            name="newsletters"
            id="newsletters" 
            checked={formData.newsletters}
            onChange={handleChange}
            className="w-5 h-5 bg-black/40 border-white/10 rounded accent-green-600 cursor-pointer mt-1"
          />
          <label htmlFor="newsletters" className="text-xs text-gray-400 cursor-pointer leading-relaxed">
            J'accepte de recevoir les actualités et offres exclusives de Entre Nous Bar par email.
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading || !selectedDate || !selectedSpace}
        className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? 'Traitement en cours...' : 'Confirmer la réservation'}
      </button>
    </form>
  );
};

export default ReservationForm;
