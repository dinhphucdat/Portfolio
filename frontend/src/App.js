import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/header' element={<Header />} />
          <Route path='/#aboutme' element={<Home />} />
          <Route path='/#emailme' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
