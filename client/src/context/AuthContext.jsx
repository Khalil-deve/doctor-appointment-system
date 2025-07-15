import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle token expiry and auto-logout
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Handle token expiry and auto-logout
  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (expiry) {
      const timeLeft = parseInt(expiry) - Date.now();

      if (timeLeft > 0) {
        const timeout = setTimeout(() => {
          console.log("Auto-logout after 1 hour");
          localStorage.clear();
          setUser(null);
          //  navigate('/');
           // Or navigate to login
        }, timeLeft);

        return () => clearTimeout(timeout); // Cleanup
      } else {
        localStorage.clear();
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
