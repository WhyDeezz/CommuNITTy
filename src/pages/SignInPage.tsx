
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
    <>
    <h1 className="mb-6 mt-5 text-center text-4xl font-bold text-white"   style={{
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    fontWeight: 700,
    fontStyle: "normal"
  }}>
          CR Login
    </h1>
    <div className="flex  items-center justify-center " style={{backgroundColor:'#202020', width:'500px' , marginTop:'20px' , marginLeft:'58vh' , borderRadius:'40px',
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    fontWeight: 700,
    fontStyle: "normal"}}>
      <div className="w-full max-w-md rounded-2xl bg-transparent p-8 shadow-lg">

        <form onSubmit={handleSignIn} className="space-y-4  text-white">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border  text-white border-gray-300 p-2 focus:border-blue-500 focus:ring"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border text-white border-gray-300 p-2 focus:border-blue-500 focus:ring"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 h-16 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  </>
  )
}
