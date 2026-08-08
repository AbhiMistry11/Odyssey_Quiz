import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import QuizPage from './pages/QuizPage';
import CompletionPage from './pages/CompletionPage';
import NotFoundPage from './pages/NotFoundPage';
import { QuizProvider } from './context/QuizContext';
import { ToastProvider } from './components/ToastProvider';

export default function App() {
  return (
    <QuizProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/complete" element={<CompletionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QuizProvider>
  );
}
