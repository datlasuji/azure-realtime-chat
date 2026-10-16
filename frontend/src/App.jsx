import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function joinChat(e) {
    e.preventDefault();

    if (username.trim()) {
      setUsername(username.trim());
      setJoined(true);
    }
  }

  function sendMessage(e) {
    e.preventDefault();

    if (!message.trim()) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        username,
        text: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  }

  return (
    <main className="app">
      <section className="chat-card">
        <header className="chat-header">
          <div className="logo">C</div>
          <div>
            <h1>Connect</h1>
            <p>Real-time chat application</p>
          </div>
          <span className="status">
            <span className="status-dot" />
            {joined ? "Connected locally" : "Welcome"}
          </span>
        </header>

        {!joined ? (
          <form className="join-screen" onSubmit={joinChat}>
            <div className="welcome-icon">C</div>
            <h2>Join the conversation</h2>
            <p>Enter your name to get started.</p>

            <label htmlFor="username">Your name</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              maxLength={30}
              required
            />

            <button type="submit">Join chat</button>
          </form>
        ) : (
          <div className="chat-body">
            <div className="chat-info">
              <div>
                <h2>General Chat</h2>
                <p>Welcome, {username}</p>
              </div>
              <span className="room-label">PUBLIC ROOM</span>
            </div>

            <div className="messages" aria-live="polite">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">C</div>
                  <h3>Your conversation starts here</h3>
                  <p>Send a message to get started.</p>
                </div>
              ) : (
                messages.map((item) => (
                  <div className="message-row" key={item.id}>
                    <div className="avatar">
                      {item.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="message-content">
                      <div className="message-meta">
                        <strong>{item.username}</strong>
                        <time>{item.time}</time>
                      </div>
                      <div className="message-bubble">{item.text}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form className="message-form" onSubmit={sendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                aria-label="Message"
                maxLength={1000}
              />
              <button type="submit" disabled={!message.trim()}>
                Send
              </button>
            </form>

            <p className="demo-note">
              UI demo only. Azure real-time messaging is not connected yet.
            </p>
          </div>
        )}
      </section>

      <footer>Built with React · Azure integration coming next</footer>
    </main>
  );
}

export default App;