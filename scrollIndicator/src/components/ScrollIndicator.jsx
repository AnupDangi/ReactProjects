import { useState,useEffect } from "react"
import "./Scroll.css";
export default function ScrollIndicator({url}){
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    const[scrollPercetage,setScrollPercentage]=useState(0);

    async function fetchData(getUrl){
        try{
            setLoading(true);
            const response=await fetch(getUrl);
            const data=await response.json();

            if(data && data.products.length>0){
                setData(data.products);
                setLoading(false);
            }
            
        }
        catch(e){
            console.log(e);
            setErrorMessage(e.message);
        }

    }

    useEffect(()=>{
        fetchData(url);
    },[url]);
    console.log(data,loading);

    function handleScrollPercentage(){
        console.log(document.body.scrollTop,
            document.documentElement.scrollTop,
            document.documentElement.scrollHeight,
            document.documentElement.clientHeight
        );

        const scrolled=document.body.scrollTop||document.documentElement.scrollTop;
        const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

        setScrollPercentage((scrolled/height)*100);

    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScrollPercentage);
        return ()=>{
            window.removeEventListener("scroll",()=>{});
        }
    },[]);
    console.log(data,scrollPercetage);

    if(loading){
       return<div>Loading Data! Please Wait</div> 
    }

    if(errorMessage){
        return<div>Error Occcured!{errorMessage}</div>
    }

    return(
        <div className="datas">
            <div className="top-container">
                <h1>Custom Scroll Indicator</h1>
            <div className="scroll-progres-tracking-container">
                <div className="current-progress-bar" 
                    style={{width:`${scrollPercetage}%`}}>
                </div>
                </div>
            </div>
                <div className="data-container">
                    {
                        data && data.length>0 
                        ?
                        data.map((item)=> 
                            <p>{item.title}</p>)
                        :null
                    }
                </div>
        </div>
    )
}