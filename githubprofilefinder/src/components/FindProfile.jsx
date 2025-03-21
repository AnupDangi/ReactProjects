import { useEffect } from "react";
import { useState } from "react"

import Users from "./User";
import "./Profile.css";
export default function GithubProfileFinder(){

    const [username,setUsername]=useState("anupdangi");
    const [userData,setUserData]=useState(null);
    const[loading,setLoading]=useState(false);

    async function fetchGithubUserData() {
        setLoading(true);
        const data=await fetch(`https://api.github.com/users/${username}`);
        const response=await data.json();
        console.log(response);
        if(response){
            setUserData(response);
            setLoading(false);
            setUsername("");
        }
        else{
            setLoading(true);
        }
    }


    function handleSubmit(){
        fetchGithubUserData();
    }
        useEffect(()=>{

            fetchGithubUserData();
    
        },[]);

        if(loading){
            return <h1>Loading Data! Please Wait</h1>
        }

    return (
    <div className="github-profile-container"> 
        <div className="input-wrapper">
            <input type="text" name="username" 
               placeholder="Search Github UserName"
               value={username}
               onChange={(event)=>setUsername(event.target.value)}/>
            <button onClick={handleSubmit}>
                Search
            </button>
            </div>
            {
                userData !==null ?<Users user={userData}/>:null
            }
        </div>
   
    )
}