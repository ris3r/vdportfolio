import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import DiscordPromoModal from './components/DiscordPromoModal';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Compliance = lazy(() => import('./pages/Compliance'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Fallback
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col bg-black">
                    <Navbar />
                    <DiscordPromoModal />
                    <main className="flex-1">
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/compliance" element={<Compliance />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <ErrorBoundary>
                                            <Dashboard />
                                        </ErrorBoundary>
                                    </ProtectedRoute>
                                } />
                                <Route path="/settings" element={
                                    <ProtectedRoute>
                                        <Settings />
                                    </ProtectedRoute>
                                } />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
