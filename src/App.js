import React, { useState } from 'react';
import Chat from './components/Chat';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="App">
      <div className="headers">
        <h1>AI Chat (Gemini 2.0)</h1>
        <h2>Ask anything, including questions requiring remembering conversation context.
          Ask for code examples to see VS Code inspired styling.</h2>
      </div>
      <Chat messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;