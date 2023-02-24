import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
  MDBCardFooter
} from "mdb-react-ui-kit";
import axios from "axios";
import io from "socket.io-client";

const socket = io('http://localhost:3000', {
  withCredentials: true,
});

export default function ChatMessages({ User, Data, currentUser }) {
  const [current, setCurrent] = useState("");
  const [instance, getInstance] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:3001/api/messages/getmsg/", {
        from: User,
        to: currentUser?.user?._id, // check if currentUser exists before accessing its user property
      })
      .then((res) => {
        setMessages(res.data);
        scrollToBottom();
      })
      .catch((err) => console.log(err));

    socket.on("receive_message", (data) => {
      if (
        (data.from === User && data.to === currentUser.user._id) ||
        (data.from === currentUser.user._id && data.to === User)
      ) {
        setMessages((messages) => [...messages, data]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const filtered = Data.filter((e) => {
    return e._id === currentUser.user._id;
  });

  console.log(messages, "messages");
  console.log(currentUser.user._id, "the user went to chat messages ");

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      from: User,
      to: currentUser?.user?._id, // check if currentUser exists before accessing its user property
      content: current,
    };
    socket.emit("send_message", message);
    setCurrent("");
    setMessageSent(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MDBTypography listUnStyled className="text-white">
  {messages && messages.map((message, index) => {
    const isCurrentUser = message.from === User;
    const messageClass = isCurrentUser
      ? "d-flex justify-content-end mb-4"
      : "d-flex justify-content-start mb-4";
    const messageBg = isCurrentUser ? "bg-primary" : "bg-secondary";
    const messageTextColor = isCurrentUser ? "text-white" : "";

    return (
      <li key={index} className={messageClass}>
        <MDBCard className={`w-50 ${messageBg}`}>
          <MDBCardBody>
            <p className={messageTextColor}>{message.content}</p>
          </MDBCardBody>
          <MDBCardFooter className="text-right">
            {/* <small>{message.createdAt}</small> */}
          </MDBCardFooter>
        </MDBCard>
      </li>
    );
  })}
      <li className="mb-3">
        <MDBTextArea
          label="Message"
          id="textAreaExample"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </li>
      <MDBBtn
        color="light"
        size="lg"
        rounded
        className="float-end"
        onClick={handleSubmit}
      >
        Send
      </MDBBtn>
      <div ref={messagesEndRef} />
    </MDBTypography>
  );
    }