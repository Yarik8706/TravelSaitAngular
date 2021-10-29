import {Component, Injector} from '@angular/core';
import {Tour} from "../interfaces/tour";
import {UnitComponent} from "../unit.component";
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cards-tour',
  templateUrl: './cards-tour.component.html',
  styleUrls: ['./cards-tour.component.scss']
})
export class CardsTourComponent extends UnitComponent{

  allTours = [];
  hotTours = [];
  loadingTours: boolean;

  isEditTour: boolean;
  newTitle: string;
  newText: string;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate = null;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    injector: Injector
  ) {
    super(injector)
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.loadingTours = true;
    this.tourService.getAllTour().subscribe(data => {
      let dataTour: Tour;
      let dateNow = new Date();
      let checkDateNow = this.getDateNow(dateNow.getDay(), dateNow.getMonth(), dateNow.getFullYear());
      data.forEach(tour => {
        dataTour = tour.data();

        let checkDate = this.getDateNow(dataTour.toDate.year, dataTour.toDate.mouth,dataTour.toDate.day);
        if(checkDate < checkDateNow){
          this.tourService.delTour(tour.id);
        }else{
          dataTour['toDate'] = this.getDateNow(dataTour.toDate.year, dataTour.toDate.mouth,dataTour.toDate.day, true);
          dataTour['fromDate'] = this.getDateNow(dataTour.fromDate.year, dataTour.fromDate.mouth,dataTour.fromDate.day, true);
          dataTour['id'] = tour.id;
          if (!dataTour.hot){
            this.allTours.push(dataTour);
          }else{
            this.hotTours.push(dataTour)
          }
        }
      });
      this.loadingTours = false;
    });
  }

  delTour(id) {
    this.store.collection('tours').doc(id).delete();
    location.reload();
  }

  async editTour(id, data) {
    if(!this.isEditTour) {
      this.isEditTour = true;
      return;
    }
    this.newText = data.text;
    this.newTitle = data.title;
    await this.tourService.editTourById(id, {text: this.newText, title: this.newTitle,
      fromDate: {year: this.fromDate.year, mouth: this.fromDate.month, day: this.fromDate.day},
      toDate: {year: this.toDate.year, mouth: this.toDate.month, day: this.toDate.day}
    });
    location.reload();
  }

  getDateNow(day, mouth, year, string?){
    let customDay = String(day);
    let customMouth = String(mouth);
    let customYear = String(year);
    if (customDay.length == 1){
      customDay = '0' + customDay
    }
    if (customMouth.length == 1){
      customMouth = '0' + customMouth
    }
    if (customYear.length == 1){
      customYear = '0' + customYear
    }
    if (string){
      return customYear + '-' + customMouth + '-' + customDay
    }
    return Number(customYear + customMouth + customDay);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
