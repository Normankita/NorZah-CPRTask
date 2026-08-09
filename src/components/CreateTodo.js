import { useState } from 'react'
import DatePicker from './DatePicker'

const CreateTodo = ({todo, setTodo, todoDate, setTodoDate,disp, setDisp, date, setDate, holder, setHolder}) => {

    const [back, setBack] = useState("");
    const [pendingDate, setPendingDate] = useState("");

   const handleDate = (e)=>{
    e.preventDefault();
    setDate(pendingDate);
    setBack("");
   }


    const handleSubmit= (e) => {
        if(holder.id){
            const tim = new Date();

            const newTodo=todo.map((task)=>(
                task.id===holder.id? {id:holder.id, name:e.target.taskname.value, date:`${tim.toLocaleTimeString()} - ${tim.toLocaleDateString()}`, edited:true, todate:date, completed:holder.completed} : task
            ))
            setTodo(newTodo);
            setBack("");
            setDate("");
            setPendingDate("");
            e.target.value = "";
            setHolder({} || "")
        }else{
            
        e.preventDefault();
        
        const existing = todoDate.find(todd => todd.date===date)

        if(existing?.date){

                const tim = new Date();

                const newTask={
                    id: tim.getTime(),
                    todate: date,
                    name: e.target.taskname.value,
                    date: `${tim.toLocaleTimeString()} - ${tim.toLocaleDateString()}`, edited: false, completed: false
                }

                if(todo.length > 0) {
                    setTodo([...todo, newTask])
                }
                else {
                    setTodo([newTask])
                }
            
            setHolder({} || "")
            setBack("");
            setDate("");
            setPendingDate("");
            e.target.value = "";


        }else{

            const newDate ={date: date}
            if(todoDate.length >0){
                setTodoDate([...todoDate, newDate])
            }else{
                setTodoDate([newDate])
            }

            const tim = new Date(); 
            const newTask= {
                id: tim.getTime(),
                todate: date,
                name: e.target.taskname.value,
                date: `${tim.toLocaleTimeString()} - ${tim.toLocaleDateString()}`, edited: false, completed: false}
 
            if(todo.length > 0) {
                setTodo([...todo, newTask])
            }
            else{
                setTodo([newTask])
            }
            
            setHolder({} || "")
            setBack("");
            setDate("");
            setPendingDate("");
            e.target.value = "";
        }

        }
    }

  return (
    <div className="createTodo">
        {!date &&
             <form onSubmit={handleDate} className='dateform'>
                <DatePicker value={pendingDate} onChange={setPendingDate} />
                <button type='submit' className="submit-btn" disabled={!pendingDate}><i className="bi bi-calendar-check"></i> Save</button>
            </form>
        }
        {date &&
            <form onSubmit={handleSubmit} className='taskform'>
                <input type="text" name= "taskname" id="name" autoFocus placeholder="What needs to get done?" value={holder.name} className={back} autoComplete='off' onChange={e=>{setBack("clicking"); setHolder({...holder, name:e.target.value})}} />
                <button type= 'submit' className='button submit-btn'> <i className={holder.id? "bi bi-check2-circle" : "bi bi-plus-circle"}></i> {holder.id? "Update": "Create"} </button>
            </form>
        }
    </div>
  )
}

export default CreateTodo
