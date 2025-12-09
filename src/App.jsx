
import { useEffect, useState } from "react";
import { VStack, Box, Select} from "@chakra-ui/react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
  const [todos, setTodos] = useState([]);

  //Filter
  const[filter, setFilter] = useState(() => {
  // cargamos el filter desde localStorage si existe
    const storedFilter = localStorage.getItem("filter");
    return storedFilter ? storedFilter : "all";
  });

//cargar desde localstorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // guardar todos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  // guardar filter en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  //agregar tarea
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed:false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  //completar tarea
  const toggleComplete = (id) => {
    setTodos ((prev) =>
      prev.map((t) => (t.id === id ? {...t, completed: !t.completed } : t))
  );
  };

  //eliminar tarea
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !==id));
  };
  
  //editar tarea
  const editTodo = (id, newText) => {
    if(!newText || !newText.trim()) return;

    setTodos((prev) =>
      prev.map((t) =>
      t.id === id ? {...t, text: newText.trim() } : t
    )
    );
  };

  //aplicar filtro
  const filteredTodos = todos.filter((t) => {
    if(filter === "completed") return t.completed;
    if(filter === "pending")return !t.completed;
    return true;
  });

  return (
    <Box maxW="400px" mx="auto" mt="50px" p={4}>
      <VStack spacing={6} w="100%">
        <Form addTodo={addTodo}/>
        
        {/* SELECT DEL FILTRO */}
        <Select 
        value={filter} 
        onChange={(e) => setFilter (e.target.value)}
        maxW="220px"
        aria-label="Fitrar tareas"
        >
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
        </Select>

        <TodoList 
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        />

    </VStack>
    </Box>
   
  );
}

  


export default App;

