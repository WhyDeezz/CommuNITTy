import {HashRouter, Route,Routes,Navigate } from "react-router"
import Home from './pages/Home'
import Navbar from "./components/Navbar"
import Createpostpage from "./pages/Createpost"
import Communitypage from "./pages/Community"
import Signin from "./pages/SignInPage"
 


export default function App()
{
  return(
    <HashRouter>
      <Navbar/>
      <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create' element={<Createpostpage/>}></Route>
            <Route path='/community' element={<Communitypage/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  
      </div>
    </HashRouter>
    

  )
}