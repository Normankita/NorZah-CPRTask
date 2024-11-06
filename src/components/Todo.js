import React, { useEffect, useState } from 'react'
import CreateTodo from './CreateTodo';
import ShowTodo from './ShowTodo';

export const Todo = () => {

  const [todo , setTodo] = useState(JSON.parse(localStorage.getItem("todo") )||[]);

  const [todoDate , setTodoDate] = useState(JSON.parse(localStorage.getItem("todoDate") )||[]);
   
  const [disp, setDisp] = useState([])
  const [date, setDate] = useState("");
  const [holder, setHolder] = useState("")

  useEffect(() =>{
    localStorage.setItem("todo", JSON.stringify(todo));
  },[todo])
  
  useEffect(() =>{
    localStorage.setItem("todoDate", JSON.stringify(todoDate));
  },[todoDate])
  return (
    <section>
      < CreateTodo 
          todo= {todo} 
          setTodo= {setTodo} 
          disp={disp} 
          setDisp={setDisp} 
          todoDate={todoDate} 
          setTodoDate={setTodoDate}
          date={date}
          setDate={setDate}
          holder={holder}
          setHolder={setHolder}
      />
      < ShowTodo  
          todo= {todo} 
          setTodo= {setTodo} 
          disp={disp} 
          setDisp={setDisp} 
          todoDate={todoDate} 
          setTodoDate={setTodoDate}
          date={date}
          setDate={setDate}
          holder={holder}
          setHolder={setHolder}
      />      
    </section>
  )
}

