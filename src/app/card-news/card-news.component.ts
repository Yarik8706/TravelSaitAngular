import {Component, Injector, OnInit} from '@angular/core';
import {News} from "../interfaces/news";
import {NewsService} from "../services/news.service";
import {UnitComponent} from "../unit.component";

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss']
})
export class CardNewsComponent extends UnitComponent {

  //--------------News-----------------
  News;
  loadingNews: boolean;

  constructor(
    private newsService: NewsService,
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.loadingNews = true;
    this.newsService.getNewsById(location.pathname.slice(6)).subscribe(data => {
      this.News = data.data();
      this.News['id'] = data.id;
      this.loadingNews = false;
    });
  };

  delNews(id){
    this.CreateFlashMessage("Новоя новость успешно удалена!", "success", 4000);
    this.newsService.delNews(id);
    location.reload()
  }

}
