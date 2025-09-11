import { Link } from "react-router";
import { useEffect, useState } from "react"
import { superbase as supabase } from "../superbase-client"
import Dropdown from "./Dropdown";


export default function Navbar() {

    const [user, setUser] = useState<any>(null)

    useEffect(() => {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user)
      })

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }, [])

    const handleLogout = async () => {
      await supabase.auth.signOut()
      window.location.href = "/"
  }
 


  

  return (
    <>
    {(window.innerWidth >600 )&&<nav style={{ padding: "20px" , backgroundColor:'#202020'}}>
        <div className="rightside">
          <Link to={'/'}>
            <button>Home</button>
          </Link>
          {user &&
          <Link to={'/create'}>
            <button>Create</button>
          </Link>}

        
            <Link to='/community'>
              <button>Community</button>
            </Link>
                  
          {user ? (
            <button onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to='/signin'>
              <button>Login</button>
            </Link>
          )}
        </div>
        <div className="leftside">
            <img src='./communitylogo.png'></img>

        </div>
    </nav>}
    {
      (window.innerWidth < 600 )&&
      <nav style = {{ backgroundColor:'#202020'}}>
    
        <Dropdown/>
        <div className="leftside">
            <img src='./communitylogo.png'></img>
        </div>
      </nav>
      
    }
    </>
  );
}
