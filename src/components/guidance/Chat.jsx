import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/Chat.scss'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ0b2tlbklkIjoiMTcxZTk2MTEtNzkwYy00ZjU4LWI5ZmUtMmM2ODAyZDljYjg1IiwiaWF0IjoxNjk1NzkyNjQ2fQ.Xo9EZCWwa7S4iN-O5MupiKmQpMXtuH1JXGZ5kMf6fSE",
  ); // Replace with your actual token

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;

    const newUserMessage = {
      role: "user",
      content: userMessage,
    };

    // Create a new array with the user's message and existing messages
    const newMessages = [...messages, newUserMessage];

    // Set the new array as the messages state and send it to the server
    setMessages(newMessages);
    setUserMessage("");

    try {
      // Send a POST request to your chat API
      const response = await axios.post(
        "https://api.astropulse.app/api/astro-chat", // Replace with your chat API endpoint
        {
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // Handle the response and add the assistant's reply to the state
      const assistantReply = response.data;
      setMessages([...newMessages, assistantReply]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "assistant" ? "assistant" : "user"}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
