'use client'
import { useState } from 'react'
import { handleSignup } from '@/utils/actions'
import { useRouter } from 'next/navigation'
export default function SignupPage({ params }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  return (
    <div>
      <h2>Skapa användare</h2>
      <input
        type='text'
        placeholder='Användarnamn'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Lösenord'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Skapa användare</button>
    </div>
  )
}
