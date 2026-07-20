import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import Home from './pages/Home.tsx';
import CalmNow from './pages/CalmNow.tsx';
import MusicRoom from './pages/MusicRoom.tsx';
import OurUniverse from './pages/OurUniverse.tsx';
import Depth from './pages/Depth.tsx';
import Letters from './pages/Letters.tsx';
import StayWithMe from './pages/StayWithMe.tsx';
import OfficeReset from './pages/OfficeReset.tsx';
import SmallMeals from './pages/SmallMeals.tsx';
import MixedFeelings from './pages/MixedFeelings.tsx';
import SanctuaryAuth from './pages/SanctuaryAuth.tsx';
import AuthGuard from './components/auth/AuthGuard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<SanctuaryAuth />} />
        <Route path="/stay" element={<StayWithMe />} />
        
        {/* Protected Routes */}
        <Route element={<AuthGuard />}>
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/calm" element={<CalmNow />} />
            <Route path="/music" element={<MusicRoom />} />
            <Route path="/universe" element={<OurUniverse />} />
            <Route path="/depth" element={<Depth />} />
            <Route path="/letters" element={<Letters />} />
            <Route path="/office" element={<OfficeReset />} />
            <Route path="/food" element={<SmallMeals />} />
            <Route path="/mixed-feelings" element={<MixedFeelings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
