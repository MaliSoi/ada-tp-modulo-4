import {useState} from "react";
import { Button, HStack, Input } from "@chakra-ui/react";


const Form = ({addTodo}) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        addTodo(input);
        setInput("");
    };

    return (
        <HStack as="form" onSubmit={handleSubmit} spacing={3}>
            <Input
            placeholder="Nueva Tarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" colorScheme="blue">
                Agregar Tarea
            </Button>
        </HStack>

    );
};

export default Form;