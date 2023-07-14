import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
