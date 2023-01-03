import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ObservableChildService {
  private message$: Subject<Message>;
  messageChild: any;
  messageParent: any;

  constructor() {
    this.message$ = new BehaviorSubject<Message>({ message: '' });
    this.messageChild = this.message$.asObservable()
    this.messageParent = this.message$.asObservable()
  }

  emitMessage(pMessage: Message): void {
    this.message$.next(pMessage);
  }

}