import React from 'react'
import styles from './Login.module.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({setLoggedIn}) => {
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const handleChange = ()=>{
        navigate('/dashboard')
        setLoggedIn(true); 
    }
  return (
    <div className={styles.modal}>
        <form>
            <label>
                Email:
                <input type="text" 
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
                />
            </label>
            <label>
                Senha:
                <input type="text" 
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                />
            </label>
        </form>
        <button onClick={()=>handleChange()}>Logar</button>
    </div>
  )
}

export default Login