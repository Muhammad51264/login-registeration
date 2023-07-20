import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  async function registerUser() {

    const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    })

    const data = await response.json()
    if (data.status ==="ok"){
      navigate("/login");
    }

    console.log(data);
}


  return (
    <div className="register">
      <form className="d-flex flex-column mt-5 w-25 mx-auto gap-4" onSubmit={(e)=>{
        e.preventDefault();
        registerUser();
        }}>
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Form;
