import {Pipe, PipeTransform} from "@angular/core";
import {InputMessage, Message} from "./types";

@Pipe({
  name: 'messageType',
  pure: true
})
export class MessageTypePipe implements PipeTransform {
  transform(value: InputMessage): Message | null {
    if (value.type === 'message') {
      return value as Message;
    } else {
      return null;
    }
  }
}
