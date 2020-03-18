export interface IMessage {
  type: MessageType;
  message: string;
}

export enum MessageType {
  Information, Warning, Error
}
