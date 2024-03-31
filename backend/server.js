import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Tomma arrayer för användare, konton och sessioner
let users = []
let accounts = []
let sessions = []

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000)
  return otp.toString()
}

// Skapa användare
app.post('/users', (req, res) => {
  const { username, password } = req.body
  const user = { username, password }
  users.push(user)
  console.log(users)
  res.status(201).send('Användare skapad')
})

// Logga in och skicka engångslösenord
app.post('/sessions', (req, res) => {
  const { username, password } = req.body
  const user = users.find(
    (u) => u.username === username && u.password === password
  )
  if (!user) {
    return res.status(401).send('Fel användarnamn eller lösenord')
  }

  const otp = generateOTP()
  sessions.push({ username, otp })
  console.log(sessions)
  res.status(200).json({ otp })
})

// Visa saldo
app.post('/me/accounts', (req, res) => {
  const { username, otp } = req.body
  console.log('username', username, 'otp', otp)
  const session = sessions.find((s) => s.username === username && s.otp === otp)
  if (!session) {
    return res.status(401).send('Ogiltig session')
  }

  // Din kod för att visa saldo här
  const saldo = accounts[session].balance
  console.log(saldo)
  res.status(200).send(saldo)
})

// Sätt in pengar
app.post('/me/accounts/transactions', (req, res) => {
  const { username, otp, amount } = req.body
  console.log(users)
  const session = sessions.find((s) => s.username === username && s.otp === otp)
  if (!session) {
    return res.status(401).send('Ogiltig session')
  }

  // Din kod för att hantera transaktioner här
  accounts[session].balance += amount

  // Send the updated balance back to the client
  const newBalance = accounts[accountIndex].balance
  res.status(200).json({ balance: newBalance })
})

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`)
})
