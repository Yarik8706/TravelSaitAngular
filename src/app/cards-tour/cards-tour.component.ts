import {Component, Injector, OnInit} from '@angular/core';
import {Tour} from "../interfaces/tour";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {UnitComponent} from "../unit.component";

@Component({
  selector: 'app-cards-tour',
  templateUrl: './cards-tour.component.html',
  styleUrls: ['./cards-tour.component.scss']
})
export class CardsTourComponent extends UnitComponent{

  // @ts-ignore
  allTours: [Tour] = [];
  loadingTours: boolean;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.loadingTours = true;
    this.tourService.getAllTour().subscribe(data => {
      let dataTour: {};
      data.forEach(tour => {
        dataTour = tour.data();
        //@ts-ignore
        dataTour['toDate'] = Object.values(dataTour.toDate).join("-");
        // @ts-ignore
        dataTour['fromDate'] = Object.values(dataTour.fromDate).join("-");
        dataTour['id'] = tour.id;
        // @ts-ignore
        this.allTours.push(dataTour);
      });
      this.loadingTours = false;
    });
  }

  delTour(id){
    this.store.collection('tours').doc(id).delete();
    location.reload();
  }
}
