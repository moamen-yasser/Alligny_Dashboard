import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from './AuthContext/AuthProvider.jsx';
import { ThemeProvider, useTheme } from './Context/ThemeContext.jsx';
import { Provider } from 'react-redux';
import { Store } from './Service/Store.jsx';
import { LanguageProvider, useLanguage } from './Context/LanguageContext.jsx';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const Root = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  return (
    <MantineProvider
      forceColorScheme={isDarkMode ? 'dark' : 'light'}
      theme={{
        fontFamily: 'Cairo, sans-serif',
      }}
    >
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Root />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
)

