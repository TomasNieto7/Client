import { useEffect, useState} from "react";
import "./App.css"
import NavUser from "./components/navUser/NavUser"
import Menu from "./components/menu/Menu"
import MenuProfe from "./components/menuProfe/MenuProfe"
import { validateLogin } from "./functions";
import { io } from "socket.io-client";

const App = () => {

  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState({
    userName: "",
    password: 0
  })
  const [socket, setSocket] = useState(null)
  const rol = validateLogin(user.userName, user.password)

  useEffect(() => {
    // Crear el socket solo una vez durante el montaje inicial
    setSocket(io("http://localhost:5000"))
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user.userName, rol)
  }, [socket, user.userName, rol])

  return (
    <main>
      {rol === "Teacher" ? (
        <>
          <NavUser user={user.userName} socket={socket} />
          <MenuProfe user={user.userName} socket={socket} />
        </>
      ) : rol === "Student" ? (
        <>
          <NavUser user={user.userName} socket={socket} />
          <Menu user={user.userName} socket={socket} />
        </>
      ) : (
        <div className="container">
          <div className="login">
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => setUser({ ...user, userName: username, password: parseInt(password) })}>Login</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App;