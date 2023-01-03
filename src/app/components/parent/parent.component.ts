import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ObservableChildService } from 'src/app/services/observable-child.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  messageInput: Message;
  message: Message;
  type: string;
  activeEmit: string;
  isActive: boolean;

  constructor(
    private observableService: ObservableService,
    private serviceService: ServiceService,
    private observableChildService: ObservableChildService
  ) { 
    this.message = { message: '' };
    this.type = '';
    this.activeEmit = '';
    this.isActive = true;
    this.messageInput = { message: '' };
  }

  ngOnInit(): void {
  }
  
  ngDoCheck() {
    if (this.activeEmit === 'serviceChild' && this.isActive) {
      this.message = this.serviceService.getMessage()
    } else if (this.activeEmit === 'observableChild' && this.isActive) {
      this.observableChildService.messageChild.subscribe((message: any) => { this.message = message })
    }
    this.isActive = true;
  }
  addServiceMessage() {
    this.message = { message: '' }
    this.type = 'serviceParent';
    this.serviceService.insertMessage({ message: ' Parent using Service' })
    this.isActive = false
  }

  addObservableMessage() {
    this.type = 'observableParent';
    this.observableChildService.emitMessage({ message: '' })
    this.observableService.emitMessage({ message: ' Parent using Subject' })
    this.isActive = false

  }

  addInputMessage() {
    this.message = { message: '' }
    this.type = 'inputParent';
    this.messageInput = { message: ' Parent using input property' }
    this.isActive = false
  }

  onMessageEmit($event: any) {
    if (this.activeEmit = 'outputChild') {
      this.message = $event
    }
  }

  onActiveEmit($event: any) {
    this.activeEmit = $event;
  }

}
