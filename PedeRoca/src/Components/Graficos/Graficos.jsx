import React, { useEffect, useState } from 'react'
import { Chart } from 'react-chartjd-2'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'

const Graficos = () => {
    const db = getFirestore()
    const [chart, data, setChartData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'usageData'))
            const data = querySnapshot.docs.map(doc => doc.data())

            const labels = data.map(d => d.date)
            const values = data.map(d => d.value)

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Usage Date',
                        data: values,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1
                    }
                ]
            })
        }
        fetchData()
    }, [db])

    return (
        <div>
            <h1>Relatório de Usos</h1>
            <Chart
                type='bar'
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        x: { beginAtZero: true },
                        y: { beginAtZero: true }
                    }
                }}
            />
        </div>
    )
}

export default Graficos