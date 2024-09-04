import React, { useEffect, useState } from 'react'
import styles from './PainelADM.module.css'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'
import Graficos from '../Graficos/Graficos'

const PainelADM = () => {
    const db = getFirestore()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'tb_usuarios')
            const usersSnapshot = await getDocs(usersCollection)
            const usersList = usersSnapshot.docs.map(doc => doc.data())
            setUsers(usersList)
        }
        fetchUsers()
    }, [db])

    return (
        <div>
            <h1>Painel Administrativo</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
            <Graficos/>
        </div>
    )
}

export default PainelADM