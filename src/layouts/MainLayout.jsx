import { Outlet, useLocation } from 'react-router-dom';
import BackgroundField from '../components/BackgroundField';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  const { pathname } = useLocation();
  // The quiz page manages its own full-viewport layout so nothing
  // eats into the screen space teams need mid-event on a phone.
  const isQuizScreen = pathname === '/quiz';

  return (
    <div className="relative min-h-screen">
      <BackgroundField />
      {!isQuizScreen && <Navbar />}
      <Outlet />
    </div>
  );
}
