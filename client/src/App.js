// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [items, setItems] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/items")
//       .then((response) => setItems(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const addItem = () => {
//     axios
//       .post("http://localhost:3001/api/items/add", { name, description })
//       .then((response) => {
//         console.log(response.data);
//         setItems([...items, { name, description }]);
//       })
//       .catch((error) => console.error("Error adding item:", error));
//   };

//   const deleteItem = (id) => {
//     axios
//       .delete(`http://localhost:3001/api/items/${id}`)
//       .then((response) => {
//         console.log(response.data);
//         setItems(items.filter((item) => item._id !== id));
//       })
//       .catch((error) => console.error("Error deleting item:", error));
//   };

//   return (
//     <div>
//       <h1>CRUD App</h1>
//       <ul>
//         {items.map((item) => (
//           <li key={item._id}>
//             {item.name} - {item.description}
//             <button onClick={() => deleteItem(item._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h2>Add Item</h2>
//         <label>Name: </label>
//         <input type="text" onChange={(e) => setName(e.target.value)} />
//         <br />
//         <label>Description: </label>
//         <input type="text" onChange={(e) => setDescription(e.target.value)} />
//         <br />
//         <button onClick={addItem}>Add Item</button>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [items]); // Update the effect dependency to trigger when items change

  const addItem = () => {
    axios
      .post("http://localhost:3001/api/items/add", { name, description })
      .then((response) => {
        console.log(response.data);
        setItems((prevItems) => [...prevItems, response.data]);
        // Clear the input fields
        setName("");
        setDescription("");
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:3001/api/items/${id}`)
      .then((response) => {
        console.log(response.data);
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const updateItem = (id) => {
    const updatedItem = {
      name: prompt("Enter new name:", name),
      description: prompt("Enter new description:", description),
    };

    axios
      .post(`http://localhost:3001/api/items/update/${id}`, updatedItem)
      .then((response) => {
        console.log(response.data);
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, ...response.data } : item
          )
        );
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  // const addItem = () => {
  //   axios
  //     .post("http://localhost:3001/api/items/add", { name, description })
  //     .then((response) => {
  //       console.log(response.data);
  //       setItems([...items, { name, description }]);
  //     })
  //     .catch((error) => console.error("Error adding item:", error));
  // };

  // const deleteItem = (id) => {
  //   axios
  //     .delete(`http://localhost:3001/api/items/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setItems(items.filter((item) => item._id !== id));
  //     })
  //     .catch((error) => console.error("Error deleting item:", error));
  // };

  // const updateItem = (id) => {
  //   const updatedItem = {
  //     name: prompt("Enter new name:", name),
  //     description: prompt("Enter new description:", description),
  //   };

  //   axios
  //     .post(`http://localhost:3001/api/items/update/${id}`, updatedItem)
  //     .then((response) => {
  //       console.log(response.data);
  //       const updatedItems = items.map((item) =>
  //         item._id === id ? response.data : item
  //       );
  //       setItems(updatedItems);
  //     })
  //     .catch((error) => console.error("Error updating item:", error));
  // };

  return (
    <div className="app-container">
      <h1 className="app-header">CRUD App</h1>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item._id} className="list-item">
            <div className="item-info">
              <strong>{item.name}</strong> - {item.description}
            </div>
            <div className="item-actions">
              <button
                onClick={() => deleteItem(item._id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => updateItem(item._id)}
                className="update-button"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-item-container">
        <h2 className="add-item-header">Add Item</h2>
        <label className="input-label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <br />
        <label className="input-label">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <br />
        <button onClick={addItem} className="add-button">
          Add Item
        </button>
      </div>
    </div>
  );
}

export default App;
