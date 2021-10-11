import {Component, Injector, OnInit} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Event, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-send-message-us',
  templateUrl: './send-message-us.component.html',
  styleUrls: ['./send-message-us.component.scss']
})
export class SendMessageUsComponent extends UnitComponent{

  private formSendMessage: HTMLElement;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.formSendMessage = document.getElementById("send-message");
  }

}
