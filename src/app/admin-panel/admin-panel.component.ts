import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Tour} from "../interfaces/tour";
import {User} from "../interfaces/user";
import {News} from "../interfaces/news";
import {NewsService} from "../services/news.service";
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent extends UnitComponent {

  //--------------Setting------------------
  isShowingMain: boolean;
  isShowingTour: boolean;
  isShowingNews: boolean;
  isShowingDiscount: boolean;
  isCreating: boolean;
  problemsMessage;
  @ViewChild("content", {static: false})
  modalWindow: ElementRef|undefined;

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
    private modalService: NgbModal,
    //public activeModal: NgbActiveModal,
    private newsService: NewsService,
    injector: Injector,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    super(injector);
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  placeNull(){
    this.isShowingMain = false;
    this.isShowingTour = false;
    this.isShowingNews = false;
    this.isShowingDiscount = false;
  }

  ngOnInit() {
    this.isShowingMain = true;
    this.isHotTour = false;
    this.isAuth = localStorage.getItem('access') == 'true';
    setTimeout(()=>{
      this.uploadFileInput = document.getElementById("uploadFileInput");
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
    if(this.isCreating){
      return;
    }
    if (!this.titleNewNews || this.titleNewNews.length < 7){
      this.problemsMessage = "Название слишком короткое или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.textNewNews || this.textNewNews.length < 44){
      this.problemsMessage = "Краткое описание слишком короткое или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.allTextNewNews){
      this.problemsMessage = "Текст слишком маленький или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.uploadFileSRCNews[0]){
      this.problemsMessage = "Нет фотографии!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.dateNewNews){
      this.problemsMessage = "Нет даты новости!";
      this.modalService.open(this.modalWindow);
      return;
    }
    this.newNews = {
      title: this.titleNewNews,
      text: this.textNewNews,
      allText: this.allTextNewNews,
      time: this.dateNewNews,
      img: this.uploadFileSRCNews[0]
    };
    this.isCreating = true;
    await this.store.collection('news').doc(this.randomGenerateId(8, "news")).set(this.newNews);
    location.reload()
  }

  async addNewDiscount() {
    if(this.isCreating){
      return;
    }
    if (!this.titleNewDiscount || this.titleNewDiscount.length < 7){
      this.problemsMessage = "Название слишком короткое или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.textNewDiscount || this.textNewDiscount.length < 44){
      this.problemsMessage = "Краткое описание слишком короткое или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.allTextNewDiscount){
      this.problemsMessage = "Текст слишком маленький или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.dateNewDiscount){
      this.problemsMessage = "Нет даты!";
      this.modalService.open(this.modalWindow);
      return;
    }
    this.isCreating = true;
    await this.store.collection('discounts').doc(this.randomGenerateId(8, "discounts")).set({
      title: this.titleNewDiscount,
      text: this.textNewDiscount,
      allText: this.allTextNewDiscount,
      time: this.dateNewDiscount
    });
    location.reload()
  }

  async addNewTour(){
    if(this.isCreating){
      return;
    }
    if (!this.titleNewTour || this.titleNewTour.length < 7){
      this.problemsMessage = "Название слишком короткое или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.textNewTour || this.textNewTour.length < 44){
      this.problemsMessage = "Краткое описание слишком короткое или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.allTextNewTour){
      this.problemsMessage = "Текст слишком маленький или его вообще нет!";
      this.modalService.open(this.modalWindow);
      return;
    } else if (!this.uploadFileSRC[0]){
      this.problemsMessage = "Нет фотографии для тура!";
      this.modalService.open(this.modalWindow);
      return;
    }
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
      img: this.uploadFileSRC[0]
    };
    this.isCreating = true;
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
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
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
