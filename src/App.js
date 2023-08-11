
import './App.css';
import Header from './Default/Header';
import HomePage from './HomePage';
import Footer from './Default/Footer';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Categories from './Categories';

function App() {

  const [goToTop, setGoToTop] = useState(false)

  setInterval(() => {
    if (window.scrollY > window.innerHeight) {

      setGoToTop(true)
    } else {
      setGoToTop(false)
    }
  }, 1)

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      
    }, [pathname]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/categories/sneakers' element={<Categories categoriesName={'Sneaker'} />} />
        </Routes>
        <Footer />
        {goToTop ? <button onClick={() => {window.scrollTo(0, 0)}} className='btn-top'><i className='bx bx-chevron-up'></i></button> : <></>}
      </div>
    </Router>
  );
}

export default App;
