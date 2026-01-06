import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '60px 0 20px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>

                    {/* Brand Info */}
                    <div>
                        <div style={{ marginBottom: '5px' }}>
                            <img src="/brand_logo.png" alt="VD Logo" style={{ height: '120px', width: 'auto' }} />
                        </div>
                        <h3 style={{ color: 'var(--color-gold)', fontSize: '1.5rem', marginBottom: '5px' }}>VINITH D'COSTA & ASSOCIATES</h3>
                        <p style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '20px' }}>Your Key To Success</p>
                        <p style={{ color: '#aaa', marginBottom: '20px', lineHeight: '1.8' }}>
                            SEBI-registered Stock Market Research & Analysis firm delivering transparent, data-driven market intelligence.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <a href="https://www.facebook.com/profile.php?id=61562042187078" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors"><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/vinith.dcosta/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors"><Instagram size={20} /></a>
                            <a href="https://www.youtube.com/@VinithDcosta" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors"><Youtube size={20} /></a>
                            <a href="https://in.linkedin.com/company/vd-associates-trading-firm" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors"><Linkedin size={20} /></a>
                            <a href="https://x.com/vinithdcosta" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px' }}>Quick Links</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link to="/" className="text-muted hover:text-gold transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-muted hover:text-gold transition-colors">About Founder</Link></li>
                            <li><Link to="/services" className="text-muted hover:text-gold transition-colors">Services & Mentorship</Link></li>
                            <li><Link to="/compliance" className="text-muted hover:text-gold transition-colors">Compliance Documents</Link></li>
                            <li><Link to="/contact" className="text-muted hover:text-gold transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px' }}>Contact Us</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li>
                                <a href="mailto:Vinith.oscar@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa', textDecoration: 'none', transition: 'color 0.3s' }} className="hover:text-gold">
                                    <Mail size={18} color="var(--color-gold)" />
                                    <span>Vinith.oscar@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+916363015791" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa', textDecoration: 'none', transition: 'color 0.3s' }} className="hover:text-gold">
                                    <Phone size={18} color="var(--color-gold)" />
                                    <span>+91 63630 15791</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.google.com/search?q=Vinith+Dcosta+%26+Associates+Trading+Academy+reviews&sei=Yt9cabWaNZi-5OUP_MKpgAE" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#aaa', textDecoration: 'none', transition: 'color 0.3s' }} className="hover:text-gold">
                                    <MapPin size={18} color="var(--color-gold)" />
                                    <span>Karnataka, India</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} Vinith D'costa & Associates. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
