import React, { createContext, useContext, useState } from 'react';

const ChatBotContext = createContext();

export const ChatBotProvider = ({ children }) => {
    const [isChatBotOpen, setIsChatBotOpen] = useState(false);

    const openChatBot = () => setIsChatBotOpen(true);
    const closeChatBot = () => setIsChatBotOpen(false);

    return (
        <ChatBotContext.Provider value={{ isChatBotOpen, openChatBot, closeChatBot }}>
            {children}
        </ChatBotContext.Provider>
    );
};

export const useChatBot = () => useContext(ChatBotContext);
