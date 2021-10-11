import {Component, Injector, OnInit} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Tour} from "../interfaces/tour";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends UnitComponent {

  // @ts-ignore
  allTours: [Tour] = [];
  loadingTours: boolean;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadingTours = true;
    this.store.collection<Tour>('tours').get().subscribe(data => {
      let dataTour: {};
      data.forEach(tour => {
        dataTour = tour.data();
        dataTour['id'] = tour.id;
        // @ts-ignore
        this.allTours.push(dataTour);
      });
      this.loadingTours = false;
    });
  }

}
