import { Component, OnInit } from '@angular/core';
import {TourService} from "../services/tour.service";
import {Tour} from "../interfaces/tour";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  title: string;
  text: string;
  id;

  constructor(
    private tourService: TourService
  ) { }

  ngOnInit() {
    this.tourService.getTourById(location.pathname.slice(6)).subscribe(data => {
      let dataTour: Tour;
      dataTour = data.data();
      dataTour['id'] = data.id;
      // @ts-ignore
      this.title = dataTour.title;
      this.text = dataTour.allText;
    });
  }

  delTour(){}
}
