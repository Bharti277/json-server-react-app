import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
  }, []);

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
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl text-center">User Management</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center p-6"
        >
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
              className="border p-2 rounded-md"
              placeholder="Enter Note"
              required
            />
            <input
              type="number"
              value={age}
              min={0}
              onChange={(e) => setAge(e.target.value)}
              name="age"
              className="border p-2 rounded-md"
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
              className="border p-2 rounded-md"
              placeholder="Enter Email"
              required
            />
            <button
              type="submit"
              className="font-bold bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            >
              Add New Note
            </button>
          </div>
        </form>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 cursor-pointer">
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>Edit</td>
                <td
                  onClick={() => handleDelete(user.id)}
                  className="hover:text-red-400"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
