import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customCodeStyle = {
    background: '#00000060',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    lineHeight: '1',
    fontFamily: `'Menlo', 'Monaco', 'Courier New', monospace`,
    //overflowX: 'auto',
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = { text: input, sender: 'user' };

        // Prepare the new array with the new user message
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput(''); // Clear input after submit

        try {
            // Send the full array of messages to the backend for context
            //const response = await axios.post('http://localhost:5000/api/chat/send', { messages: newMessages });
            const response = await axios.post('https://ai-chat-back.up.railway.app/api/chat/send', { messages: newMessages });

            const botMessage = { text: response.data.response, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const renderMessageText = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);

        return parts.map((part, i) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const code = part.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '');
                return (
                    <SyntaxHighlighter key={i} language="javascript" style={vscDarkPlus} customStyle={customCodeStyle}>
                        {code}
                    </SyntaxHighlighter>
                );
            }
            // For non-code parts, process each line
            return part.split('\n').map((line, j) => {

                console.log('Processing part, line:', part, line);
                // Remove all Gemini poorly formatted asterisks from the line and reformat 
                const noAsterisks = line.replace(/\*/g, '');

                // If the original line starts with **, style as a header
                if (/^\*\*/.test(line)) {
                    return <h3 key={j}
                        style={{ margin: "2rem 0 1rem 0", fontWeight: 700, fontSize: '1.5rem' }}>{noAsterisks}
                    </h3>;
                }
                if (/:/.test(line)) {
                    return <p key={j}
                        style={{ margin: "1rem 0 1rem 0", fontWeight: 400, fontSize: '1rem' }}>{noAsterisks}
                    </p>;
                }
                return <span key={j}
                    style={{ margin: "0px 0 1rem 0", fontWeight: 400, fontSize: '1rem' }}>{noAsterisks}
                </span>;
            });
        });
    }

    return (
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>{renderMessageText(msg.text)}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage(e);
                        }
                    }}
                    placeholder="Ask anything..."
                    className="chat-input"
                    rows={1}
                    style={{ overflowY: input.split('\n').length > 4 ? 'auto' : 'hidden', lineHeight: '24px' }}
                />
                <button type="submit" className="chat-send-btn">Send</button>
            </form>
        </div>
    );
};

export default Chat;