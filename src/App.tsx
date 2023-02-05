import { useEffect, useState } from "react";
import "./App.scss";
import ChatMessage from "./ChatMessage";

function App() {
  const [apiKey, setApiKey] = useState<any>('');
  const [messages, setMessages] = useState<any>([
    { ai: true, message: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const result = await window.Config_API.getKey("openai.api_key");
      setApiKey(result);
    }
    fetchData();
  }, []);

  const addMessage = ({ ai, message }: { ai: boolean; message: string }) => {
    setMessages((prevState: any) => [...prevState, { ai, message }]);
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

    const res = await window.ChatGPT_API.sendMessage(msg.join("\n"));

    addMessage({ ai: true, message: res.text });
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
        <input
          type="text"
          placeholder="OpenAI API KEY"
          className="side-menu-button"
          value={apiKey}
          onChange={(e) => {setApiKey(e.target.value); window.Config_API.setKey('openai.api_key', e.target.value)}}
          style={{ backgroundColor: "#202123", color: "white", outline:"none" }}
        />
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
            <input
              className="chat-input-textarea"
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
