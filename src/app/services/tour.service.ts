import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Tour} from "../interfaces/tour";
import {News} from "../interfaces/news";

@Injectable({
  providedIn: 'root'
})
export class TourService {



  constructor(
    private store: AngularFirestore
  ) { }

  getAllTour(){
    return this.store.collection<Tour>('tours').get();
  }

  editTourById(id, data){
    return this.store.collection('tours').doc(String(id)).update(data)
  }

  getTourById(id){
    return this.store.collection<Tour>('tours').doc(String(id)).get()
  }

  delTour(id){
    this.store.collection<Tour>('tours').doc(String(id)).delete()
  }
}
