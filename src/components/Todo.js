import React, { useEffect, useRef, useState } from 'react'
import CreateTodo from './CreateTodo';
import ShowTodo from './ShowTodo';
import Toast from './Toast';

export const Todo = () => {

  const [todo , setTodo] = useState(JSON.parse(localStorage.getItem("todo") )||[]);

  const [todoDate , setTodoDate] = useState(JSON.parse(localStorage.getItem("todoDate") )||[]);

  const [disp, setDisp] = useState([])
  const [date, setDate] = useState("");
  const [holder, setHolder] = useState("")

  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const dismissToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(null)
  }

  const showToast = (message, onUndo) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ message, onUndo })
    toastTimer.current = setTimeout(() => setToast(null), 5000)
  }

  const handleUndo = () => {
    if (toast?.onUndo) toast.onUndo()
    dismissToast()
  }

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
          showToast={showToast}
      />
      <Toast toast={toast} onUndo={handleUndo} onDismiss={dismissToast} />
    </section>
  )
}
