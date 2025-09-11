import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react"
import { superbase as supabase } from "../superbase-client"
import { Link } from "react-router";

export default function Dropdown() {
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

    <div className="Dropdown flex justify-end w-full" style={{backgroundColor:'#202020', border:'0'}}>
      <Menu as="div" className="relative inline-block" style={{backgroundColor:'#202020', border:'0'}}>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20" style={{backgroundColor:'#202020', border:'0'}}>

          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-56 origin-top rounded-md  outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"style={{backgroundColor:'#191919'}}
        >
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <a
                  href="/#/"
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-gray-300'
                  }`}
                >
                  Home
                </a>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <a
                  href="/#/community"
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-gray-300'
                  }`}
                >
                  Community
                </a>
              )}
            </MenuItem>
            {user && <MenuItem>
              {({ active }) => (
                <a
                  href="/#/create"
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-white/5 text-white' : 'text-gray-300'
                  }`}
                >
                  Create
                </a>
              )}
            </MenuItem>}

            <MenuItem>
                      {user ? (
            <button className='block px-4 py-2 text-sm text-grey-300' onClick={handleLogout} style ={{marginTop:'-10px', color:'white' , marginLeft:'-2px'}}>
              Logout
            </button>
          ) : (
            <Link to='/signin'>
              <button className='block px-4 py-2 text-sm'   style ={{marginTop:'-10px', color:'white'}}>Login</button>
            </Link>
          )}


            
            </MenuItem>


          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}
