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

import PageWrapper from './components/PageWrapper';

// ... (existing imports)

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
                                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                                <Route path="/compliance" element={<PageWrapper><Compliance /></PageWrapper>} />
                                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <ErrorBoundary>
                                            <PageWrapper><Dashboard /></PageWrapper>
                                        </ErrorBoundary>
                                    </ProtectedRoute>
                                } />
                                <Route path="/settings" element={
                                    <ProtectedRoute>
                                        <PageWrapper><Settings /></PageWrapper>
                                    </ProtectedRoute>
                                } />
                                <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
                                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
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
