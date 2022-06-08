import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ChatService } from './chat.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameInput = "";
  nameOutput = "";

  login() {
    if (this.nameInput.trim() !== '') {
      this.nameOutput = this.nameInput;
    }
  }
}
