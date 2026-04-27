import { Clock } from './Clock';
import { Timezone } from '../../shared/types/timezone';

interface ClockGridProps {
  timezones: Timezone[];
  onRemoveTimezone: (id: string) => void;
}

export const ClockGrid = ({ timezones, onRemoveTimezone }: ClockGridProps) => {
  return (
    <div className="clock-grid">
      {timezones.map((timezone) => (
        <div key={timezone.id} className="clock-container">
          <Clock timezone={timezone} />
          <button
            onClick={() => onRemoveTimezone(timezone.id)}
            className="remove-clock"
            aria-label={`Kaldır ${timezone.name}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};