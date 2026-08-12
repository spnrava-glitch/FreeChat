import { useState } from "react";

const chats = [
  {
    id: 1,
    name: "Sara",
    username: "@sara",
    message: "See you soon ❤️",
    time: "21:42",
    avatar: "S",
    online: true,
  },
  {
    id: 2,
    name: "Omar",
    username: "@omar",
    message: "That sounds great!",
    time: "20:18",
    avatar: "O",
    online: false,
  },
  {
    id: 3,
    name: "FreeChat Team",
    username: "@freechat",
    message: "Welcome to FreeChat 👋",
    time: "18:05",
    avatar: "F",
    online: true,
  },
];

const startingMessages = {
  1: [
    { id: 1, text: "Hey! How are you?", mine: false, time: "21:39" },
    { id: 2, text: "I'm good! What about you?", mine: true, time: "21:40" },
    { id: 3, text: "Doing great. See you soon ❤️", mine: false, time: "21:42" },
  ],
  2: [
    { id: 1, text: "Did you finish the design?", mine: false, time: "20:16" },
    { id: 2, text: "Yes, the first version is ready.", mine: true, time: "20:17" },
    { id: 3, text: "That sounds great!", mine: false, time: "20:18" },
  ],
  3: [
    { id: 1, text: "Welcome to FreeChat 👋", mine: false, time: "18:05" },
  ],
};

function App() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(startingMessages);

  const activeChat = chats.find((chat) => chat.id === selectedChat);

  const filteredChats = chats.filter((chat) =>
    `${chat.name} ${chat.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function sendMessage(event) {
    event.preventDefault();

    const text = message.trim();

    if (!text) return;

    const newMessage = {
      id: Date.now(),
      text,
      mine: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((current) => ({
      ...current,
      [selectedChat]: [
        ...(current[selectedChat] || []),
        newMessage,
      ],
    }));

    setMessage("");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">💬</div>

          <div>
            <h1>FreeChat</h1>
            <span>Messages</span>
          </div>
        </div>

        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
          />
        </div>

        <div className="chat-list">
          {filteredChats.map((chat) => (
            <button
              className={`chat-item ${
                selectedChat === chat.id ? "selected" : ""
              }`}
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="avatar">
                {chat.avatar}

                {chat.online && <span className="online" />}
              </div>

              <div className="chat-info">
                <div className="chat-title">
                  <strong>{chat.name}</strong>
                  <span>{chat.time}</span>
                </div>

                <p>{chat.message}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button>⚙️ Settings</button>
          <button>👤 My Profile</button>
        </div>
      </aside>

      <main className="conversation">
        <header className="conversation-header">
          <div className="avatar large">
            {activeChat.avatar}
            {activeChat.online && <span className="online" />}
          </div>

          <div className="person-info">
            <h2>{activeChat.name}</h2>

            <span>
              {activeChat.online ? "Online now" : activeChat.username}
            </span>
          </div>

          <div className="conversation-actions">
            <button>📞</button>
            <button>🎥</button>
            <button>⋮</button>
          </div>
        </header>

        <section className="messages">
          <div className="today">Today</div>

          {(messages[selectedChat] || []).map((item) => (
            <div
              className={`message-row ${
                item.mine ? "mine" : "received"
              }`}
              key={item.id}
            >
              <div className="message-bubble">
                <p>{item.text}</p>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </section>

        <form className="composer" onSubmit={sendMessage}>
          <button type="button">📎</button>

          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write a message..."
          />

          <button type="button">😊</button>

          <button className="send" type="submit">
            ➤
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
