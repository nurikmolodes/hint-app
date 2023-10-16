import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../styles/Chat.scss";
import Send from "../../assets/send.svg";
import avatar from "../../assets/avatar.svg";

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const [userMessage, setUserMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);

  // Load chat history from sessionStorage when the component mounts
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat history to sessionStorage whenever messages are updated
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Add leading zeros to minutes if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleSendMessage = async () => {
    setLoadingMessage(true);
    if (userMessage.trim() === "") return;

    const newUserMessage = {
      role: "user",
      content: userMessage,
      timestamp: getCurrentTime(), // Add the timestamp
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
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      // Handle the response and add the assistant's reply to the state
      const assistantReply = response.data;
      setMessages([...newMessages, assistantReply]);
      setLoadingMessage(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  // Handle sending a message when Enter or Spacebar is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (e.g., form submission)
      handleSendMessage(); // Call the function to send the message
    }
  };
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "assistant" ? "assistant" : "user"}`}>
            {message.role === "assistant" && <img className="avatar" src={avatar} />}
            <div className={`message-content ${message.role === "assistant" && "yes"}`}>
              <h5>{message.role === "assistant" && message.role.toUpperCase()}</h5>
              <p>{message.content}</p>
            </div>

            <div className="message-timestamp">
              <span>{message.timestamp}</span>
              <span>
                {message.role === "user" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.35359 8.35359L10.8536 5.85359L10.1465 5.14648L7.64648 7.64648L8.35359 8.35359ZM3.14648 8.35359L5.64648 10.8536L6.35359 10.1465L3.85359 7.64648L3.14648 8.35359ZM8.50004 11.2071L13.8536 5.85359L13.1465 5.14648L8.50004 9.79293L6.35359 7.64648L5.64648 8.35359L8.50004 11.2071Z"
                      fill="#646670"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
        ))}
        {loadingMessage && (
          <div class="loader-message">
            <div class="dash uno"></div>
            <div class="dash dos"></div>
            <div class="dash tres"></div>
            <div class="dash cuatro"></div>
          </div>
        )}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your question here..."
          value={userMessage}
          onChange={handleUserMessageChange}
          onKeyDown={handleKeyDown}
        />
        <img onClick={handleSendMessage} src={Send} />
      </div>
    </div>
  );
};

export default Chat;
