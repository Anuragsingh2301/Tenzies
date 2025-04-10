import React, { useEffect, useRef, useState } from 'react'
import Die from './die'
import { nanoid } from "nanoid";
import ReactConfetti from 'react-confetti';

 function App () {

  const[dice , setdice]= useState(allnewdice())
  const[Tenzies,setTenzies]=useState(false)
  const mainRef = useRef(null)

  useEffect(()=>{
    const allheld=dice.every(die=>die.isheld)
    const firstvalue= dice[0].value
    const Allsame=dice.every(die=>die.value===firstvalue)
    if(allheld && Allsame){
      setTenzies(true)
      
    }
  },[dice])

  function generatenewdie(){
    return {value:Math.ceil(Math.random()* 6),isheld:false,id:nanoid()}
  }

  function newgame(){
    setdice(olddice=>olddice.map(die=>{
      return generatenewdie()
    }))
    setTenzies(false)
  }
  
  function allnewdice(){
    const newdice=[]

    for(let i=0;i<10;i++){
      newdice.push(generatenewdie())
      
    }return newdice    
  }

  function Rolldice(){
    setdice(olddice=>olddice.map(die=>{
        return die.isheld?die:generatenewdie()
  })
    )

  }

  function Toggleisheld(id){
    setdice(prevdice=>{
      return prevdice.map(die=>{
          return die.id===id?{...die,isheld:!die.isheld }:die
        })
      
    })
     


  }
  const Dieelements= 
    dice.map(die=>{
      return <Die key={die.id} isheld={die.isheld} num ={die.value} toggle={()=>Toggleisheld(die.id)}/>
    })
  


  return (
    <main className='container' ref={mainRef}>
      {Tenzies && mainRef.current && (
        <ReactConfetti
          width={mainRef.current.clientWidth}   
          height={mainRef.current.clientHeight}  
        />)}
      <h1 className='title'>Tenzies</h1>
      <p className='desc'>{Tenzies?"Congratulations You Won Click on New Game to Continue":"Roll until all dice are the same. click  each die to freeze it at its current value between rolls"}</p>
      <div className='Die-cont'>
        {Dieelements}
      </div>
      <button className="roll-butt" onClick={Tenzies?newgame:Rolldice}>
      {Tenzies ? "New Game" : "Roll"}
  </button>
     </main>
  )
}

export default App
