
import { useState } from "react"
import { superbase as supabase } from "../superbase-client"


export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
   
 
    if (error) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

   


    
    window.location.href = "/"
  }

  return (
    <div className="flex  items-center justify-center bg-transparent">
      <div className="w-full max-w-md rounded-2xl bg-transparent p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          CR Sign In
        </h1>
        <form onSubmit={handleSignIn} className="space-y-4  text-white">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border  text-white border-gray-300 p-2 focus:border-blue-500 focus:ring"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border text-white border-gray-300 p-2 focus:border-blue-500 focus:ring"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
