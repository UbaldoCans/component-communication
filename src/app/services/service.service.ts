import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private message: Message;
  constructor() {
    this.message = { message: '' }
  }

  insertMessage(pMessage: Message) {
    this.message = pMessage;
  }

  getMessage() {
    return this.message;
  }
}