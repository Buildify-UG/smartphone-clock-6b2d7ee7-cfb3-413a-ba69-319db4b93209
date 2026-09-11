import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Index = () => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time
      const hours = is24Hour 
        ? String(now.getHours()).padStart(2, '0')
        : String(now.getHours() % 12 || 12).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = !is24Hour ? (now.getHours() >= 12 ? 'PM' : 'AM') : '';
      
      setTime(`${hours}:${minutes}:${seconds}${ampm ? ' ' + ampm : ''}`);
      
      // Format date
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setDate(dateFormatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Main Clock Container */}
      <div className="w-full max-w-sm">
        {/* Clock Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-700">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="w-6 h-6 text-blue-400" />
            <h1 className="text-lg font-semibold text-slate-300">Digital Clock</h1>
          </div>

          {/* Time Display */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 shadow-lg">
              <div className="font-mono text-7xl font-bold text-white tracking-wider drop-shadow-lg">
                {time || '00:00:00'}
              </div>
            </div>
          </div>

          {/* Date Display */}
          <div className="text-center mb-8">
            <p className="text-slate-400 text-sm font-medium mb-2">TODAY</p>
            <p className="text-slate-200 text-lg font-semibold">
              {date}
            </p>
          </div>

          {/* Format Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setIs24Hour(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                !is24Hour
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              12 Hour
            </button>
            <button
              onClick={() => setIs24Hour(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                is24Hour
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              24 Hour
            </button>
          </div>

          {/* Info Footer */}
          <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-700">
            <p>Updates every second</p>
          </div>
        </div>

        {/* Analog Clock Preview */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm font-medium text-center mb-4">Quick Stats</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded-lg p-3 text-center">
              <p className="text-slate-500 text-xs mb-1">Seconds</p>
              <p className="text-cyan-400 font-mono text-lg font-bold">
                {time ? time.split(':')[2].slice(0, 2) : '00'}
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 text-center">
              <p className="text-slate-500 text-xs mb-1">Minutes</p>
              <p className="text-cyan-400 font-mono text-lg font-bold">
                {time ? time.split(':')[1] : '00'}
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 text-center">
              <p className="text-slate-500 text-xs mb-1">Hours</p>
              <p className="text-cyan-400 font-mono text-lg font-bold">
                {time ? time.split(':')[0] : '00'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
