import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { LanguageProvider } from './context/LanguageContext'
import { BookDemoProvider } from './context/BookDemoContext'
import { ChatBotProvider } from './context/ChatBotContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BookDemoProvider>
        <ChatBotProvider>
          <App />
        </ChatBotProvider>
      </BookDemoProvider>
    </LanguageProvider>
  </StrictMode>,
)
