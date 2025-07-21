import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';


// The URL is now read from the .env file
const URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [token, setToken] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  // On initial load, check if a token exists in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      {token ? (
        <Dashboard url={URL} token={token} onLogout={handleLogout} />
      ) : (
        <LoginScreen url={URL} setToken={setToken} />
      )}
    </>
  );
}