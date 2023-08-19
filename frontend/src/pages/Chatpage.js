import React, { useState, useEffect } from "react";
import { useRef } from "react";
import io from "socket.io-client";
import "./Chatpage.css";
import Navbar from "../components/Navbar";
import ChatImage from "../components/utils/ChatImage";
import axios from "axios";



const Chatpage = () => {
  const [imageInputKey, setImageInputKey] = useState(0); // Key to reset the input
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const handleImageUpload = async (e) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo._id;
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('image',imageFile);
    formData.append('type', 'image')
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const accessToken = userInfo.token;
      const response = await axios.post(
        'http://127.0.0.1:8080/upload', // Replace with your server's upload endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.imageUrl) {
        const imageUrl = response.data.imageUrl;
        // Emit the image message immediately
        let messageData = { userId:userId, message: imageUrl,type:"image" };
        await socket.emit('message', messageData);
        // Update the uploadedImageUrl state
        setUploadedImageUrl(imageUrl);
        // Set imageUploaded to true
        setImageUploaded(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          { imageUrl, type: 'sent' }
        ]);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    if (imageUploaded) {
      console.log("Image has been uploaded:", uploadedImageUrl);
      // Do anything else you need to do after the image has been uploaded
    }
  }, [imageUploaded, uploadedImageUrl]);

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
    if (socket && (newMessage.trim() !== "")) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const userId = userInfo._id;
  
      let messageData = { userId:userId, message: newMessage,type:"text" };
  
     
      // console.log(`Message data is ${messageData.userId} and ${messageData.message} and ${messageData.imageUrl} and ${messageData._id} and ${messageData.createdAt} `)
      await socket.emit('message', messageData);

      setNewMessage('');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, type: "sent" },
      ]);
    }
    console.log("Scrolling to bottom after receiving a new message");
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    setImageInputKey((prevKey) => prevKey + 1);
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
            <div className={` d-flex flex-row p-3 message `}>
              <div>
                <img
                  src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                  width={30}
                  height={30}
                />
                <div className="received ml-2 p-3 ">sample msg</div>
              </div>
            </div>

            {messages.map((message, index) => (
              <>
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
                {message.type === "received" ? (
                <div className="row d-flex ml-4" style={{ maxWidth: "80%" }}>
                  <ChatImage productid="64d94566e9bc8bdead87754c" />
                  <ChatImage />
                  <ChatImage />
                  <ChatImage />
                  <ChatImage />
                  <ChatImage />
                  <ChatImage />
                </div> ):(<></>)}
              </>
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
              <label htmlFor="imageInput" className="btn btn-primary custom-file-upload">
  <span>Search via image</span>
  <input
    type="file"
    accept="image/*"
    id="imageInput"
    name="image"
    onChange={handleImageUpload}
    key={imageInputKey}
  />
</label>
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
