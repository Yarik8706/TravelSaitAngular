import {Component, Injector} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Tour} from "../interfaces/tour";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends UnitComponent {

  // @ts-ignore
  tours: [Tour] = [];

  //--------------------Edit Nav Info-------------------
  isEdit: boolean;
  companyName: string;
  timeWork: string;
  address: string;
  telephone: string;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.isEdit = false;
    this.tourService.getAllTour().subscribe(data => {
      let dataTour: {};
      data.forEach(tour => {
        dataTour = tour.data();
        dataTour['id'] = tour.id;
        // @ts-ignore
        this.tours.push(dataTour);
      });
    });
    this.store.collection("setting").doc("navInfo").get().subscribe(data => {
      let info = data.data();
      // @ts-ignore
      this.companyName = info.name;
      // @ts-ignore
      this.timeWork = info.timeWork;
      // @ts-ignore
      this.address = info.address;
      // @ts-ignore
      this.telephone = info.telephone;
    })
  }

  EditNavInfo(){
    if (!this.isEdit){
      return;
    }
    this.store.collection("setting").doc("navInfo").set({
      name: this.companyName,
      timeWork: this.timeWork,
      address: this.address,
      telephone: this.telephone
    })
  }

}
