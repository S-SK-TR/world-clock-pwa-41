import { useState, useEffect } from 'react';
import { ClockGrid } from './features/clockGrid/ClockGrid';
import { TimezoneSelector } from './features/timezoneSelector/TimezoneSelector';
import { ThemeToggle } from './features/themeToggle/ThemeToggle';
import { useLocalStorage } from './shared/hooks/useLocalStorage';
import { Timezone } from './shared/types/timezone';

function App() {
  const [selectedTimezones, setSelectedTimezones] = useLocalStorage<Timezone[]>('selectedTimezones', [
    { id: 'turkey', name: 'Türkiye', offset: 3, city: 'İstanbul' },
    { id: 'newyork', name: 'New York', offset: -5, city: 'New York' },
    { id: 'london', name: 'Londra', offset: 0, city: 'Londra' }
  ]);

  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTimezone = (timezone: Timezone) => {
    setSelectedTimezones([...selectedTimezones, timezone]);
  };

  const handleRemoveTimezone = (id: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== id));
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <h1>Dünya Saatleri</h1>
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      </header>
      <main>
        <ClockGrid timezones={selectedTimezones} onRemoveTimezone={handleRemoveTimezone} />
        <TimezoneSelector onAddTimezone={handleAddTimezone} />
      </main>
    </div>
  );
}

export default App;