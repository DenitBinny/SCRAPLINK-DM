import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Paperclip, Send } from "lucide-react";

const genAI = new GoogleGenerativeAI("AIzaSyCp6vOMRGw9yPMtBDLrmSv-sh9gjBdinpw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    
    try {
      const result = await model.generateContent({
        contents: newMessages.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })),
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.1,
        }
      });
      
      const botResponse = await result.response.text();
      setMessages([...newMessages, { role: "model", text: botResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen font-sans">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 flex flex-col">
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-800">Chat</div>
          <Button variant="ghost" size="icon">
            <Paperclip size={20} className="text-gray-600" />
          </Button>
        </div>
        <div className="p-4 flex-1 flex flex-col space-y-3 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className={msg.role === "user" ? "self-end" : "self-start"}>
              <div className="text-xs text-gray-500 mb-1">{msg.role === "user" ? "You" : "Bot"}</div>
              <Card className={msg.role === "user" ? "bg-blue-500 text-white rounded-2xl p-3 max-w-xs" : "bg-gray-200 rounded-2xl p-3 max-w-xs"}>
                <CardContent>
                  <span className="text-sm leading-relaxed">{msg.text}</span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-full text-gray-800 focus:outline-none"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="ghost" size="icon" onClick={handleSendMessage}>
            <Send size={20} className="text-blue-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;