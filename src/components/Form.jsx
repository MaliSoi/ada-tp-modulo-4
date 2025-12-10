import {useState} from "react";
import { Button, VStack, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";



const Form = ({addTodo}) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim()) {
      setError("La tarea no puede estar vacía");
      return;
    }

    setError("");
    addTodo(text);
    setText("");
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={3} w="100%">
            
            <FormControl isInvalid={!!error} W="100%">
            <VStack spacing={1} align="start" w="100%">
            <Input
            placeholder="Agregar una nueva tarea..."
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            _focus={{ borderColor: "black", boxShadow: "none" }}
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                if (error) setError(""); // limpiar error al escribir
          }}
          />
            
            <FormErrorMessage minH="20px">
            {error}
            </FormErrorMessage>
            
            </VStack>
            </FormControl>

            <Button type="submit" colorScheme="blue" size="md" px={8} py={3} >
            Agregar Tarea
            </Button>
             
            </VStack>

    );
};

export default Form;