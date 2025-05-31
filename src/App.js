import React, { useState } from 'react';
import Chat from './components/Chat';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="App">
      <h1>AI Chat (Gemini 1.5)</h1>
      <h2>Ask anything, including questions requiring conversation context.</h2>

      <Chat messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;