import {Component, Injector} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Tour} from "../interfaces/tour";
import {User} from "../interfaces/user";
import {News} from "../interfaces/news";
import {NewsService} from "../services/news.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

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
  newTour: {};
  // @ts-ignore
  allTours: [Tour] = [];
  loadingTours: boolean;

  //---------------User----------------
  Name: string;
  Password: string;
  isAuth: boolean;

  constructor(
    private newsService: NewsService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.isAuth = localStorage.getItem('access') == 'true';
    this.loadingTours = true;
    this.tourService.getAllTour().subscribe(data => {
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

  delTour(id){
    this.store.collection('tours').doc(id).delete();
    location.reload();
  }

  addNewTour(){
    this.newTour = {
      title: this.titleNewTour,
      text: this.textNewTour,
      allText: this.allTextNewTour
    };
    this.store.collection('tours').doc(this.randomGenerateId(8)).set(this.newTour);
    this.CreateFlashMessage("Новый тур успешно создан!", "success", 4000)
    this.titleNewTour = "";
    this.textNewTour = "";
    this.allTextNewTour = "";
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
}
