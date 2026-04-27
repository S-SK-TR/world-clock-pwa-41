import { useState } from 'react';
import { Timezone } from '../../shared/types/timezone';

interface TimezoneSelectorProps {
  onAddTimezone: (timezone: Timezone) => void;
}

export const TimezoneSelector = ({ onAddTimezone }: TimezoneSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const timezones: Timezone[] = [
    { id: 'turkey', name: 'Türkiye', offset: 3, city: 'İstanbul' },
    { id: 'newyork', name: 'New York', offset: -5, city: 'New York' },
    { id: 'london', name: 'Londra', offset: 0, city: 'Londra' },
    { id: 'tokyo', name: 'Tokyo', offset: 9, city: 'Tokyo' },
    { id: 'sydney', name: 'Sydney', offset: 11, city: 'Sydney' },
    { id: 'paris', name: 'Paris', offset: 1, city: 'Paris' },
    { id: 'berlin', name: 'Berlin', offset: 1, city: 'Berlin' },
    { id: 'moscow', name: 'Moskova', offset: 3, city: 'Moskova' }
  ];

  const filteredTimezones = timezones.filter(tz =>
    tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tz.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="timezone-selector">
      <h2>Zaman Dilimi Ekle</h2>
      <input
        type="text"
        placeholder="Zaman dilimi ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="timezone-list">
        {filteredTimezones.map((timezone) => (
          <button
            key={timezone.id}
            onClick={() => onAddTimezone(timezone)}
            className="timezone-item"
          >
            {timezone.name} ({timezone.city}) - UTC{timezone.offset >= 0 ? '+' : ''}{timezone.offset}
          </button>
        ))}
      </div>
    </div>
  );
};