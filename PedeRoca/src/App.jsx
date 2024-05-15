import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home/Home'
import FooterDesktop from './Components/FooterDesktop/FooterDesktop'
import Products from './Components/Products/Products'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './firebase/config'

function App() {
  const [count, setCount] = useState(0)

   {/* Conexão com banco de dados noSQL Firestore */}
  const [produtos, setProdutos] = useState([])
  const produtosCollectionRef = collection(db, 'tb_produtos')

  useEffect(() => {
    const getProdutos = async () => {
      const data = await getDocs(produtosCollectionRef)
      setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getProdutos()
  }, [])


  return (
    <>
      <Home />
      <FooterDesktop />
      <Products list={produtos} />
    </>
  )
}

export default App
