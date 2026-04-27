interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ darkMode, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      aria-label={darkMode ? 'Açık modu etkinleştir' : 'Koyu modu etkinleştir'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};