// import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
const navigate = useNavigate();
const [name,setName]=useState("");
async function sendToken(){
  const req = await fetch("http://localhost:8080/users/token", {
    headers: { 'x-access-token': localStorage.getItem('token') 
  },
  })
  const data =await req.json();
  console.log(data)
  setName(data.name)
}
useEffect(() => {
const token = localStorage.getItem("token");
console.log(token)
if(token){
    const user = jwt_decode(token);
    if (!user){
        localStorage.removeItem("token");
        navigate("/login")}
    else{
      sendToken();
     }
}else{
  navigate("/login");
}

},[]);

  return (
    <div>
      hello {name}
      <button className="btn btn-danger mt-4" onClick={()=>{
        localStorage.removeItem("token");
        navigate("/login");
      }}> logout</button>
    </div>
  )
}

export default LandingPage
