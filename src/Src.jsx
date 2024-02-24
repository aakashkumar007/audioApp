import React, { useEffect } from 'react'
import { useState } from 'react'

const Src = () => {
    const [input,setInput] = useState([""]);
    const [items,setItems] = useState([])
    console.log(input);

    function handleChange(e){
        setInput(e.target.value); 
        localStorage.setItem('items',JSON.stringify([...items]))
    }

    function addTodo(){
    setItems((oldItems)=>{
        return [...oldItems,input];
    })
    setInput("");
    }

    useEffect(()=>{
        const savedItems = JSON.parse(localStorage.getItem('items'))
        setItems(savedItems)
    },[]);

  return (
    <>
    <h1>ToDO App</h1>
    <div><input type='text' value={input} onChange={handleChange} placeholder='Add items'/> <button onClick={addTodo}>+</button></div>
    <ul>
        {
            items.map((item,index)=>(<li key={index}>{item.toUpperCase()}</li>))
        }
    </ul>
    </>
  )
}

export default Src