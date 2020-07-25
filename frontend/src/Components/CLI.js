import React from 'react'
import './CLI.css'
import {useState} from 'react'


export default function CLI(){

    //command and command list state hooks
   const[command, setCommand] = useState('')
   const[commandList , SetCommandList] = useState(['',''])

   //command onChange Handler
   const CommandSet = (e) =>{

         setCommand(e.target.value)  
   }

//story form submission handler
const onFormSubmit= (e)=>{
    e.preventDefault();

    fetch('http://localhost:8080/create',{          //request url
        headers:{
            'Content-Type':'application/json'
        },
        method: 'POST',
        body:JSON.stringify({                       //request 
            as: e.target.as.value,
            should: e.target.should.value,
             so: e.target.so.value
        })
    }).then(res=>{
        
        res.json().then(json=>{        

            //if post created

            if(json.status=='complete'){
            commandList.push(<div style={{color:'green'}}>command status : {json.status} <a href={json.url}>{json.id}</a></div>)
            let list = [...commandList]
            SetCommandList(list)
 
        ////////if post creation unsuccessful/////////

            }else{

                commandList.push(<div style={{color:'red'}}>command status : {json.status} : {json.err} </div>)
                let list = [...commandList]
                SetCommandList(list)

            }
            
        })


    }).then(data=>{
        
    })


}

   // story form
   const form = <div>

<form onSubmit={onFormSubmit}>
    As a <input type='text' name='as'></input><br />
    I should <input type='text' name='should'></input><br />
    So that<input type='text' name='so'></input><br />
    <input type='submit' placeholder='Topic'></input>
</form>
 </div>



//Command Submit Handler
   const HandleSubmit =()=>{

    if(command=='new story'){
        commandList.push(<div style={{color:'green'}}>running :{command}</div>)
        commandList.push(form)
        let list = [...commandList]                             //////////////////story creation handle///////////////
        SetCommandList(list)
        setCommand('')
        

    }else if(command=='cls')
    {                                 //////////////clear command handle////////////
        SetCommandList([])
        setCommand('')

    }
    
    else{
        commandList.push(<div style={{color:'red'}}>Command not found</div>)       //////command not found handle
        setCommand('')
        
    }
    

   }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Rendering elements
    return <div className='maincontainer'>

    <div className='container'>
       <div style={{ marginBottom:'20px'}}> ClickUp CLI</div>

        {commandList.map(com=>{
            return <div>{com}</div>
        })}

     


    </div>
    <div className='input'>
       <input type='tex' placeholder='Enter command Here' name='command' value={command} onChange={CommandSet} style={{width:'300px'}}></input>
       <button onClick={HandleSubmit}>Run</button>
    </div>
   
    </div>
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////