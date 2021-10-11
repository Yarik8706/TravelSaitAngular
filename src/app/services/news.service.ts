import { Injectable } from '@angular/core';
import {News} from "../interfaces/news";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private store: AngularFirestore
  ) { }

  getAllNews(){
    return this.store.collection<News>('news').get()//.subscribe(data => {
    //   let dataTour: {};
    //   data.forEach(news => {
    //     dataTour = news.data();
    //     dataTour['id'] = news.id;
    //     // @ts-ignore
    //     allNews.push(dataTour);
    //   });
    // });
  }

  delNews(id){
    this.store.collection<News>('news').doc(id).delete()
  }
}
