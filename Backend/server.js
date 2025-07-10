import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

//test endpoint
app.get('/api/ping', (req, res) => {
    res.json({ message: 'ping from the server'})

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listneing on port ${PORT}`)

})
