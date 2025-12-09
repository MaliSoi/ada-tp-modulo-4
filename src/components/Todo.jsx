import { HStack, Text, IconButton } from "@chakra-ui/react";
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

const Todo = ({ todo, toggleComplete, deleteTodo, onEdit }) => {
  return (
    <HStack
      w="100%"
      p={3}
      borderWidth="1px"
      borderRadius="md"
      justifyContent="space-between"
    >
      <Text as={todo.completed ? "s" : undefined}>{todo.text}</Text>

      <HStack spacing={1}>
        <IconButton
          icon={<CheckIcon />}
          colorScheme="green"
          size="sm"
          onClick={() => toggleComplete(todo.id)}
        />

        <IconButton
          icon={<EditIcon />}
          colorScheme="yellow"
          size="sm"
          onClick={() => onEdit(todo)}  
        />

        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
        />
      </HStack>
    </HStack>
  );
};

export default Todo;
