import React, { useState, useEffect } from "react";
import { useRef } from "react";
import io from "socket.io-client";
import "./Chatpage.css";
import Navbar from "../components/Navbar";
const Chatpage = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    var newSocket = io("http://localhost:9000"); // Replace with your backend URL
    setSocket(newSocket);
    const getReply = async () => {
      await newSocket.on("reply", (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.reply, type: "received" },
        ]);
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
        console.log(data.reply);
      });
    };

    getReply();
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (socket && newMessage.trim() !== "") {
      
      const userInfo = await JSON.parse(localStorage.getItem('userInfo'));
      const userId = userInfo._id; // Replace with actual user ID
      await socket.emit("message", { userId, message: newMessage });
      setNewMessage("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, type: "sent" },
      ]);
    }
    console.log("Scrolling to bottom after receiving a new message");
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-end flex-column align-items-end "
        style={{ height: "700px" }}
      >
        <div
          className="card mt-5 flex-fill d-flex flex-column scrollToBottom"
          ref={chatContainerRef}
        >
          <div className="d-flex flex-row justify-content-between p-3 adiv text-white ">
            <i className="fas fa-chevron-left" />
            <span className="pb-3">Live chat</span>
            <i className="fas fa-times" />
          </div>
          <div className="flex-grow-1 overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className={` d-flex flex-row p-3 message `}>
                {message.type === "received" ? (
                  <>
                    <img
                      src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                      width={30}
                      height={30}
                    />
                    <div className="received ml-2 p-3 ">{message.text}</div>
                  </>
                ) : (
                  <>
                    <div className="sent bg-white bg-white-chat mr-2 p-3 ml-auto ">
                      {message.text}
                    </div>
                    <img
                      src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                      width={30}
                      height={30}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="form-group px-3">
            <form onSubmit={handleSubmit} className="d-flex">
              <input
                type="text"
                className="form-control flex-grow-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit" className="btn btn-primary ml-2">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatpage;
