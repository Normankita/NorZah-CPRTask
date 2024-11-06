import React from 'react'

const Listing = ({todo}) => {
  return (
    <ul>
        {
            todo.map((todo) =>(
                <li key={todo.task.id}>
                    <span> the name of the task : {todo.task.map((onl)=>onl.name)} </span><br /><br />
                    <span> created at : {todo.task.map((onl)=>onl.date)}</span><br /><br />
                    {todo.task.edited&& <span> edited at {todo.task.map((onl)=>onl.date) } </span>}
                    <span>task designated for {todo.date}</span>
                </li>
            ))
        }
    </ul>
  )
}

export default Listing
