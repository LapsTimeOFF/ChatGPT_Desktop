import { useState } from "react";
import "./App.scss";
import ChatMessage from "./ChatMessage";

function App() {
  const [messages, setMessages] = useState<any>([
    { ai: true, message: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>('');

  const addMessage = ({ai, message}: {ai: boolean, message: string}) => {
    setMessages((prevState: any) => ([...prevState, { ai, message }]));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submit");

    addMessage({ ai: false, message: input });
    setInput('');
    console.log(messages)
    addMessage({ ai: true, message: input });
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {messages.map((Message: any, index: any) => {
            return (
              <ChatMessage
                ai={Message.ai}
                message={Message.message}
                key={index}
              />
            );
          })}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input className="chat-input-textarea" id="text-input" value={input} onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
