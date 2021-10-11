import {Component, Injector, OnInit} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {TourService} from "../services/tour.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends UnitComponent {


  // @ts-ignore
  tours: [Tour] = [];

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.tourService.getAllTour().subscribe(data => {
      let dataTour: {};
      data.forEach(tour => {
        dataTour = tour.data();
        dataTour['id'] = tour.id;
        // @ts-ignore
        this.tours.push(dataTour);
      });
    });
  }

}
