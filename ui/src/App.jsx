import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './view/header'
import Home from './view/home'
import Favorites from './view/favorites'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/favorites' element={<Favorites/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
