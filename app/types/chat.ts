export interface Message {
  role: "user" | "assistant";
  message: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  loading: boolean;
  createdAt: Date;
}
