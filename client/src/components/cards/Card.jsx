import { useState } from "react"
import "./card.css"

const Card = ({ username, socket, user }) => {

    const [grade, setGrade] = useState("")
    const [cal, setCal] = useState(-1)
    const handleGrade = (grade) => {
        const parsedGrade = parseInt(grade);
        if (!isNaN(parsedGrade)) {
            setCal(parsedGrade);
            socket.emit("sendNotification", {
                senderName: user,
                receiverName: username,
                receiverRol: "Student",
                text: "te califico"
            })
        }
    }

    const reload = () =>{
        setCal(-1)
    }


    return (
        <div className="inter">
            <div className="Alumno">
                <h2>{username}</h2>
            </div>
            {cal !== -1 ? (
                <>
                    <div className="cal">{cal}</div>
                    <button className="termi" onClick={reload}>Cancelar</button>
                </>
            ) : (
                <>
                    
                    <input type="number" className="calific" placeholder="Calificacion" onChange={(e) => setGrade(e.target.value)} />
                    <button className="termi" onClick={()=>handleGrade(grade)}>Enviar</button>
                </>
            )
            }

        </div >
    )
}

export default Card