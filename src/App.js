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
        <h2 className="text-left">Ask anything, including code questions and anything requiring conversation context.
        </h2>
      </div>
      <Chat messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;