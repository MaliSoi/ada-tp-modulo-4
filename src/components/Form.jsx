import {useState} from "react";
import { Button, VStack, Input, FormControl, FormErrorMessage, Text } from "@chakra-ui/react";



const Form = ({addTodo}) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input.trim()) {
      setError("La tarea no puede estar vacía");
      return;
    }

    setError("");
    addTodo(input);
    setInput("");
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={3} w="100%">
            
            <FormControl isInvalid={!!error} W="100%">
            <VStack spacing={1} align="start" w="100%">
            <Input
            placeholder="Nueva Tarea"
            value={input}
            onChange={(e) => {
                setInput(e.target.value);
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