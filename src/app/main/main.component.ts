import {Component, Injector, OnInit} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Tour} from "../interfaces/tour";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends UnitComponent {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }
}
