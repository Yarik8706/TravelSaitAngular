import {Component, Injector, OnInit} from '@angular/core';
import {FlashMessagesService } from "angular2-flash-messages";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TourService} from "./services/tour.service";
import {Router} from "@angular/router";

@Component({
  template: '',
  selector: 'app-unit'
})
export class UnitComponent implements OnInit {

  public flashMessages: FlashMessagesService;
  public store: AngularFirestore;
  public tourService: TourService;
  public router: Router;

  constructor(injector:Injector ) {
    this.router = injector.get(Router);
    this.store = injector.get(AngularFirestore);
    this.flashMessages = injector.get(FlashMessagesService);
    this.tourService = injector.get(TourService);
  }

  ngOnInit(): void {
  }

  public SmallScreen(): boolean{
    return window.screen.width <= 420;
  }

  public MiddleScreen(): boolean {
    return window.screen.width <= 720;
  }

  public BigScreen(): boolean {
    return window.screen.width <= 1040;
  }

  public Screen(): number{
    return window.screen.width;
  }

  public CreateFlashMessage(text: string, style: string, time: number=4000){
    this.flashMessages.show(text, {
      cssClass: 'alert-' + style,
      timeout: time
    })
  }

  public isAdmin(): boolean{
    return localStorage.getItem("access")=="true";
  }
}
