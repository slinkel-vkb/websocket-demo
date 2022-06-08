export interface InputMessage {
  type: "error" | "greeting" | "message";
  message: string;
}

export interface Error extends InputMessage {
  type: "error";
}

export interface Greeting extends InputMessage {
  type: "greeting";
}

export interface Message extends InputMessage {
  type: "message";
  from: string;
}

export interface OutputMessage {
  type: "introduction" | "broadcast-message" | "private-message";
}

export interface Introduction extends OutputMessage {
  type: "introduction";
  name: string;
}

export interface BroadcastMessage extends OutputMessage {
  type: "broadcast-message";
  message: string;
}

export interface PrivateMessage extends OutputMessage {
  type: "private-message";
  to: string;
  message: string;
}
