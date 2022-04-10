import { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      console.log(newItem);

      setList([...list, newItem]);
      setName("");
    }
  };

  const clearList = () => {
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const spacificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(spacificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <p>TODO LIST</p>
          <div className="input">
            <input
              type="text"
              placeholder="Please input a items"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button>{isEditing ? "Edit" : "Submit"}</button>
          </div>
        </form>
      </header>

      <main className="main-list">
        {list.map((item) => {
          const { id, title } = item;
          return (
            <article key={id} className="container">
              <p>{title}</p>
              <div
                className="btn-container"
                style={{ display: "flex", alignItems: "center" }}
              >
                <button className="btn-edit" onClick={() => editItem(id)}>
                  <FaEdit />
                </button>
                <button className="btn-delete" onClick={() => removeItem(id)}>
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
      </main>

      {list.length > 0 && (
        <footer>
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
