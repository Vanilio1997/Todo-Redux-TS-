import {useState,useEffect,useRef ,FC} from 'react'
import { ITodo } from '../types/data'
import TodoList from './TodoList';
const App: FC = () => {

const [value, setValue]  = useState('');
const [todos,setTodos] = useState<ITodo[]>([])

const inputRef = useRef<HTMLInputElement>(null)


const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
  setValue(e.target.value)
}
const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> = (e)=>{
  if(e.key === 'Enter')  addTodo()
}


const addTodo = () =>{
  if(value){
  setTodos([...todos,{
    id: Date.now(),
    title:value,
    complete: false,
  }])
  setValue('')}
}

const removeTodo = (id:number):void=>{
  setTodos(todos.filter(item =>item.id  !== id))
}
const toggleTodo= (id:number):void=>{
setTodos(todos.map(todo =>{
  if(todo.id !== id) return todo
  
   return{
    ...todo,
    complete: !todo.complete
  }
} ))
}

useEffect(()=>{
  if(inputRef.current){
inputRef.current.focus()}
},)

  return (
    <div>
      <div>
        <input 
        value={value}
        onChange = {(e)=> handleChange(e)}
        onKeyDown={(e)=> handleKeyDown(e)}
        ref={inputRef}
        />
        <button 
        onClick={addTodo}>Добавить</button>
      </div>
<TodoList 
removeTodo={removeTodo}
toggleTodo={toggleTodo}
items={todos} />
    </div>
  )
}

export  {App}