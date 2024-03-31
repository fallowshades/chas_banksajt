# Skapa en Banksajt och publicera på aws

I dagens uppgift ska vi öva på att skapa en react-sajt med backend i express och publicera den på en ec2 instans i aws med scp.

## Data i backend

I bankens backend finns tre arrayer: En array `users` för användare, en array `accounts` för bankkonton och en array `sessions` för engångslösenord`.

**Users**
Varje användare har ett id, ett användarnamn och ett lösenord.

```
[{id: 101, username: "Joe", password: "hemligt" }, ...]
```

**Accounts**
Varje bankkonto har ett id, ett användarid och ett saldo.

```
[{id: 1, userId: 101, amount: 200 }, ...]
```

**Sessions**
När en användare loggar in skapas ett engångslösenord. Engångslösenordet och användarid läggs i sessions arrayen.

```
[{userId: 101, token: "nwuefweufh" }, ...]
```

### Sidor på sajten

Banken har följande sidor på sin sajt:

**Landningssida**
Ska innehålla navigering med länkar till Hem, logga in och skapa användare och en hero-section med knapp till skapa användare

**Skapa användare**
Ett fält för användarnamn och ett för lösenord. Datat ska sparas i arrayen users i backend och ett bankkonto skapas i backend med 0 kr som saldo.

**Logga in**
Ett fält för användarnamn och ett för lösenord och en logga in knapp. När man klickat på knappen ska man få tillbaka sitt engångslösenord i response och skickas till kontosidan med useRouter.

**Kontosida**
Här kan man se sitt saldo och sätta in pengar på kontot. För att göra detta behöver man skicka med sitt engångslösenord till backend.

## Hur du klarar uppgiften

1. Öppna en terminal och gå med `cd` där du vill skapa projektet.
2. Skapa där en folder: bank och gå med `cd` in i foldern.

### Skapa frontend

1. Skriv `npx create-next-app frontend`.
2. Gå in i projektet: `cd frontend`.

### Skapa backend

1. Backa en nivå med `cd ..`.
1. Skapa en folder: backend och gå med `cd` in i foldern.
1. Skriv `npm init` och tryck Enter på alla frågor.
1. Lägg till `"type": "module"`i package.json
1. I scripts i package.json lägg till: `"start": "nodemon server.js"`
1. Installera dependencies: `npm i express cors body-parser`
1. Börja skriva kod i `server.js`

### Endpoints och arrayer

1. I backend skapa tre tomma arrayer: `users`, `accounts` och `sessions`.
2. Skapa endpoints för:

- Skapa användare (POST): "/users"
- Logga in (POST): "/sessions"
- Visa salodo (POST): "/me/accounts"
- Sätt in pengar (POST): "/me/accounts/transactions"

3. När man loggar in ska ett engångslösenord skapas och skickas tillbaka i response.
4. När man hämtar saldot ska samma engångslösenord skickas med i Post.

### Startkod för server.js i backend

```
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
    // Generera en sexsiffrig numerisk OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

// Din kod här. Skriv dina arrayer


// Din kod här. Skriv dina routes:

// Starta servern
app.listen(port, () => {
    console.log(`Bankens backend körs på http://localhost:${port}`);
});

```

### Exempel på fetch för POST i frontend

```
fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'Användarnamn',
        password: 'Lösenord',
    }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
    console.error('Error:', error);
});

```

## Publicera på aws

1. Gå med cd upp en nivå så att du är i bank-mappen. Överför filerna med scp (radera node_modules först så går det snabbare) :

```
scp -i <din-nyckel>.pem -r ./ ubuntu@<din-ec2-instans>:/home/ubuntu/bank
```

2. logga in på din instans med ssh.

3. Installera Node.js om det inte redan är installerat.

4. Navigera till din backend-mapp och starta din server med node server.js.

5. Navigera till din frontend-mapp. Kör följande:

```
npm install
npm run build
npm run start
```

## Hur du lämnar in

1. Skapa ett repo på github.
2. Ladda up dina filer till github:

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <Adressen till ditt repo>
git push -u origin main
```

3. Klicka på uppgiften i canvas och ange länken till ditt repo.

---

### :boom: Success!

Efter denna uppgift ska ni kunna skapa en fullstack sajt med api och publicera på aws.

---

### :runner: Extrauppgifter

Klar? Här är lite mer att göra:

1. Installera pm2 på backend och se till att frontend och backend körs även när terminalen stängs.

## skapa backend identifiera objekt i array

```sh
npm init
```

skapa .git inore i backend mapped och ignorera node modules

server.js

- port 3001 eftersom jag använder port 3000 för frontend

```js
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
...

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`)
})

```

- array metoder
  - identifiera via matchning
  - beroende av user matchning skapa object i array
  - sök objekt som beror på användare och session

```js
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
  res.status(201).send('Användare skapad')
})
```

```js
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
  res.status(200).json({ otp })
})
```

```js
// Visa saldo
app.post('/me/accounts', (req, res) => {
  const { username, otp } = req.body
  const session = sessions.find((s) => s.username === username && s.otp === otp)
  if (!session) {
    return res.status(401).send('Ogiltig session')
  }

  // Din kod för att visa saldo här

  res.status(200).send('Visa saldo')
})

// Sätt in pengar
app.post('/me/accounts/transactions', (req, res) => {
  const { username, otp } = req.body
  const session = sessions.find((s) => s.username === username && s.otp === otp)
  if (!session) {
    return res.status(401).send('Ogiltig session')
  }
```

## front end navigering

### basic chatGPT navigering

```sh
npx create-next-app@latest frontend
```

[route-groups]https://nextjs.org/docs/app/building-your-application/routing/route-groups

skapa sidor i dashboard

app
-(dashboard)
--accounts
--auth
---signup
---login
--profile

app\page.js

```js
'use client'
import Link from 'next/link'
function LandingPage() {
  return (
    <div>
      <nav className='flex gap-2'>
        <Link href='/'>Hem</Link>
        <Link href='/auth/login'>Logga in</Link>
        <Link href='/auth/signup'>Skapa användare</Link>
      </nav>
      <section className='hero-section'>
        <h1>Välkommen till banken</h1>
        <button>
          <Link href='/auth/signup'>Skapa användare</Link>
        </button>
      </section>
    </div>
  )
}

export default LandingPage
```

#### pages

login.js

```js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login({ params }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        const data = await response.json()
        setOtp(data.otp)
        router.push('/me/accounts')
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h2>Logga in</h2>
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
      <button onClick={handleLogin}>Logga in</button>
    </div>
  )
}
```

signup\page.js

```js
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
```

accounts\page

```js
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
```

### ordentlig navigering

```sh
npm install next-themes@^0.2.1
npx shadcn-ui@latest init
```
