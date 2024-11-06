import { useState } from 'react'

const CreateTodo = ({todo, setTodo, todoDate, setTodoDate,disp, setDisp, date, setDate, holder, setHolder}) => {
    
    const [back, setBack] = useState("");
    
   const handleDate = (e)=>{
    e.preventDefault();
    setDate(e.target.date.value);
    setBack("");
   }


    const handleSubmit= (e) => {
        if(holder.id){
            const tim = new Date();

            const newTodo=todo.map((task)=>(
                task.id===holder.id? {id:holder.id, name:e.target.taskname.value, date:`${tim.toLocaleTimeString()} - ${tim.toLocaleDateString()}`, edited:true, todate:date} : task
            ))
            setTodo(newTodo);
            setBack("");
            setDate("");
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
                    date: `${tim.toLocaleTimeString()} - ${tim.toLocaleDateString()}`, edited: false
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
                date: `${tim.toLocaleTimeString()} - ${tim.toLocaleDateString()}`, edited: false}
 
            if(todo.length > 0) {
                setTodo([...todo, newTask])
            }
            else{
                setTodo([newTask])
            }
            
            setHolder({} || "")
            setBack("");
            setDate("");
            e.target.value = "";
        }
    
        }
    }

  return (
    <div className="createTodo">
        {!date &&
             <form onSubmit={handleDate} className='dateform'>
                <input type="date" name="date" className={back}/>
                <button type='submit'>Save</button>
            </form>
        }
        {date && 
            <form onSubmit={handleSubmit} className='taskform'>
                <input type="text" name= "taskname" id="name" autoFocus  onChange={()=>setBack("clicking")}value={holder.name} className={back} autoComplete='off'  onChange={e=>setHolder({...holder, name:e.target.value})} />
                <button type= 'submit' className='button'> {holder.id? "Update": "Create"} </button>
            </form>
        }
    </div>
  )
}

export default CreateTodo
