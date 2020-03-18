import { Injectable, EventEmitter } from '@angular/core';
import { IMessage, MessageType } from '../../shared/models/message.model';

@Injectable({ providedIn: 'root' })
export class AlertMessageService {

  alertEmitter: EventEmitter<IMessage>
    = new EventEmitter<IMessage>();

  dispatch(message: IMessage): void {
    this.alertEmitter.emit(message);
  }

  dispatchError(message: string) {
    this.alertEmitter.emit({ type: MessageType.Error, message });
  }

  dispatchInfo(message: string) {
    this.alertEmitter.emit({ type: MessageType.Information, message });
  }

  dispatchWarning(message: string) {
    this.alertEmitter.emit({ type: MessageType.Warning, message });
  }
}
