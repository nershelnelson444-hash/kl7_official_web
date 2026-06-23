import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetail from './pages/CarDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import LegalPage from './pages/LegalPage';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import SellYourBike from './pages/SellYourBike';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-background-main font-sans text-text-black relative">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:slug" element={<CarDetail />} />
          <Route path="/journal" element={<Blog />} />
          <Route path="/journal/:slug" element={<BlogDetail />} />
          <Route path="/legal-pages/:slug" element={<LegalPage />} />
          <Route path="/sell" element={<SellYourBike />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
