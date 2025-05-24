import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      age,
      email,
    };
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setData([...data, user]);
        setName("");
        setAge(0);
        setEmail("");
      });
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((user) => user.id !== id);
    fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setData(filteredData);
      });
  };
  return (
    <>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              placeholder="Enter Note"
              required
            />
            <input
              type="number"
              value={age}
              min={0}
              onChange={(e) => setAge(e.target.value)}
              name="age"
              id="age"
              placeholder="Enter Age"
              required
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              placeholder="Enter Email"
              required
            />
            <button>Add New Note</button>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>Edit</td>
                <td onClick={() => handleDelete(user.id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
