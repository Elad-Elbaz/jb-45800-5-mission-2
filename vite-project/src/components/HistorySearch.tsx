import './HistorySearch.css'
import { useEffect, useState } from 'react'

interface SearchHistoryProps {
    timestamp: string
    cityNameEn: string
    country: string
}

 
export default function HistorySearch() {
    const [history, setHistory] = useState<SearchHistoryProps[]>([])

   useEffect(() => {
        (async () => {
            try {
                const storedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
                setHistory(storedHistory)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

const handleReset = () => {
    localStorage.removeItem('searchHistory')
    setHistory([])
}

    return (
        <div className='HistorySearch'>
            <h1>Search History</h1>
            <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>City Name</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((props, index) => {
                        const {timestamp , cityNameEn, country} = props
                        return (
                        <tr key={index}>
                            <td>{new Date(timestamp).toLocaleString()}</td>
                            <td>{cityNameEn}</td>
                            <td>{country}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}