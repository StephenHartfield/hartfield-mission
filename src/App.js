import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Donate from './routes/Donate';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import { Image } from 'react-bootstrap';
import Admin from './routes/Admin';
import News from './routes/News';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { storage } from './firebase';
import Engagement from './routes/Engagement';


function App() {
  const [user, setUser] = useState();

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
      } 
    });
  } )

  const needToHidePrefix = 'gs://hartfield-mission.appspot.com/';

  return (
    <div className="App">
      <Navigation user={user} />
      <div style={{ height: "200px", overflow: 'hidden' }}><Image src={require('./assets/Kenya-landing.jpg')} className="img-responsive" style={{ width: "100%", marginTop: "-200px" }} /></div>
      <Routes>
        <Route path="/" element={<Home storage={storage} storagePath={needToHidePrefix} />} />
        <Route path="about" element={<About />} />
        <Route path="engagement" element={<Engagement />} />
        <Route path="news" element={<News user={user} storagePath={needToHidePrefix} />} />
        <Route path="contact" element={<Contact />} />
        <Route path="donate" element={<Donate />} />
        <Route path="admin" element={<Admin user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
