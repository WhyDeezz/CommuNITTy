import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from "./components/Navbar"
import Createpostpage from "./pages/Createpost"
import Communitypage from "./pages/Community"
import Signin from "./pages/SignInPage"
 


export default function App()
{
  return(
    <div>
      <Navbar/>
      <div>
        <HashRouter>
      

            <Route path='/' element={<Home/>}></Route>
            <Route path='/create' element={<Createpostpage/>}></Route>
            <Route path='/community' element={<Communitypage/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
      
        </HashRouter>
    
      </div>
    </div> 

  )
}