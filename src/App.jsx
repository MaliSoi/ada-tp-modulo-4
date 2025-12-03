import Form from "./components/Form";

function App() {
 const addTodo = (text) => console.log("Agregar", text);
 return(
  <div style={{ padding:"2rem"}}>
    <Form addTodo={addTodo}/>
  </div>
 ) ;    
 
}

export default App;

