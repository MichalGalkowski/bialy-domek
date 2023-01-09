import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css'

// pages & components
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'
import UserSettings from './pages/userSettings/UserSettings'
import Settings from './pages/settings/Settings'
import Dues from './pages/dues/Dues'
import DuesItem from './pages/duesItem/DuesItem'
import AddDues from './pages/addDues/AddDues'
import Cleaning from './pages/cleaning/Cleaning'
import Home from './pages/home/Home'
import AddInfo from './pages/addInfo/AddInfo'
import Shopping from './pages/shopping/Shopping'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
        {user && (<Sidebar />)}
        <div className='container'>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/logowanie" element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="/rejestracja" element={user ? <Navigate to='/' /> : <Signup />} />
          <Route path="/uzytkownik" element={user ? <UserSettings /> : <Navigate to='/logowanie' />} />
          <Route path="/ustawienia" element={user ? <Settings /> : <Navigate to='/logowanie' />} />
          <Route path="/dodajInfo" element={user ? <AddInfo /> : <Navigate to='/logowanie' />} />
          <Route path="/skladki" element={user ? <Dues /> : <Navigate to='/logowanie' />} />
          <Route path="/skladki/:id" element={user ? <DuesItem /> : <Navigate to='/logowanie' />} />
          <Route path="/dodajSkladke" element={user ? <AddDues /> : <Navigate to='/logowanie' />} />
          <Route path="/sprzatanie" element={user ? <Cleaning /> : <Navigate to='/logowanie' />} />
          <Route path="/zakupy" element={user ? <Shopping /> : <Navigate to='/logowanie' />} />
        </Routes>
        </div>
        {user && <OnlineUsers />}
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
