import { useState } from "react"
import "./menu.css"

const Menu = ({user, socket}) => {
    const [marcar, setMarcar] = useState(false)
    const handleMarcar = () => {
        setMarcar(!marcar)
        socket.emit("sendNotification", {
            senderName: user,
            receiverName: "Juan",
            receiverRol: "Teacher",
            text: "termino"
        })
    }

    return (
        <div className="menuCal">
            <div className="curso">
                <h2>Curso 1</h2>
                <h3>Juan</h3>
            </div>
            <div className="interMenu">
                {marcar ? (
                    <button className="termiMenu" onClick={()=>setMarcar(!marcar)}>Cancelar</button>
                )
                : (
                    <button className="termiMenu" onClick={handleMarcar}>Marcar como completado</button>
                )}
            </div>
        </div>
    )
}

export default Menu