import DateDetails from "./DateDetails";
import "./ShowTodo.css"
import { useEffect, useState } from "react";

const todayISO = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const ShowTodo = ({todo, setTodo, todoDate, setTodoDate, disp, setDisp, date, setDate, holder, setHolder, showToast}) => {
  const[intel, setIntel] = useState(true)
  const [done, setDone] = useState(false)
  const [cur, setCur] = useState("")
  const today = todayISO()

  const handleDelete = (id) => {
      const removedDate = todoDate.find(d => d.date === id)
      const removedTasks = todo.filter(t => t.todate === id)
      setTodoDate(todoDate.filter(d => d.date !== id))
      setTodo(todo.filter(t => t.todate !== id))
      showToast && showToast(
        removedTasks.length
          ? `Deleted ${id} and ${removedTasks.length} task${removedTasks.length > 1 ? "s" : ""}`
          : `Deleted ${id}`,
        () => {
          setTodoDate(prev => [...prev, removedDate])
          setTodo(prev => [...prev, ...removedTasks])
        }
      )
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <br /><h1> <i className="bi bi-calendar3"></i> <span className="count">{todoDate.length}</span> {todoDate.length===0? "tasks here": todoDate.length===1? "only here" : "dates"}</h1><br />
        <ol>
            {(todoDate.length !== 0) && todoDate.map((datel)=>{
                const dayTasks = todo.filter(t => t.todate === datel.date)
                const pendingCount = dayTasks.filter(t => !t.completed).length
                const isToday = datel.date === today
                const isOverdue = !isToday && datel.date < today && pendingCount > 0
                return (
                <li key={datel.date} className={`${isToday? "is-today": ""} ${isOverdue? "is-overdue": ""}`}>
                    <span className="date-info">
                      <span className="date-label">
                        {datel.date}
                        {isToday && <span className="badge badge-today">Today</span>}
                        {isOverdue && <span className="badge badge-overdue">Overdue</span>}
                      </span>
                      {dayTasks.length > 0 &&
                        <span className="date-progress">{dayTasks.length - pendingCount}/{dayTasks.length} done</span>
                      }
                    </span>
                    <span  className='view'>
                       <span className="deli" title="Delete" aria-label="Delete" onClick={()=> handleDelete(datel.date)} ><i className="bi bi-trash3"></i></span>
                       <span className="edi" title="View" aria-label="View" onClick={()=> viewDay(datel.date)} ><i className="bi bi-eye"></i></span>
                    </span>
                </li>
                )
            })}
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
        showToast={showToast}
      />
    </div>
  )
}

export default ShowTodo
