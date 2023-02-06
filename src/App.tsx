import { useEffect, useState } from "react";
import "./App.scss";
import ChatMessage from "./ChatMessage";

import { Link } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState<any>([
    { ai: true, message: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>("");

  const addMessage = ({
    ai,
    message,
    error,
  }: {
    ai: boolean;
    message: string;
    error?: boolean;
  }) => {
    setMessages((prevState: any) => [...prevState, { ai, message, error }]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("Submit");

    addMessage({ ai: false, message: input });

    const msg = [
      "You're an AI named ChatGPT, here is the disscution, give me a response to the last message of the user. Nothing else.",
    ];

    // console.log(messages);

    for (const key in [...messages, { ai: false, message: input }]) {
      let _ = [...messages, { ai: false, message: input }][key];
      msg.push(`${_.ai ? "ChatGPT (you) : " : "The user : "}${_.message}`);
    }

    setInput("");

    // console.log(msg.join("\n"));

    try {
      const res = await window.ChatGPT_API.sendMessage(msg.join("\n"));
      console.log(res);
      addMessage({ ai: true, message: res.text });
    } catch (error) {
      addMessage({
        ai: true,
        message: `An error as occured.\n\n${error}`,
        error: true,
      });
      console.error(error);
    }
  };

  const handleNewChat = () => {
    setMessages([{ ai: true, message: "Hi! How can I help you today?" }]);
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={handleNewChat}>
          <span>+</span>
          New Chat
        </div>
        <br />
        <Link to="/settings" style={{ color: "white", textDecoration: "none" }}>
          <div className="side-menu-button">Settings</div>
        </Link>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {messages.map((Message: any, index: any) => {
            return (
              <ChatMessage
                ai={Message.ai}
                message={Message.message}
                error={Message.error}
                key={index}
              />
            );
          })}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <textarea
              style={{ resize: "none" }}
              className="chat-input-textarea"
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
