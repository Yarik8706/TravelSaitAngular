import {Component, Injector, OnInit} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {News} from "../interfaces/news";
import {NewsService} from "../services/news.service";
import {Tour} from "../interfaces/tour";

@Component({
  selector: 'app-cards-news',
  templateUrl: './cards-news.component.html',
  styleUrls: ['./cards-news.component.scss']
})
export class CardsNewsComponent extends UnitComponent{
  //--------------News-----------------
  titleNewNews: string;
  textNewNews: string;
  dateNewNews: NgbDateStruct;
  allTextNewNews: string;
  newNews: {};
  // @ts-ignore
  allNews: [News] = [];
  loadingNews: boolean;

  constructor(
    private newsService: NewsService,
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.loadingNews = true;
    this.newsService.getAllNews().subscribe(data => {
      let dataTour: {};
      data.forEach(news => {
        dataTour = news.data();
        // @ts-ignore
        if (dataTour.time != undefined) {
          // @ts-ignore
          dataTour['time'] = Object.values(dataTour.time).join("-");
        }
        dataTour['id'] = news.id;
        // @ts-ignore
        this.allNews.push(dataTour);
      });
    });
    this.loadingNews = false;
  };

  addNewNews() {
    this.newNews = {
      title: this.titleNewNews,
      text: this.textNewNews,
      allText: this.allTextNewNews,
      time: this.dateNewNews
    };
    this.store.collection('news').doc(this.randomGenerateId(8)).set(this.newNews);
    this.CreateFlashMessage("Новоя новость успешно создан!", "success", 4000);
    this.titleNewNews = "";
    this.textNewNews = "";
    this.allTextNewNews = "";
    this.dateNewNews = null;
  }

  delNews(id){
    this.CreateFlashMessage("Новоя новость успешно удалена!", "success", 4000);
    this.newsService.delNews(id);
    location.reload()
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
    return Math.floor(Math.random() * max);
  }
}
