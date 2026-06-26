import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Styles from './pages/Styles';
import Atoms from './pages/Atoms';
import Molecules from './pages/Molecules';
import Organisms from './pages/Organisms';
import Design from './pages/Design';

function navLink({ isActive }: { isActive: boolean }) {
  return [
    'px-s h-10 inline-flex items-center border-b-2 transition-colors no-underline font-grotesk text-grotesk',
    isActive
      ? 'text-yellow border-yellow font-semibold'
      : 'text-secondary border-transparent hover:text-on-color',
  ].join(' ');
}

function Home() {
  return (
    <div className="min-h-screen bg-base px-12 pt-20 pb-12 font-antiqa text-primary">
      <h1 className="text-h1 leading-h1 font-normal mb-m">
        SUPERPUPER<br />Design System
      </h1>
      <p className="font-grotesk text-h3 leading-h3 text-secondary">
        Step 2: Styles complete — visit{' '}
        <a href="/styles" className="text-yellow no-underline">
          /styles
        </a>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="fixed top-0 left-0 right-0 h-10 flex items-center bg-black px-l z-[100]">
        <NavLink to="/"       className={navLink}>Home</NavLink>
        <NavLink to="/styles"    className={navLink}>Styles</NavLink>
        <NavLink to="/atoms"     className={navLink}>Atoms</NavLink>
        <NavLink to="/molecules"  className={navLink}>Molecules</NavLink>
        <NavLink to="/organisms"  className={navLink}>Organisms</NavLink>
        <NavLink to="/design"     className={navLink}>Design</NavLink>
      </nav>
      <div className="pt-10">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/styles"    element={<Styles />} />
          <Route path="/atoms"     element={<Atoms />} />
          <Route path="/molecules"  element={<Molecules />} />
          <Route path="/organisms"  element={<Organisms />} />
          <Route path="/design"    element={<Design />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
