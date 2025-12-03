import { VStack } from "@chakra-ui/react"

const TodoList = ({ todos, toggleComplete, editTodo, deleteTodo}) => {
    return (
        <VStack spacing={3} w="100%">
            {todos.map((todo) => (
                <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                />
            ))}
        </VStack>
    );
};

export default TodoList;