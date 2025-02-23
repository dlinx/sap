export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface SavedMessage extends Omit<Message, 'timestamp'> {
  timestamp: string;
} 