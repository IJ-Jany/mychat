import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/login";
import Registration from "./pages/registration/Registration";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/home/Home"
import Message from "./pages/message/Message";
import Notification from "./pages/notification/Notification";
import Settings from "./pages/settings/Settings";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
   <Route path="/" element={<Login/>} />
   <Route path="/Registration" element={<Registration/>}/>
   <Route element={<RootLayout/>}>
   <Route path="/home" element={<Home/>}/>
   <Route path="/message" element={<Message/>}/>
   <Route path="/notification" element={<Notification/>}/>
   <Route path="/settings" element={<Settings/>}/>
   </Route>
      </>
    )
  )

  return (
    <>
     <RouterProvider
    router={router} 
  />
    </>
  )
}

export default App
