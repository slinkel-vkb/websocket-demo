import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {Observable, Subject} from "rxjs";
import {InputMessage} from "./types";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private websocket: WebSocket | null = null;

  private subject$ = new Subject<InputMessage>();
  messages$: Observable<InputMessage> = this.subject$.asObservable();

  open(name: string) {
    if (this.websocket !== null) {
      this.websocket.close();
    }
    this.websocket = new WebSocket(environment.url);
    this.websocket.onmessage = ( evt => {
      this.received(JSON.parse(evt.data));
    });
    this.websocket.onerror = ( evt => {
      this.received({ type: 'error', message: evt.type});
    });
    this.websocket.onopen = ( _ => {
      this.websocket?.send(JSON.stringify({type: 'introduction', name: name}));
    });
    this.websocket
  }

  close() {
    if (this.websocket !== null) {
      this.websocket.close();
    }
  }

  shout(message: string) {
    if (this.websocket !== null && this.websocket.readyState === 1) {
      this.websocket?.send(JSON.stringify({type: 'broadcast-message', message: message}));
    } else {
      console.error("tried to send while websocket is not connected");
    }
  }

  whisper(to: string, message: string) {
    if (this.websocket !== null && this.websocket.readyState === 1) {
      this.websocket?.send(JSON.stringify({type: 'private-message', to: to, message: message}));
    } else {
      console.error("tried to send while websocket is not connected");
    }
  }

  private received(input: InputMessage) {
    this.subject$.next(input)
  }
}
