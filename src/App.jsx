import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [isFinished, setisFinished] = useState(false)
  const flag = useRef(false);
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, [])
  useEffect(() => {
    if (flag.current) {
      saveTols();
    }
    flag.current = true
  }, [todos]);

  // Complete function
  const handleFinished = (event) => {
    setisFinished(event.target.checked);
  }

  // Save function to localstorage
  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }

  // Handle Edit 
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo);

    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos);
  }

  // Handle delete
  const handleDelete = (event, id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      let index = todos.findIndex(item => {
        return item.id == id;
      })
      let newtodos = todos.filter(item => {
        return item.id !== id
      });
      settodos(newtodos);
    }
  }

  // Handle Add of todo
  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    settodos(newTodos);
    settodo("");
  }

  // HandleChange
  const handlechange = (event) => {
    settodo(event.target.value)
  }

  // Handle Change of checkbox
  const handlecheckbox = (event) => {
    let id = event.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className="text-2xl text-center font-bold">iTask - Manage your todos at one place</h1>
        <div className="addToDoList my-5 flex flex-col gap-4">
          <h2 className="text-lg  font-bold">Add a todo</h2>
          <div className="flex white-space:normal" >
            <input onChange={handlechange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length < 1} className='bg-violet-800 mx-2 hover:bg-violet-950 p-4 py-2 text-sm font-bold disabled:bg-violet-700 text-white rounded-full ' >Save</button>
          </div>
        </div>
        <input onChange={handleFinished} className='my-4' type="checkbox" checked={isFinished} id="show" />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-3/4 my-2 mx-auto'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}

          {todos.map(item => (
            isFinished ? (
              item.isCompleted && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input type="checkbox" onChange={handlecheckbox} checked={item.isCompleted} name={item.id} id="" />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="button flex h-full">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit />
                    </button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete />
                    </button>
                  </div>      </div>
              )
            ) : (
              !item.isCompleted && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input type="checkbox" onChange={handlecheckbox} checked={item.isCompleted} name={item.id} id="" />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="button flex h-full">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-[green] hover:bg-violet-950 p-2 py-1 text-md font-bold text-white rounded-md mx-1'><FaEdit />
                    </button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-[red] hover:bg-[purple] p-2 py-1 text-md font-bold text-white rounded-md mx-1'><MdDelete />
                    </button>
                  </div>      </div>
              )
            )
          ))}
        </div>
      </div>
    </>
  )
}

export default App
