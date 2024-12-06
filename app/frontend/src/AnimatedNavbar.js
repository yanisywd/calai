import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard, LogOut } from 'lucide-react';

const AnimatedNavbar = ({ onHomeClick, onDashboardClick, onLogoutClick, username }) => {
  const [activeButton, setActiveButton] = useState(null);

  const navButtonVariants = {
    initial: { 
      scale: 1, 
      backgroundColor: 'rgba(255,255,255,0)',
      color: 'var(--text-light)'
    },
    hover: { 
      scale: 1.1, 
      backgroundColor: 'rgba(50, 255, 126, 0.2)', // Fluorescent green background
      color: 'var(--primary-green)', 
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const navButtons = [
    { 
      icon: <Home className="mr-2" />, 
      text: 'Home', 
      onClick: () => {
        onHomeClick();
        setActiveButton('home');
      }
    },
    { 
      icon: <LayoutDashboard className="mr-2" />, 
      text: 'Dashboard', 
      onClick: () => {
        onDashboardClick();
        setActiveButton('dashboard');
      }
    },
    { 
      icon: <LogOut className="mr-2" />, 
      text: 'Logout', 
      onClick: () => {
        onLogoutClick();
        setActiveButton('logout');
      }
    }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="nav-buttons">
          {navButtons.map((button) => (
            <motion.button
              key={button.text}
              onClick={button.onClick}
              variants={navButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`nav-button ${activeButton === button.text.toLowerCase() ? 'active' : ''}`}
            >
              {button.icon}
              {button.text}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AnimatedNavbar;
