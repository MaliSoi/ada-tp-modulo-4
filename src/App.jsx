import { useEffect, useState } from "react";
import {
  VStack, Box, Select, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Button, Input, Text
} from "@chakra-ui/react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { EditIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";


function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // modal / edición
  const [isOpen, setIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editText, setEditText] = useState("");

  // cargar desde localstorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // guardar cada vez que cambia el estado
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // agregar tarea
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // completar tarea
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // eliminar tarea
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // editar tarea
  const editTodo = (id, newText) => {
    if (!newText || !newText.trim()) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t))
    );
  };

  // Filtrado
  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  // abrir modal desde Todo
  const onEdit = (todo) => {
    setCurrentTodo(todo);
    setEditText(todo?.text ?? "");
    setIsOpen(true);
  };

  // guardar cambios desde modal
  const saveEdit = () => {
    if (!currentTodo) return;
    editTodo(currentTodo.id, editText);
    setIsOpen(false);
    setCurrentTodo(null);
    setEditText("");
  };

  //para abrir modal de confirmacion
  const confirmDelete = (todo) => {
  setTodoToDelete(todo);
  setIsDeleteOpen(true);
};

//funcion que borra
const handleDelete = () => {
  if (!todoToDelete) return;
  deleteTodo(todoToDelete.id);
  setIsDeleteOpen(false);
  setTodoToDelete(null);
};

  return (
    <Box maxW="600px" mx="auto" mt="50px" p={6} bg="white" borderRadius="lg" boxShadow="sm">
      
     <Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center">
     Mis tareas
     </Text>

     <Text fontSize="sm" color="gray.500" mb={6} textAlign="center">
     Simple. Limpio. Al punto.
     </Text>

      <VStack spacing={6} w="100%">
        <Form addTodo={addTodo} />

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="220px"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </Select>

        <Divider />

        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          onEdit={onEdit}
          confirmDelete={confirmDelete}
        />

        {/* Modal de edición */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
         <ModalOverlay />
         <ModalContent>
         <ModalHeader>Editar tarea</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
          <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Editar tarea..."
                autoFocus
         />
        </ModalBody>
        <ModalFooter>
        <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
        Cancelar
        </Button>
        <Button colorScheme="blue" onClick={saveEdit}>
        Guardar
        </Button>
        </ModalFooter>
        </ModalContent>
        </Modal>
   
        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Eliminar tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        ¿Seguro que querés eliminar esta tarea?
        <br />
        <strong>{todoToDelete?.text}</strong>
        </ModalBody>

        <ModalFooter>
        <Button variant="ghost" mr={3} onClick={() => setIsDeleteOpen(false)}>
         Cancelar
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
        Eliminar
        </Button>
        </ModalFooter>
        </ModalContent>
        </Modal>


      </VStack>
    </Box>
  );
}

export default App;
