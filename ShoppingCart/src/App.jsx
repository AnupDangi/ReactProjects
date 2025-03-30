import './App.css';
import Home from './pages/Home';
import Cart from "./pages/Cart";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/header';

function App() {
  return (
    <>
        <Header/>
        <Routes>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/' element= {<Home/>}/>
        </Routes>
    </>
  )
}

export default App
