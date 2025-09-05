"use client"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function UserForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.from("users").insert([{ username, email }])
    setMessage(error ? error.message : "User uploaded!")
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 320 }}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Upload User</button>
      <div>{message}</div>
    </form>
  )
}
