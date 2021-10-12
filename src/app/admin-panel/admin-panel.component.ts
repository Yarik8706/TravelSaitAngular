import {Component, Injector} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Tour} from "../interfaces/tour";
import {User} from "../interfaces/user";
import {News} from "../interfaces/news";
import {NewsService} from "../services/news.service";
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent extends UnitComponent {

  //--------------Tour-----------------
  titleNewTour: string;
  textNewTour: string;
  allTextNewTour: string;
  hoveredDate: NgbDate = null;
  fromDate: NgbDate;
  toDate: NgbDate;
  newTour: {};
  // @ts-ignore
  allTours: [Tour] = [];
  loadingTours: boolean;


  //--------------News-----------------
  titleNewNews: string;
  textNewNews: string;
  dateNewNews: NgbDateStruct;
  allTextNewNews: string;
  newNews: {};

  //---------------User----------------
  Name: string;
  Password: string;
  isAuth: boolean;

  constructor(
    private newsService: NewsService,
    injector: Injector,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    super(injector);
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.isAuth = localStorage.getItem('access') == 'true';
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



  auth(){
    this.store.collection<User>('users').doc(this.Name).get().subscribe(data => {
      if(!data.exists){
        this.CreateFlashMessage("Неправильный пароль или такого пользователя не существует!", "danger", 4000)
        return;
      }
      if(this.Password == data.data().password){
        localStorage.setItem('access', 'true');
        location.reload();
      } else{
        this.CreateFlashMessage("Неправильный пароль или такого пользователя не существует!", "danger", 4000)
      }
    });
  }

  async addNewNews() {
    this.newNews = {
      title: this.titleNewNews,
      text: this.textNewNews,
      allText: this.allTextNewNews,
      time: this.dateNewNews

    };
    await this.store.collection('news').doc(this.randomGenerateId(8)).set(this.newNews);
    location.reload()
  }

  async addNewTour(){
    this.newTour = {
      title: this.titleNewTour,
      text: this.textNewTour,
      allText: this.allTextNewTour,
      fromDate: {
        year: this.fromDate.year,
        mouth: this.fromDate.month,
        day: this.fromDate.day
      },
      toDate: {
        year: this.toDate.year,
        mouth: this.toDate.month,
        day: this.toDate.day
      },
    };
    await this.store.collection('tours').doc(this.randomGenerateId(8)).set(this.newTour);
    location.reload()
  }

  delTour(id){
    this.store.collection('tours').doc(id).delete();
    location.reload();
  }

  randomGenerateId(long): string{
    long = long ?? 8;
    let id: string;
    while (true){
      id = String(this.generateNumber(long));
      const tour: any = this.store.collection<Tour>('tour').doc(id).get();
      if(!tour.exists){
        return id;
      }
    }
  }

  generateNumber(long: number): number{
    let max: any = '';
    for(long; long > 0; long--){
      max = max + '9'
    }
    max = Number(max);
    return Math.floor(Math.random() * (max));
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
    console.log(this.toDate)
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
