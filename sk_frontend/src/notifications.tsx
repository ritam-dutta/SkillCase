import "./App.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/header";
// import Loader from "./components/loader";
import { Bell, CheckCircle, Key, Trash2 } from "lucide-react";
import { useSocket } from "./context/socket";
import { useNotification } from "./context/notifications";

interface Notification {
    message: string;
    markAsRead: boolean;
    sender: string;
    receiver: string;
    type: string;
    senderRole: string;
}
interface Notifications {}
const Notifications: React.FC<Notifications> = ({}) => {
    // const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const socket = useSocket();
    const { notifications, setNotifications} = useNotification();
    // const {unreadNotifications, setUnreadNotifications} = useNotification();
    // const [messages, setMessages] = useState([]);
    // const [markAsReads, setMarkAsReads] = useState(false);
    // const [senders, setSenders] = useState([]);
    // const [receivers, setReceivers] = useState([]);
    // const [types, setTypes] = useState([]);
    // const [isConnected, setIsConnected] = useState(false);
    // const [isRejected, setIsRejected] = useState(false);
    const navigate = useNavigate();
    // const currentRole = window.location.href.includes("client") ? "client" : "freelancer";
    const loggedRole = localStorage.getItem("role");
    const loggedUsername = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");


    // useEffect(() => {
    //     socket?.on("notification", (notification : Notification) => {
    //         console.log("Notification Received", notification);
    //         setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    //     });
    // }, [socket]);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/${loggedRole}/get_notifications/${loggedUsername}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        // role: loggedRole,
                    }
                });
                const fetchedNotifications = response.data.data.notifications;
                setNotifications(fetchedNotifications);
                let message: string[] = fetchedNotifications.map((notif: Notification) => notif.message);
                let markAsRead: boolean[] = fetchedNotifications.map((notif: Notification) => notif.markAsRead);
                let sender: string[] = fetchedNotifications.map((notif: Notification) => notif.sender);
                let receiver = fetchedNotifications.map((notif: Notification) => notif.receiver);
                let type = fetchedNotifications.map((notif: Notification) => notif.type);
                // setMessages(message);
                // setMarkAsReads(markAsRead);
                // setSenders(sender);
                // setReceivers(receiver);
                // setTypes(type);
            } catch (error) {
                console.error("Fetch Notifications Error:", error);
            }
            setLoading(false);
        };
        fetchNotifications();
    }, [loggedUsername, navigate]);
    // console.log("notifications",notifications)
    
    const handleConnect = async (username:String, role:string) => {
        
        try {
            setNotifications(notifications.filter((notif) => notif.sender !== username || notif.type !== "connection_request"));
            socket?.emit("accept connection", {
                accessToken: accessToken,
                info:{
                    sender: loggedUsername,
                    receiver: username,
                    senderRole: loggedRole,
                    receiverRole: role,
                }
            });
            // const response1 = await axios.post(`http://localhost:8000/api/v1/${loggedRole}/connect/${loggedUsername}`, {
            //     username: username,
            //     connectorRole: role,
            // }, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // });
            // setIsConnected(true);
            // const response2 = await axios.post(`http://localhost:8000/api/v1/${loggedRole}/delete_notification/${loggedUsername}`, {
            //     username: loggedUsername,
            //     type: "connection_request",
            // }, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // });
    
        } catch (error) {
            console.error("Connect Error:", error);
        }
    }

    const handleReject = async ( username:string, type:string) => {
        try {
            setNotifications(notifications.filter((notif) => notif.sender !== username  || notif.type !== type));
            // console.log(username,type)
            socket?.emit("reject connection", {
                accessToken: accessToken,
                info:{
                    receiver: loggedUsername,
                    sender: username,
                    receiverRole: loggedRole,
                    // receiverRole: role,
                }
            });
            // const response = await axios.post(`http://localhost:8000/api/v1/${loggedRole}/delete_notification/${loggedUsername}`, {
            //     username: username,
            //     type: type,
            // }, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // });  
            // setIsRejected(true);
            // console.log("Disconnect Response:", response.data);
        } catch (error) {
            console.error("Delete notification Error:", error);
        }
    }
    // console.log("notis", notifications)

    // const notifications =[
    //     {
    //       "_id": "1",
    //       "recipient": "john_doe",
    //       "message": "Alice started following you.",
    //       "type": "follow",
    //       "read": false,
    //       "createdAt": "2025-01-30T10:00:00Z"
    //     },
    //     {
    //       "_id": "2",
    //       "recipient": "john_doe",
    //       "message": "Your project 'Website Design' received a new proposal from Mark.",
    //       "type": "proposal",
    //       "read": false,
    //       "createdAt": "2025-01-30T09:45:00Z"
    //     },
    //     {
    //       "_id": "3",
    //       "recipient": "john_doe",
    //       "message": "Sarah sent you a new message.",
    //       "type": "message",
    //       "read": true,
    //       "createdAt": "2025-01-30T09:30:00Z"
    //     },
    //     {
    //       "_id": "4",
    //       "recipient": "john_doe",
    //       "message": "Your proposal for 'Logo Design' was accepted!",
    //       "type": "proposal_accepted",
    //       "read": false,
    //       "createdAt": "2025-01-30T09:00:00Z"
    //     },
    //     {
    //       "_id": "5",
    //       "recipient": "john_doe",
    //       "message": "Your payment for 'Mobile App Development' has been processed.",
    //       "type": "payment",
    //       "read": true,
    //       "createdAt": "2025-01-29T15:30:00Z"
    //     }
    //   ]
    //   setNotifications(arr);
      
    return (
        <div className="min-h-screen w-full bg-gray-100">
            <Header/>
            <div className="h-[14vh] w-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-start px-8">
                <h2 className="text-2xl text-white font-bold mb-4 flex items-center mt-6">
                {/* <Bell className="mr-2 text-white" /> */}
                 Notifications
                </h2>
            </div>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-[-8vh]">
            <h1 className="text-xl font-bold">New notifications</h1>
          {loading ? (
            <p className="text-gray-600">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-600">No new notifications</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif,index) => (
                <div key={index}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 shadow-sm 
                    ${notif.markAsRead ? "bg-gray-100" : "bg-blue-100"}`}
                >
                  <div className="flex gap-4">
                    <Link to={`/${notif.senderRole}/profile/${notif.sender}`} className="text-sm font-medium">@{notif.sender}</Link><p className="text-sm font-medium">{notif.message}</p>
                    {/* <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p> */}
                  </div>
                  <div className="flex space-x-3">
                    {(notif.type === "follow_request" || notif.type === "connection_request") && !notif.markAsRead ? (
                        <div className="flex gap-4 w-full">
                            
                        <button
                            onClick={() => {handleConnect(notif.sender, notif.senderRole)}}
                            className={" bg-blue-500 text-white text-center px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition"}>
                                {"Accept"}
                        </button>

                        <button
                            onClick={() => {handleReject(notif.sender, notif.type)}}
                            className=" bg-gray-200 text-blue-950 text-center px-3 py-1  rounded-lg shadow-md">
                                {"Reject"}
                        </button>

                        </div>
                    )
                    :(
                        <div>
                        <button
                            // onClick={() => setMarkAsRead(true)}
                            className="text-green-500 hover:text-green-700"
                        >
                            <CheckCircle size={18} />
                        </button>
                        <button
                        //   onClick={() => deleteNotification(notif._id)}
                        className="text-red-500 hover:text-red-700"
                        >
                        <Trash2 size={18} />
                        </button>
                        </div>)
                        
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
}

export default Notifications;