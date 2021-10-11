import {Component, Injector, OnInit} from '@angular/core';
import {Event, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  slider2: HTMLElement;
  formSendMessage: HTMLElement;

  constructor(
    public router: Router
  ) {
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if(location.pathname != "/admin-panel"){
        this.formSendMessage.style.display = 'block';
        if(location.pathname != "/"){
          this.slider2.style.display = 'block';
        } else {
          this.slider2.style.display = 'none';
        }
      } else {
        this.formSendMessage.style.display = 'none';
        this.slider2.style.display = 'none';
      }
    });
  }

  ngOnInit(): void {
    this.formSendMessage = document.getElementById("send-message");
    this.slider2 = document.getElementById("slider2");
  }
}
