
import { useEffect, useState } from "react";
import { VStack, Box } from "@chakra-ui/react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
  const [todos, setTodos] = useState([]);

  //Filter
  const[filter, setFilter] = useState("all");

  //cargar desde localstorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  //guardar cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  //agregar tarea
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed:false,
    };
    setTodos([...todos, newTodo]);
  };

  //completar tarea
  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
      t.id === id ? {...t, completed: !t.completed } : t
    )
  );
  };

  //eliminar tarea

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !==id));
  };
  
  //editar tarea
  const editTodo = (id) => {
    const newText = prompt("Nuevo texto:");
    if(!newText?.trim())return;
    setTodos(
      todos.map((t) =>
      t.id === id ? {...t, text: newText } : t
    )
    );
  };

  const filteredTodos = todos.filter((t) => {
    if(filter === "completed") return t.completed;
    if(filter === "pending")return !t.completed;
    return true;
  });

  return (
    <Box maxW="400px" mx="auto" mt="50px" p={4}>
      <VStack spacing={6}>
        <Form addTodo={addTodo}/>
        
        
        <select value={filter} onChange={(e) => setFilter (e.target.value)}>
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
        </select>

        <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        />
        
    </VStack>
    </Box>
   
  );
}

  


export default App;

