import "./App.scss";
import ChatMessage from "./ChatMessage";

function App() {
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
          <ChatMessage ai={false} message={'Peanut?'}/>
          <ChatMessage ai={true} message={'PEANUT'}/>
        </div>
        <div className="chat-input-holder">
          <textarea className="chat-input-textarea" rows={1}></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
