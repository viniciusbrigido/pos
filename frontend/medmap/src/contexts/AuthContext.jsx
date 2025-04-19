import {createContext, useContext, useEffect, useState} from 'react';
import {
    login as loginService,
    logout as logoutService,
    validateToken as validateTokenService
} from '../services/authService';
import LoadingSpinner from "../components/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [firstAccess, setFirstAccess] = useState(false);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setIsLoading(false);
        return;
    }
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      const response = await validateTokenService();
      if (response?.data?.success) {
          setIsAuthenticated(true);
          setUserType(response.data.userType);
          setFirstAccess(response.data.firstAccess);
          setId(response.data.id);
      } else {
          setIsAuthenticated(false);
          setUserType(null);
          setFirstAccess(false);
          localStorage.removeItem('token');
      }
    } catch (error) {
        console.error('Erro ao validar token', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    } finally {
        setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginService({ email, password });

      if (response?.data?.success) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        setUserType(response.data.userType);
        setFirstAccess(response.data.firstAccess);
        setId(response.data.id);

        return {
          id: response.data.id,
          success: response.data.success,
          firstAccess: response.data.firstAccess
        };
      }
      setIsAuthenticated(false);
      setUserType(null);
      setFirstAccess(false);

      return {success: false, firstAccess: false};
    } catch (error) {
      return {success: false, firstAccess: false, response: error.response};
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Erro no logout: ', error);
    }
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserType(null);
    setFirstAccess(false);
    setId(null);
  };

  const changeFirstAccess = () => {
      setFirstAccess(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, id, firstAccess, login, logout, changeFirstAccess, isLoading }}>
        {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro do AuthProvider');
  return context;
};
