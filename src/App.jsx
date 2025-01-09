import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddAndUpdateTodo = () => {
    if (editIndex !== null) {

      const updatedTodo = todo.map((item, index) => {
        return index === editIndex ? inputValue : item;
      });
      setTodo(updatedTodo);
      setEditIndex(null);

    } else {

      if (inputValue != "") {
        setTodo([...todo, inputValue]);
      }
      
    }
    setInputValue("");
  };

  const handleEditIndex = (index) => {
    setEditIndex(index);
    setInputValue(todo[index]);
  }

  const handleDeleteTodo = (index) => {
    const newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);
  };

  return (
    <section className="container">
      <div className="header">
        <h1>Add your Notes</h1>
        <div className="addNote">
          <input
            type="text"
            onChange={changeInputValue}
            value={inputValue}
            placeholder="Go to the gym..."
          />
          <button className="addBtn" onClick={handleAddAndUpdateTodo}>
            {editIndex !== null ? "Edit" : "Add"}
          </button>
        </div>
      </div>

      <div className="noteContainer">
        {todo.length < 1 ? (
          ""
        ) : (
          <span className="noteNumbers">{todo.length}</span>
        )}
        {todo.map((todo, index) => (
          <div className="note" key={index}>
            <h1>{todo}</h1>
            <div className="btnContainer">
              <button onClick={() => handleEditIndex(index)}>edit</button>
              <button onClick={() => handleDeleteTodo(index)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
