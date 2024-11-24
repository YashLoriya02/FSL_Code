import { useState } from "react";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const getInfo = async () => {
    try {
      const res = await fetch("http://localhost:5001", { method: "GET" });
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="btn">
        <h1>Click to get User Info : </h1>
        {!user ? (
          <button onClick={() => getInfo()}>Get Info</button>
        ) : (
          <button onClick={() => setUser(null)}>Clear Info</button>
        )}
      </div>
      {user && (
        <div className="main">
          <p>Name : {user.name}</p>
          <p>Email : {user.email}</p>
          <p>Age : {user.age}</p>
        </div>
      )}
    </>
  );
};

export default App;
