import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Styles from './pages/Styles';
import Atoms from './pages/Atoms';
import Molecules from './pages/Molecules';
import Organisms from './pages/Organisms';
import Design from './pages/Design';
import DesignTeam from './pages/DesignTeam';
import DesignTeamCampaigns from './pages/DesignTeamCampaigns';
import DesignCampaign from './pages/DesignCampaign';
import DesignEmployee from './pages/DesignEmployee';
import DesignCandidate from './pages/DesignCandidate';
import DesignNegotiate from './pages/DesignNegotiate';
import DesignCampaignAdd from './pages/DesignCampaignAdd';
import DesignCampaignWizard from './pages/DesignCampaignWizard';
import DesignTemplates from './pages/DesignTemplates';
import DesignAutomation from './pages/DesignAutomation';
import SiteMap from './pages/SiteMap';

function navLink({ isActive }: { isActive: boolean }) {
  return [
    'px-s h-10 inline-flex items-center border-b-2 transition-colors no-underline font-grotesk text-grotesk',
    isActive
      ? 'text-yellow border-yellow font-semibold'
      : 'text-secondary border-transparent hover:text-on-color',
  ].join(' ');
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

const pageTransition = { duration: 0.2, ease: 'easeInOut' };

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/"                 element={<Home />} />
          <Route path="/styles"           element={<Styles />} />
          <Route path="/atoms"            element={<Atoms />} />
          <Route path="/molecules"        element={<Molecules />} />
          <Route path="/organisms"        element={<Organisms />} />
          <Route path="/design"           element={<Design />} />
          <Route path="/design/team"           element={<DesignTeam />} />
          <Route path="/design/team/campaigns" element={<DesignTeamCampaigns />} />
          <Route path="/design/campaign"       element={<DesignCampaign />} />
          <Route path="/design/employee"       element={<DesignEmployee />} />
          <Route path="/design/candidate"      element={<DesignCandidate />} />
          <Route path="/design/negotiate"        element={<DesignNegotiate />} />
          <Route path="/design/campaign/add"    element={<DesignCampaignAdd />} />
          <Route path="/design/campaign/wizard" element={<DesignCampaignWizard />} />
          <Route path="/design/templates"       element={<DesignTemplates />} />
          <Route path="/design/automation"      element={<DesignAutomation />} />
          <Route path="/sitemap"                element={<SiteMap />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="fixed top-0 left-0 right-0 h-10 flex items-center bg-black px-l z-[100]">
        <NavLink to="/"          className={navLink}>Home</NavLink>
        <NavLink to="/styles"    className={navLink}>Styles</NavLink>
        <NavLink to="/atoms"     className={navLink}>Atoms</NavLink>
        <NavLink to="/molecules" className={navLink}>Molecules</NavLink>
        <NavLink to="/organisms" className={navLink}>Organisms</NavLink>
        <NavLink to="/design"    className={navLink}>Design</NavLink>
        <NavLink to="/sitemap"   className={navLink}>Site Map</NavLink>
      </nav>
      <ScrollToTop />
      <div className="pt-10">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
