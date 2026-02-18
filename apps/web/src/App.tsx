import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const ExplorePage = lazy(() => import('./pages/ExplorePage').then((m) => ({ default: m.ExplorePage })));
const PromptDetailsPage = lazy(() => import('./pages/PromptDetailsPage').then((m) => ({ default: m.PromptDetailsPage })));
const ModelPage = lazy(() => import('./pages/ModelPage').then((m) => ({ default: m.ModelPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then((m) => ({ default: m.SignupPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })));
const AdminUploaderPage = lazy(() => import('./pages/AdminUploaderPage').then((m) => ({ default: m.AdminUploaderPage })));

const pageMotion = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Suspense fallback={<main className="premium-section">Loading…</main>}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} {...pageMotion} transition={{ duration: 0.25, ease: 'easeOut' }}>
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/p/:promptId" element={<PromptDetailsPage />} />
              <Route path="/model/:modelSlug" element={<ModelPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/admin-uploader" element={<AdminUploaderPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </>
  );
}
