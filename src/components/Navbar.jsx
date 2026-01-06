import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      });
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10 shadow-xl'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="container flex justify-between items-center bg-transparent relative z-[60]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/brand_logo.png" alt="VD Logo" className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-gold tracking-tight leading-none">VINITH D'COSTA</span>
              <span className="text-[0.65rem] md:text-xs text-white tracking-[0.2em] font-medium leading-none">& ASSOCIATES</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-widest hover:text-gold transition-colors duration-200 relative group ${location.pathname === link.path ? 'text-gold' : 'text-gray-300'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 border border-gold/50 text-gold hover:bg-gold/10 px-4 py-2 rounded-full transition-all duration-300"
                >
                  <User size={18} />
                  <span className="font-semibold text-sm">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-4 w-56 bg-gray-dark border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 overflow-hidden animate-fade-in origin-top-right">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/5 rounded-lg transition-colors">
                      <LayoutDashboard size={16} className="text-gold" /> Dashboard
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Settings size={16} className="text-gold" /> Settings
                    </Link>
                    <div className="h-px bg-white/10 my-1"></div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors w-full text-left">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary px-6 py-2 text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gold transition-colors z-[70] relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-black z-[45] flex flex-col justify-center items-center gap-5 md:gap-8 translate-x-full"
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-2xl md:text-3xl font-bold uppercase tracking-widest hover:text-gold transition-all duration-300 ${location.pathname === link.path ? 'text-gold scale-110' : 'text-white'
              }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {link.name}
          </Link>
        ))}

        <div className="mt-6 md:mt-8 flex flex-col items-center gap-3 w-64">
          {user ? (
            <>
              <div className="text-gold text-lg font-medium mb-2">Hello, {user.name}</div>
              <Link to="/dashboard" className="w-full flex items-center justify-center gap-3 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm">
                <LayoutDashboard size={18} /> <span className="uppercase tracking-wider text-xs md:text-sm font-bold">Dashboard</span>
              </Link>
              <Link to="/settings" className="w-full flex items-center justify-center gap-3 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm">
                <Settings size={18} /> <span className="uppercase tracking-wider text-xs md:text-sm font-bold">Settings</span>
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-3 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/10 transition-all duration-300 backdrop-blur-sm">
                <LogOut size={18} /> <span className="uppercase tracking-wider text-xs md:text-sm font-bold">Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary w-full text-center text-lg">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
