import { useEffect, useState } from 'react'
import { pingServer } from './api'

export default function App() {
  const [message, setMessage] = useState('...')

  useEffect(() => {
    pingServer()
    .then(data => setMessage(data.message))
    .catch(err => setMessage('Error: ' + err.message))
  }, [])

return (
  <div style={{ padding: 20 }}>
    <h1> Backend Says:</h1>
    <p>{message}</p>
  </div>
)
 
}
