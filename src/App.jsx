import './normalize.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/App.css'
import Home from './pages/Home/Home'
import AdminPage from './pages/AdminPage/AdminPage'
import { onAuthStateChanged } from 'firebase/auth'
import { userAuthentication } from './hooks/userAuthentication'
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = userAuthentication()
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <div className='loadingAnimation'></div>
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/admin' element={<AdminPage />}></Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
