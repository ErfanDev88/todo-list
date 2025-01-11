import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [todo, setTodos] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://retoolapi.dev/TB4cUs/TodoApi"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const changeInputValue = (e) => {
    setTodos(e.target.value);
  };

  const currentDate = new Date();
  const date = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const handleAddAndUpdateTodo = async () => {
    if (editIndex !== null) {
      const updatedTodo = {
        ...data[editIndex],
        todo,
        date: date + "(edited)", // Update the Todos field
      };
      try {
        await axios.put(
          `https://retoolapi.dev/TB4cUs/TodoApi/${data[editIndex].id}`,
          updatedTodo
        ); // Make PUT request
        const newData = data.map((item, index) =>
          index === editIndex ? updatedTodo : item
        );
        setData(newData);
        setEditIndex(null);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      if (todo !== "") {
        try {
          const response = await axios.post(
            "https://retoolapi.dev/TB4cUs/TodoApi",
            {
              todo,
              date,
            }
          );
          console.log("Success", response.data);
          setData([...data, response.data]); // Add the new todo to the state
        } catch (error) {
          console.log(error);
        }
      }
    }
    setTodos("");
  };

  const handleEditIndex = (index) => {
    setEditIndex(index);
    setTodos(data[index].todo); // Set the input value to the current todo text
  };

  const handleDeleteTodo = async (id) => {
    console.log("Deleting todo with ID:", id); // اضافه کردن لاگ
    try {
      await axios.delete(`https://retoolapi.dev/TB4cUs/TodoApi/${id}`); // Make DELETE request
      const newTodo = data.filter((item) => item.id !== id); // Update local state
      setData(newTodo);
    } catch (error) {
      console.error(
        "Error deleting todo:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section className="container">
      <div className="header">
        <h1>Add your Todos</h1>
        <div className="addNote">
          <input
            type="text"
            onChange={changeInputValue}
            value={todo}
            placeholder="Go to the gym..."
          />
          <button className="addBtn" onClick={handleAddAndUpdateTodo}>
            {editIndex !== null ? "Edit" : "Add"}
          </button>
        </div>
      </div>

      <div className="noteContainer">
        {data.length < 1 ? (
          ""
        ) : (
          <span className="noteNumbers">{data.length}</span>
        )}
        {data.map((item) => (
          <div className="note" key={item.id}>
            <div className="header">
              <h1>{item.todo}</h1>
              <span>{item.date}</span>
            </div>
            <div className="btnContainer">
              <button onClick={() => handleEditIndex(data.indexOf(item))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,300,150"
                >
                  <g
                    fill="#ebebeb"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                  >
                    <g transform="scale(5.33333,5.33333)">
                      <path d="M36,5.00977c-1.7947,0 -3.58921,0.68037 -4.94922,2.04102l-22.13477,22.13281c-0.41998,0.41998 -0.72756,0.94226 -0.89062,1.51563l-2.9668,10.38867c-0.14899,0.52347 -0.00278,1.08658 0.38208,1.47144c0.38485,0.38485 0.94796,0.53107 1.47144,0.38208l10.39062,-2.9668c0.00065,-0.00065 0.0013,-0.0013 0.00195,-0.00195c0.56952,-0.16372 1.09052,-0.46748 1.51172,-0.88867l22.13281,-22.13476c2.72113,-2.72112 2.72113,-7.17731 0,-9.89844c-1.36001,-1.36064 -3.15452,-2.04102 -4.94922,-2.04102zM36,7.99219c1.0208,0 2.04018,0.39333 2.82617,1.17969c0.00065,0 0.0013,0 0.00195,0c1.57487,1.57488 1.57487,4.08137 0,5.65625l-1.93945,1.93945l-5.65625,-5.65625l1.93945,-1.93945c0.78599,-0.78636 1.80732,-1.17969 2.82813,-1.17969zM29.11133,13.23242l5.65625,5.65625l-18.07422,18.07422c-0.05863,0.05823 -0.13289,0.10283 -0.2168,0.12695l-7.79297,2.22656l2.22656,-7.79492c0,-0.00065 0,-0.0013 0,-0.00195c0.02293,-0.08063 0.06493,-0.15282 0.12695,-0.21484z"></path>
                    </g>
                  </g>
                </svg>
              </button>
              <button onClick={() => handleDeleteTodo(item.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,300,150"
                >
                  <g
                    fill="#ebebeb"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                  >
                    <g transform="scale(10.66667,10.66667)">
                      <path d="M10,2l-1,1h-6v2h1.10938l1.7832,15.25586v0.00781c0.13102,0.98666 0.98774,1.73633 1.98242,1.73633h8.24805c0.99468,0 1.8514,-0.74968 1.98242,-1.73633l0.00195,-0.00781l1.7832,-15.25586h1.10938v-2h-6l-1,-1zM6.125,5h11.75l-1.75195,15h-8.24805z"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
