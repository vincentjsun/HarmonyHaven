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
                    history("/", {state:{id:email}});
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
        <div className="about">
            <h1 className="log">Login</h1>
            <form action="POST">
                <div className="boxes">
                    <input className="field" type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="" id="" />
                    <input className="field" type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="" id="" />
                    <input className='submit' type="submit" onClick={submit}/>   
                </div>     
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link className='link' to="/signup">Signup Page</Link>
        </div>
    )
}
export default Login;