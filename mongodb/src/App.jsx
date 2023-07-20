import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import Login from "./components/login";
import Form from './components/form';
import LandingPage from "./components/LandingPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>  
    <Route path="/register" Component={Form}></Route>
    <Route path="/Login" Component={Login}></Route>
    <Route path="/" Component={LandingPage}></Route>
    </Routes>
    </BrowserRouter>
    {/* <Form/>
    <Login/> */}
    </>
  )
}

export default App
