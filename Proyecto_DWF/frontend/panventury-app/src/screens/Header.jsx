import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <h2 style={styles.title}>Inicio</h2>
      <button onClick={handleLogout} style={styles.button}>Cerrar Sesión</button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  title: {
    margin: 0,
    fontWeight: 'bold'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Header;