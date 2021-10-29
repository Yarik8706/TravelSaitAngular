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

  getNewsById(id){
    return this.store.collection<News>('news').doc(String(id)).get()
  }

  editNewsById(id, data){
    this.store.collection('news').doc(String(id)).update(data)
  }

  getAllNews(){
    return this.store.collection<News>('news').get()
  }

  delNews(id){
    this.store.collection<News>('news').doc(id).delete()
  }
}
