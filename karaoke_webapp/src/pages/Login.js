import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const history=useNavigate();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/login", {
                email,password
            }).then(res=>{
                if(res.data=="exist"){
                    //go to homepage
                    //history("/", state:{id:email})
                    console.log("hi");
                }
                else if(res.data=="not exist"){
                    alert("User has not signed up");
                }
            }).catch(err=>{
                alert("Wrong Details");
                console.log(err);
            })
        }catch(err){console.log(err)}
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form action="POST">
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="" id="" />
                <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="" id="" />
                <input type="submit" onClick={submit}/>
                
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/signup">Signup Page</Link>
        </div>
    )
}
export default Login;