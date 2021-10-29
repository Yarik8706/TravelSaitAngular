import {Component, Injector, OnInit} from '@angular/core';
import {TourService} from "../services/tour.service";
import {Tour} from "../interfaces/tour";
import {filter} from "rxjs/operators";
import {Event, RouterEvent} from "@angular/router";
import {UnitComponent} from "../unit.component";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent extends UnitComponent{

  loading: boolean;
  isEdit;

  title: string;
  text: string;
  id;
  Text: string;
  img;
  fromDate;
  toDate;
  hot: boolean;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    this.isEdit = false;
    this.loading = false;
    this.id = location.pathname.slice(6);
    this.tourService.getTourById(this.id).subscribe(data => {
      let dataTour: Tour;
      dataTour = data.data();

      this.title = dataTour.title;

      this.text = dataTour.allText;
      this.Text = dataTour.text;
      this.fromDate = dataTour.fromDate;
      this.toDate = dataTour.toDate;
      this.hot = dataTour.hot;
      this.img = dataTour.img;

      this.loading = true;

    });
  }

  delTour(){}

  async edit() {
    if(!this.isEdit){
      this.isEdit = true;
      return;
    }
    await this.tourService.editTourById(this.id, {
      title: this.title,
      allText: this.text
    });
    location.reload();
  }
}
