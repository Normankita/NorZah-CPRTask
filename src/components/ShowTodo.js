import DateDetails from "./DateDetails";
import "./ShowTodo.css"
import { useEffect, useState } from "react";
const ShowTodo = ({todo, setTodo, todoDate, setTodoDate, disp, setDisp, date, setDate, holder, setHolder}) => {
  const[intel, setIntel] = useState(true)
  const [done, setDone] = useState(false)
  const [cur, setCur] = useState("")

  const handleDelete = (id) => {
    if(window.confirm("are you sure?")){
      const selectedDate = todoDate.filter(date => date.date !==id)
      setTodoDate(selectedDate)
      const selectedDateTasks = todo.filter(todo=>todo.date!==id);
      setTodo(selectedDateTasks)
    }    
  }
  useEffect(() =>{
    if(cur){
      const unlucky = todo.filter(todo=>todo.todate===cur);
      if(!(unlucky.length >0)){
        const saved = todoDate.filter(toda=>toda.date!==cur)
        setTodoDate(saved)
        setIntel(true)
        setTimeout(() =>{
        setDone(false)
        setCur("")
    }, 1000)
      }
    }
    else{
      console.log("we are still good brother 😎 ")
    }
  },[todo])  
    const viewDay = (id)=>{
  
        setCur(id)
        const selectedDate = todo.filter(todo=>todo.todate===id);

        setDisp(selectedDate)
        setIntel(false)
        
        setTimeout(() =>{
          setDone(true)
        }, 1000)
    }
    
    const delay = (milliseconds) =>new Promise(resolve => setTimeout(resolve,milliseconds))

  return (
    <div className='container'>
      {/* <Listing todo={todo} /> */}
        <div className={`showdates ${intel? "show": "hide"} ${done? "done":"hello"}`}>
        <br /><h1> <span className="count">{todoDate.length}</span> {todoDate.length===0? "tasks here": todoDate.length===1? "only here" : "dates"}</h1><br />
        <ol>
            {(todoDate.length !== 0) && todoDate.map((datel)=>(
                <li key={datel.date}>
                    <span>{datel.date}</span>
                    <span  className='view'>
                       <span className="deli" onClick={()=> handleDelete(datel.date)} >del</span>
                       <span className="edi" onClick={()=> viewDay(datel.date)} >vi</span>
                    </span> 
                </li>
            ))}
        </ol> 
          </div>  
      <br />
      <DateDetails
        todo={todo}
        setTodo={setTodo}  
        disp={disp} 
        setDisp={setDisp}
        setIntel={setIntel} 
        intel={intel} 
        delay={delay} 
        done={done} 
        setDone={setDone}
        cur={cur}
        setCur={setCur}
        date={date}
        setDate={setDate}
        holder={holder}
        setHolder={setHolder}
      />
    </div>
  )
}

export default ShowTodo
