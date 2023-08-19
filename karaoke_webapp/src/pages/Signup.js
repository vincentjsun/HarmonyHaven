import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history=useNavigate();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/signup", {
                email,password
            }).then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="not exist"){
                    //go to homepage
                    //history("/", state:{id:email})
                    console.log("hi");
                }
            }).catch(err=>{
                alert("Wrong Details");
                console.log(err);
            })
        }catch(err){console.log(err)}
    }
    return (
        <div className="login">
            <h1>Signup</h1>
            <form action="POST">
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="" id="" />
                <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" name="" id="" />
                <input type="submit" onClick={submit}/>
                
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/login">Login Page</Link>
        </div>
    )
}
export default Signup;