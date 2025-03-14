import { useEffect, useState } from "react"


export default function RandomColor(){
const [typeOfColor,setTypeOfColor]=useState("hex");
const [color,setColor]=useState("#000000");


function randomColorUtility(length){
    return Math.floor(Math.random()*length);
}
function generateHexColor(){
    
    const hex=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
    let hexColor="#";
    for(let i=0;i<6;i++){
        hexColor+=hex[randomColorUtility(hex.length)];
    }
    console.log(hexColor);
    setColor(hexColor);
}

function generateRgbColor(){
    const r=randomColorUtility(256);
    const g=randomColorUtility(256);
    const b=randomColorUtility(256);
    const rgbColor=`rgb(${r},${g},${b})`;
    setColor(rgbColor);
}

useEffect(()=>{
    if(typeOfColor==="rgb") generateRgbColor;
    else generateHexColor;
})

    return( 
        <div className="container" style={
            {
                width:"100vw",
                height:"100vh",
                background:color,
                fontSize:"60px",
                marginTop:"50px",
                flexDirection:"column",
                gap:"10px",
            }
        }>
                
                <button onClick={()=>setTypeOfColor("hex")}>Create HEX Color</button>
                <button onClick={()=>setTypeOfColor("rgb")}>Create RGB Color</button>
                <button onClick=
                {typeOfColor=="hex"? 
                    generateHexColor:
                    generateRgbColor}>
                    Generate Random Color</button>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    color:"#fff",
                    fontSize:"60px",
                    marginTop:"50px",    
                }}  
                >
                    <h3> {typeOfColor==="rgb" ?"RGB Color":"HEX Color"}
                       {color}</h3>
                   
                </div>
        </div>
    )
}