import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

function TodoAll() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [updateId, setUpdateId] = useState(null); // Track the ID of the todo being updated
  const [loading, setLoading] = useState(false);
  const [singleTodo, setSingleTodo] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => setData(data.todos))
      .then(() => {
        setLoading(false);
        let table = new DataTable('#myTable');
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (updateId) {
      // Update existing todo
      fetch(`https://dummyjson.com/todos/${updateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: input }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          const updatedData = data.map((item) =>
            item.id === updatedTodo.id ? updatedTodo : item
          );
          setData(updatedData);
          setInput("");
          setUpdateId(null); // Reset the updateId after updating
          Swal.fire({
            icon: 'success',
            title: 'Todo Updated',
            text: 'The todo has been successfully updated.',
          });
          let table = new DataTable('#myTable');
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while updating the todo.',
          });
        })
        .finally(() => setLoading(false));
    } else {
      // Add new todo
      fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: input,
          completed: false,
          id: data.length + 1,
          userId: data.length + 1,
        }),
      })
        .then((res) => res.json())
        .then((todoData) => {
          const copy = [...data];
          copy.push(todoData);
          setData(copy);
          setInput("");
          Swal.fire({
            icon: 'success',
            title: 'Todo Added',
            text: 'The todo has been successfully added to the table.',
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while adding the todo.',
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        Swal.fire({
          icon: 'success',
          title: 'Todo Deleted',
          text: 'The todo has been successfully deleted from the table.',
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while deleting the todo.',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleUpdate = (id) => {
    const todoToUpdate = data.find((item) => item.id === id);
    setInput(todoToUpdate.todo);
    setUpdateId(id);
  };

  const handleRandom = () => {
    setLoading(true);
    fetch("https://dummyjson.com/todos/random")
      .then((res) => res.json())
      .then((randomTodo) => {
        const copy = [...data];
        copy.push(randomTodo);
        setData(copy);
        Swal.fire({
          icon: 'success',
          title: 'Random Todo Added',
          text: 'A random todo has been successfully added to the table.',
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while adding the random todo.',
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchSingleTodo = () => {
    setLoading(true);
    fetch("https://dummyjson.com/todos/1")
      .then((res) => res.json())
      .then((todo) => {
        setSingleTodo(todo);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while fetching the single todo.',
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className='container my-5'>
        <section>
          <div className="row">
            <table className="table table-borderless table-hover" id='myTable'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Todo</th>
                  <th scope="col">Completed</th>
                  <th scope="col">UserId</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.id === updateId ? <input type="text" onChange={handleChange} value={input} /> : item.todo}</td>
                    <td>{item.completed.toString()}</td>
                    <td>{item.userId}</td>
                    <td>
                      {item.id === updateId ? (
                        <>
                          <button onClick={handleSubmit}>Save</button>
                          <button onClick={() => setUpdateId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <div className='d-flex'>
                            <button className='btn btn-primary btn-sm m-1' onClick={() => handleUpdate(item.id)}>Update</button>
                            <button className='btn btn-danger btn-sm m-1' onClick={() => handleDelete(item.id)}>Delete</button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!updateId && (
              <>
                <div className="input-group mb-3 m-5">
                  <button className='btn btn-primary' style={{ width: "20%" }} onClick={handleSubmit} type="button" id="button-addon1">Add</button>
                  <input type="text" onChange={handleChange} value={input} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                </div>
                <div className='d-flex'>
                  <button className='btn btn-primary m-5' onClick={handleRandom}>Add Random</button>
                  <button className='btn btn-primary m-5' onClick={fetchSingleTodo}>Get Single Todo</button>
                </div>
                
                {Object.keys(singleTodo).length > 0 && (
                  <table className="table table-borderless table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Todo</th>
                        <th scope="col">Completed</th>
                        <th scope="col">UserId</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{singleTodo.id}</td>
                        <td>{singleTodo.todo}</td>
                        <td>{singleTodo.completed.toString()}</td>
                        <td>{singleTodo.userId}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default TodoAll;
