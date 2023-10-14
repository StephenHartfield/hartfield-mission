import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Donate from './routes/Donate';
import Hartevanic from './routes/Hartevanic';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import { Image } from 'react-bootstrap';
import Admin from './routes/Admin';
import News from './routes/News';


function App() {
  return (
    <div className="App">
      <Navigation />
      <div style={{height: "200px", overflow: 'hidden'}}><Image src={require('./assets/Kenya-landing.jpg')} class="img-responsive" style={{width: "100%", marginTop: "-200px"}}/></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="donate" element={<Donate />} />
        <Route path="hartevanic" element={<Hartevanic />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
