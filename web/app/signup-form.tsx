"use client"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import bcrypt from "bcryptjs"

export default function SignupForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [birthday, setBirthday] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const hashedPassword = await bcrypt.hash(password, 10)
    const { error } = await supabase.from("users").insert([
      {
        username,
        email,
        password: hashedPassword,
        birthday,
        created_at: new Date().toISOString()
      }
    ])
    setMessage(error ? error.message : "Account created!")
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 320 }}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Birthday" required />
      <button type="submit">Sign Up</button>
      <div>{message}</div>
    </form>
  )
}
