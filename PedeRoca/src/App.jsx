import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/App.css'
import Home from './pages/Home/Home'
import FooterDesktop from './Components/FooterDesktop/FooterDesktop'
import Products from './Components/Products/Products'
import { onAuthStateChanged } from 'firebase/auth'
import { userAuthentication } from './hooks/userAuthentication'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './firebase/config'
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth, logout } = userAuthentication()

  const loadingUser =  user === undefined

   {/* Conexão com banco de dados noSQL Firestore */}
  const [produtos, setProdutos] = useState([])
  const produtosCollectionRef = collection(db, 'tb_produtos')

  useEffect(() => {
    const getProdutos = async () => {
      const data = await getDocs(produtosCollectionRef)
      setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getProdutos()
    onAuthStateChanged(auth, user => {
      setUser(user)})
  }, [auth])
  

  if(loadingUser) {
    return <div className='loadingAnimation'></div>
  }

  return (
    <>
    <AuthProvider value={{ user, logout }}>
      <Home />
      <FooterDesktop />
      <Products list={produtos} />
    </AuthProvider>
    </>
  )
}

export default App
