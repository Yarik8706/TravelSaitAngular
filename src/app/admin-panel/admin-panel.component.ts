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
  uploadFileInput: HTMLElement;
  // @ts-ignore
  uploadFileSRC: [{}] = [];
  fromDate: NgbDate;
  toDate: NgbDate;
  newTour: {};
  isHotTour: boolean;

  //--------------News-----------------
  titleNewNews: string;
  textNewNews: string;
  dateNewNews: NgbDateStruct;
  allTextNewNews: string;
  newNews: {};
  // @ts-ignore
  uploadFileSRCNews: [{}] = [];

  //--------------Discount-------------
  titleNewDiscount: string;
  textNewDiscount: string;
  allTextNewDiscount: string;
  dateNewDiscount: NgbDateStruct;

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
    this.isHotTour = false;
    this.isAuth = localStorage.getItem('access') == 'true';
    setTimeout(()=>{
      this.uploadFileInput = document.getElementById("uploadFileInput");
      //this.uploadFileInput.addEventListener('change', this.uploadEvent);
    }, 500)
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
      time: this.dateNewNews,
      img: this.uploadFileSRCNews[0]
    };
    await this.store.collection('news').doc(this.randomGenerateId(8, "news")).set(this.newNews);
    location.reload()
  }

  async addNewDiscount() {
    await this.store.collection('discounts').doc(this.randomGenerateId(8, "discounts")).set({
      title: this.titleNewDiscount,
      text: this.textNewDiscount,
      allText: this.allTextNewDiscount,
      time: this.dateNewDiscount
    });
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
      hot: this.isHotTour,
      imgs: this.uploadFileSRC
    };
    await this.store.collection('tours').doc(this.randomGenerateId(8, "tours")).set(this.newTour);
    location.reload()
  }

  randomGenerateId(long, collection): string{
    long = long ?? 8;
    let id: string;
    while (true){
      id = String(this.generateNumber(long));
      const tour: any = this.store.collection<Tour>(collection).doc(id).get();
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
    console.log(this.toDate);
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  triggerInput() {
    this.uploadFileInput.click();
  }

  uploadEvent(event, isNew = false) {
    const files = Array.from(event.target.files);
    if (files == undefined){
      return;
    }
    // @ts-ignore
    this.uploadFileSRCNews = [];
    // @ts-ignore
    this.uploadFileSRC = [];
    files.forEach(file => {
      // @ts-ignore
      if (!file.type.match('image')){
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        const src = ev.target.result;
        if (isNew){
          // @ts-ignore
          this.uploadFileSRCNews.push({src, name: file.name, size: this.bytesToSize(file.size)})
        }else {
          // @ts-ignore
          this.uploadFileSRC.push({src, name: file.name, size: this.bytesToSize(file.size)})
        }
      };
      // @ts-ignore
      reader.readAsDataURL(file)
    });
  }

  private bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return '0 Byte';
    // @ts-ignore
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  removeEvent(name, isNews = false) {
    if (isNews) { // @ts-ignore
      this.uploadFileSRCNews = this.uploadFileSRCNews.filter(file => file.name !== name)
      return;
    }
    // @ts-ignore
    this.uploadFileSRC = this.uploadFileSRC.filter(file => file.name !== name)
  }
}
