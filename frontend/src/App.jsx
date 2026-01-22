import { Navigate, Route, Routes } from "react-router"
import { Login } from "./Pages/Login"
import { Signup } from "./Pages/Signup"
import { Jobs } from "./Pages/Jobs"
import { MyApplications } from "./Pages/MyApplications"
import { Applications } from "./Pages/Applications"
import { Profile } from "./Pages/Profile"
import { Home } from "./Pages/Home"
import { About } from "./Pages/About"
import { AddJobs } from "./Pages/AddJobs"
import { Admin } from "./Pages/Admin"
import { Apply } from "./Pages/Apply"
import ProtectedRoute from "./Components/ProtectedRoute"
import { NavBar } from "./Components/NavBar"
import { JobDetail } from "./Pages/Job"
import { UpdateProfile } from "./Pages/UpdateProfile"
import { UpdatePassword } from "./Pages/UpdatePassword"
import { ForgetPassword } from "./Pages/ForgetPassword"
import { Footer } from "./Components/Footer"
import { RecoverPassword } from "./Pages/RecoverPassword"
import {AdminRoute} from "./Components/AdminRoute"
import { EditStatus } from "./Pages/EditStatus"
function App() {
    return(
        <>
        <Routes>
            <Route element={<NavBar/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/job/:id" element={<ProtectedRoute><JobDetail/></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="/profile/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
                <Route path="/profile/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
                <Route path="/myapplications" element={<ProtectedRoute><MyApplications/></ProtectedRoute>}/>
                <Route path="/applications" element={<AdminRoute><Applications/></AdminRoute>}/>
                <Route path="/edit/:id" element={<AdminRoute><EditStatus/></AdminRoute>}/>
                <Route path="/apply/:id" element={<ProtectedRoute><Apply/></ProtectedRoute>}/>
                <Route path="/addjobs" element={<AdminRoute><AddJobs/></AdminRoute>}/>
                
            </Route>

            <Route path="/login" element={<Login/>}/>
            <Route path="/forgetpassword" element={<ForgetPassword/>}/>
            <Route path="/recoverpassword" element={<RecoverPassword/>}/>
            <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>}/>
            <Route path="/signup" element={<Signup/>}/>
            
            
            
            
            
            
            
            
            <Route path='/*' element={<Navigate to="/"/>}/>
        </Routes>
        <Footer/>
        </>
    )

}

export default App
