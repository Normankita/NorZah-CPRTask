import { useEffect } from "react"

const DateDetails = ({disp, intel, setIntel, done, setDone, todo, cur, setCur, setTodo, setDisp, date, setDate, holder, setHolder}) => {


  useEffect(()=>{
    setDisp(todo.filter(d=>d.todate===cur))
  
  },[todo])

  const handledate = (id)=>{
    setTimeout(()=>{
      const another= disp.filter(d=>d.id!==id)
      setDisp(another)
    },1000)
  }

  
  const handleDel =(id)=>{
    if(window.confirm("delete this task?")){
      const stripedtodo= todo.filter(todo=>todo.id !== id);
      setTodo(stripedtodo)
      handledate(id);
    }
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
  return (
    <section className={`showtodo ${intel? "hide" : "show"} ${done? "hello" :"done"}`}>
        {
        
        (disp.length!==0) &&<>
        <span onClick={trans}><h1 className="title"> <u> {cur} </u></h1></span>
        <ul >
        {disp.map((task)=>(
            <li key={task.id}>
              <p className="name"> {task.name} </p><br />
              <p className="date"> {task.edited? "edited at: ": "created at: "} {task.date} </p>
              <div className="action">
                <span className="del" onClick={()=>handleDel(task.id)}>del</span>
                <span className="ed" onClick={()=>handleEdit(task.id)}>ed</span>
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
