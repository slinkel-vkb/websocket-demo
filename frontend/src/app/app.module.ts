import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MessageTypePipe} from "./message-type.pipe";
import {FormsModule} from "@angular/forms";
import {ChatComponent} from "./chat.component";
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [
    MessageTypePipe,
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
