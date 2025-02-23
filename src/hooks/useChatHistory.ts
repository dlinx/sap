import { useState, useEffect, useCallback, useRef } from 'react';
import { Message, SavedMessage } from '../types/chat';

const CHAT_HISTORY_KEY = 'chat_history';
const MAX_MESSAGES = 100;
const TYPING_DELAY = 1500;

const SAMPLE_RESPONSES = [
  `Thank you for your question! I can help you with the application process.

Here are the main steps:
* Fill out your **personal information**
* Upload the required *documents*
* Review and submit your application

Need help with anything specific?`,

  `To upload your documents:

1. Click the **Upload** button
2. Select your files from your device
3. Make sure they are in the correct format
   * PDF for transcripts
   * JPEG or PNG for photos

Let me know if you need any clarification!`,

  `Here's what you need to prepare:

**Required Documents:**
* Valid ID
* Academic transcripts
* Recommendation letters

*Note: All documents should be clear and legible.*

Is there anything specific you'd like to know about these requirements?`,
] as const;

export const useChatHistory = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const isInitialMount = useRef(true);
  const responseIndex = useRef(0);

  const loadChatHistory = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      if (!savedHistory) {
        setMessages([]);
        return;
      }

      let parsedHistory: SavedMessage[];
      try {
        parsedHistory = JSON.parse(savedHistory);
        if (!Array.isArray(parsedHistory)) {
          throw new Error('Invalid chat history format');
        }
      } catch (parseError) {
        console.error('Failed to parse chat history:', parseError);
        localStorage.removeItem(CHAT_HISTORY_KEY);
        setMessages([]);
        return;
      }

      const history = parsedHistory.map((message) => ({
        ...message,
        id: typeof message.id === 'number' ? message.id : Date.now(),
        text: String(message.text || ''),
        isUser: Boolean(message.isUser),
        timestamp: new Date(message.timestamp),
      }));
      
      setMessages(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([]);
    }
  }, []);

  const saveChatHistory = useCallback((messagesToSave: Message[]) => {
    if (!Array.isArray(messagesToSave)) {
      console.error('Invalid messages format');
      return;
    }

    try {
      const trimmedMessages = messagesToSave.slice(-MAX_MESSAGES);
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(trimmedMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
      // Optionally clear localStorage if it's full
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        localStorage.clear();
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messagesToSave.slice(-10)));
      }
    }
  }, []);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    saveChatHistory(messages);
  }, [messages, saveChatHistory]);

  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
      // Attempt to force clear if regular removal fails
      try {
        localStorage.clear();
        setMessages([]);
      } catch (clearError) {
        console.error('Failed to force clear history:', clearError);
      }
    }
  }, []);

  const addMessage = useCallback((text: string, isUser: boolean) => {
    const trimmedText = String(text || '').trim();
    if (!trimmedText) {
      console.warn('Attempted to add empty message');
      return null;
    }

    const newMessage: Message = {
      id: Date.now(),
      text: trimmedText,
      isUser,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const simulateResponse = useCallback((responseText?: string) => {
    setIsTyping(true);

    return new Promise<Message>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        try {
          const text = responseText ?? SAMPLE_RESPONSES[responseIndex.current];
          responseIndex.current = (responseIndex.current + 1) % SAMPLE_RESPONSES.length;
          
          const aiMessage = addMessage(text, false);
          if (!aiMessage) {
            throw new Error('Failed to add AI message');
          }
          
          setIsTyping(false);
          resolve(aiMessage);
        } catch (error) {
          setIsTyping(false);
          reject(error);
        }
      }, TYPING_DELAY);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timeoutId);
    });
  }, [addMessage]);

  return {
    messages,
    isTyping,
    addMessage,
    clearHistory,
    simulateResponse,
  };
}; 