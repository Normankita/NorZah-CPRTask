import { useEffect } from "react"

const DateDetails = ({disp, intel, setIntel, done, setDone, todo, cur, setCur, setTodo, setDisp, date, setDate, holder, setHolder, showToast}) => {


  useEffect(()=>{
    setDisp(todo.filter(d=>d.todate===cur))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[todo])

  const handledate = (id)=>{
    setTimeout(()=>{
      const another= disp.filter(d=>d.id!==id)
      setDisp(another)
    },1000)
  }


  const handleDel =(id)=>{
      const removedTask = todo.find(t => t.id === id)
      const stripedtodo= todo.filter(todo=>todo.id !== id);
      setTodo(stripedtodo)
      handledate(id);
      showToast && showToast("Task deleted", () => {
        setTodo(prev => [...prev, removedTask])
      })
  }

  const handleToggleComplete = (id) => {
    setTodo(todo.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const handleEdit=(id)=>{
    for(let i=0; i<2; i++){
      setHolder(disp.find(todo=>todo.id===id))
    }
    setDate(disp.find(todo=>todo.id===id).todate);

  }

  const trans = ()=>{
    setCur("")
    setIntel(true)
    setTimeout(() =>{
      setDone(false)
    }, 1000)
  }

  const completedCount = disp.filter(t => t.completed).length

  return (
    <section className={`showtodo ${intel? "hide" : "show"} ${done? "hello" :"done"}`}>
        {

        (disp.length!==0) &&<>
        <div className="head">
          <span onClick={trans}><h1 className="title"> <i className="bi bi-arrow-left-short"></i> <u> {cur} </u></h1></span>
          <span className="progress-chip">{completedCount}/{disp.length} done</span>
        </div>
        <ul >
        {disp.map((task)=>(
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <button type="button" className="check" aria-label={task.completed ? "Mark as not done" : "Mark as done"} onClick={()=>handleToggleComplete(task.id)}>
                <i className={task.completed ? "bi bi-check-circle-fill" : "bi bi-circle"}></i>
              </button>
              <p className="name"> {task.name} </p><br />
              <p className="date"> {task.edited? "edited at: ": "created at: "} {task.date} </p>
              <div className="action">
                <span className="del" title="Delete" aria-label="Delete" onClick={()=>handleDel(task.id)}><i className="bi bi-trash3"></i></span>
                <span className="ed" title="Edit" aria-label="Edit" onClick={()=>handleEdit(task.id)}><i className="bi bi-pencil-square"></i></span>
              </div>
            </li>

        ))}
        </ul>
        </>
      }
    </section>
  )
}

export default DateDetails
