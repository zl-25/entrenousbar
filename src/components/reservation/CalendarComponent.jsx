import React from 'react';

const DAY_LABELS = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];
const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const CalendarComponent = ({ 
  selectedDate, 
  onSelectDate, 
  calendarMonth, 
  calendarYear, 
  onMonthChange 
}) => {
  const today = new Date();
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);
  const days = [];

  // Empty slots before the 1st
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, disabled: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(calendarYear, calendarMonth, d);
    const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    days.push({ day: d, disabled: isPast });
  }

  const canGoPrev = calendarYear > today.getFullYear() || (calendarYear === today.getFullYear() && calendarMonth > today.getMonth());

  return (
    <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-6">
      <div>
        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4 block">Date de réservation</label>
        
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => onMonthChange(-1)}
            disabled={!canGoPrev}
            className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <iconify-icon icon="lucide:chevron-left" className="text-xl"></iconify-icon>
          </button>
          <h4 className="text-sm font-bold uppercase tracking-wider">
            {MONTH_NAMES[calendarMonth]} {calendarYear}
          </h4>
          <button
            type="button"
            onClick={() => onMonthChange(1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <iconify-icon icon="lucide:chevron-right" className="text-xl"></iconify-icon>
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAY_LABELS.map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((item, idx) => (
            <button
              key={idx}
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && onSelectDate(item.day)}
              className={`aspect-square rounded-lg text-sm font-bold transition-all duration-200 ${
                item.disabled
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                  : selectedDate === item.day
                  ? 'bg-green-700 text-white shadow-[0_0_15px_rgba(21,128,61,0.3)]'
                  : 'bg-white/[0.05] text-white hover:bg-green-700/20 border border-white/10 hover:border-green-600'
              }`}
            >
              {item.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
