import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-borderglass bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link className="text-lg font-semibold" to="/">CopyPrompts.ai</Link>
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/admin-uploader">Admin</NavLink>
          <ThemeToggle />
          {user ? (
            <button type="button" onClick={() => void logout()}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};
