import React from 'react'
import styles from './Login.module.css'
import logo from '../../assets/Logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'
import { useAuthValue } from '../../context/AuthContext'

const Login = () => {
  const [pageRender, setPageRender] = useState(0) //provisório até arrumar o "const { user } = useAuthValue()"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  //const { user } = useAuthValue()
  const { login, error: authError, loading } = userAuthentication()
  

  const handlerSubmit = async (e) => {
    e.preventDefault()
    const usuario ={
      email,
      password
    }
    const res = await login(usuario)

    console.table(res)
    setPageRender(1)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])
  return (
    <>
    {pageRender == 1 && 
     <h1>Usuário Logado</h1>
    }
    {pageRender == 0 && 
        <div>
        <main>
          <img src={logo} alt="Logo Pede Roça" className={styles.imgLogoLogin} />
        </main>
        <form onSubmit={handlerSubmit}>
          <div className='form-group form-floating mb-3'>
            <input type="email" name='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' id='floatingInput' placeholder='name@exemple.com' />
            <label type='email' htmlFor='floatingInput'>Usuário</label>
          </div>
          <div className='form-group form-floating mb-3'>
            <input type="password" name='password' required value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' id='floatingInput' placeholder='name@exemple.com' />
            <label type='password' htmlFor='floatingInput'>Senha</label>
          </div>
          <div className='form-group d-flex justify-content-between'>
            <button className={styles.btnHelp}>Recuperar Senha</button>
            <button className={styles.btnHelp}>Cadastro</button>
          </div>
          <div className='form-group'>
            {!loading && <button className='btn' id={styles.btnLogin}>Logar</button>}
            {loading && <button className='btn' id={styles.btnLogin} disabled>Logando...</button>}
            {error && <div className='mt-3 alert alert-danger'>{error}</div>}
          </div>
        </form>
      </div>
    }
    </>
  )
}

export default Login
