import { useEffect, useState } from "react"
import "./navUser.css"
import Notification from "../../img/notification.jpg"

const NavUser = ({ user, socket }) => {

    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.on("getNotification", data => {
            setNotifications((prev) => [...prev, data])
        })
    }, [socket])

    console.log(notifications);

    const displayNotifications = ({ senderName, text }) => {
        return (
            <span className="notification">{`${senderName} ${text}`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([])
        setOpen(false)
    }

    return (
        <div className="username">
            <div className="barra">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} className="icoImg" alt="" />
                    {notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div>
                    El usurario es: {user}
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n, index) => (
                        <div className="notification" key={index}>{displayNotifications(n)}</div>
                    ))}
                    <button className="nButton" onClick={handleRead}>Mark as read</button>
                </div>
            )}
        </div>
    )
}

export default NavUser