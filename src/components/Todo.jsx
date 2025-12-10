import { HStack, Text, IconButton } from "@chakra-ui/react";
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

const Todo = ({ todo, toggleComplete, onEdit, confirmDelete }) => {
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
  size="sm"
  colorScheme="green"
  variant="solid"
  borderRadius="full"
  onClick={() => toggleComplete(todo.id)}
/>

<IconButton
  icon={<EditIcon />}
  size="sm"
  colorScheme="yellow"
  variant="solid"
  borderRadius="full"
  onClick={() => onEdit(todo)}
/>

<IconButton
  icon={<DeleteIcon />}
  size="sm"
  colorScheme="red"
  variant="solid"
  borderRadius="full"
  onClick={() => confirmDelete(todo)}
/>
      </HStack>
    </HStack>
  );
};

export default Todo;
