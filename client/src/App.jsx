import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Header from './components/header';
import PrivateRoute from './components/PrivateRoute.jsx';

export default function App() {
  return (
   <BrowserRouter>
    <Header />
   <Routes>
      
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route element={< PrivateRoute/>}>
     <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    
   </Routes>
   </BrowserRouter>
    
  )
}
