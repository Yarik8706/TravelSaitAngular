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
  // @ts-ignore
  allNews: [News] = [];
  loadingNews: boolean;
  newTitle: string;
  newText: string;
  isEditNews: boolean;
  newDate: string;

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
      this.loadingNews = false;
    });
  };

  delNews(id){
    this.CreateFlashMessage("Новоя новость успешно удалена!", "success", 4000);
    this.newsService.delNews(id);
    location.reload()
  }

  async EditNews(id, data){
    if (!this.isEditNews){
      this.isEditNews = true;
      return;
    }
    this.newText = data.text;
    this.newTitle = data.title;
    this.newDate = data.date;
    await this.newsService.editNewsById(id, {
      title: this.newTitle, text: this.newText
    })
    location.reload();
  }
}
