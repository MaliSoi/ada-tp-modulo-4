import { VStack } from "@chakra-ui/react";
import Todo from "./Todo";


const TodoList = ({ todos, toggleComplete, editTodo, deleteTodo, onEdit, confirmDelete }) => {
    return (
        <VStack spacing={3} w="100%">
            {todos.map((todo) => (
               <Todo
                 key={todo.id}
                 todo={todo}
                 toggleComplete={toggleComplete}
                 editTodo={editTodo}
                 deleteTodo={deleteTodo}
                 onEdit={onEdit}
                 confirmDelete={confirmDelete}
                 />
    ))}
        </VStack>
    );
};

export default TodoList;