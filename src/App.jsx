import { useEffect, useState } from "react";
import { VStack, Box, Select, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from "@chakra-ui/react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

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

  // editar tarea (limpia)
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

  return (
    <Box maxW="400px" mx="auto" mt="50px" p={4}>
      <VStack spacing={6} w="100%">
        <Form addTodo={addTodo} />

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="220px"
          aria-label="Filtrar tareas"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </Select>

        <TodoList
          todos={filteredTodos}           // <- pasar los filtrados
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          onEdit={onEdit}                 // <- pasar onEdit para abrir modal
        />

        {/* Modal de edición en App */}
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
      </VStack>
    </Box>
  );
}

export default App;

