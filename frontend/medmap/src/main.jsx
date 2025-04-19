import React from 'react';
import { ThemeProvider } from 'next-themes'
import ReactDOM from 'react-dom/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
