import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {InputMessage} from "./types";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input()
  name!: string;

  messages: InputMessage[] = [];

  text = '';

  constructor(
    private chatService: ChatService
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.chatService.close();
  }

  ngOnInit(): void {
    this.chatService.open(this.name);
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.messages = [message, ...this.messages]);
  }

  shout() {
    if (this.text.trim() !== '') {
      this.chatService.shout(this.text);
    }
  }

}
