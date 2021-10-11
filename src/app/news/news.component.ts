import {Component, Injector, OnInit} from '@angular/core';
import {UnitComponent} from "../unit.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends UnitComponent {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
