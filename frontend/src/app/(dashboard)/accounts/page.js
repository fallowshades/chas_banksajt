'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function Accounts({ params }) {
  const [otp, setOtp] = useState('')
  const [balance, setBalance] = useState(0)
  const router = useRouter()

  const handleGetBalance = async () => {
    try {
      const response = await fetch('http://localhost:3001/me/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'username', otp }),
      })
      if (response.ok) {
        // Hantera saldo data
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h2>Kontosida</h2>
      <button onClick={handleGetBalance}>Visa saldo</button>
      <p>Saldo: {balance}</p>
    </div>
  )
}

export default Accounts
