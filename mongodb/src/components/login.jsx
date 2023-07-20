import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {

    const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const data = await response.json()
    

    if(data.user){
      localStorage.setItem("token", data.user);
        alert('login success');
        navigate("/")

    }else{
        alert("failed");
    }
    console.log(data);
}


  return (
    <div className="login">
      <form className="d-flex flex-column mt-5 w-25 mx-auto gap-4" onSubmit={(e)=>{
        e.preventDefault();
        loginUser();
        }}>

        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
