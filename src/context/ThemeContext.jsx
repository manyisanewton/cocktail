import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [customTheme, setCustomTheme] = useState('default');

  const themes = {
    default: { bg: '#C5E6F4', cardBg: '#ffffff', text: '#1C2526', accent: '#3E7CB1', navbar: '#1C2526' },
    dark: { bg: '#2E4756', cardBg: '#1C2526', text: '#C5E6F4', accent: '#3E7CB1', navbar: '#1C2526' },
    vibrant: { bg: '#FF6F61', cardBg: '#FFD1DC', text: '#2E4057', accent: '#58D68D', navbar: '#2E4057' },
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const selectedTheme = themes[customTheme] || themes.default;
    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
    localStorage.setItem('theme', theme);
    localStorage.setItem('customTheme', customTheme);
  }, [theme, customTheme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeCustomTheme = (themeName) => {
    setCustomTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, customTheme, changeCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}