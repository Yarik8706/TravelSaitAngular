import {Component, Injector} from '@angular/core';
import {UnitComponent} from "../unit.component";
import {Discount} from "../interfaces/discount";

@Component({
  selector: 'app-cards-discount',
  templateUrl: './cards-discount.component.html',
  styleUrls: ['./cards-discount.component.scss']
})
export class CardsDiscountComponent extends UnitComponent{

  // @ts-ignore
  allDiscounts: [Discount] = [];
  loadingDiscounts: boolean;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.loadingDiscounts = true;
    this.store.collection("discounts").get().subscribe(data => {
      let dataDiscount: {};
      data.forEach(Discount => {
        dataDiscount = Discount.data();
        console.log(dataDiscount)
        //@ts-ignore
        dataDiscount['time'] = Object.values(dataDiscount.time).join("-");
        dataDiscount['id'] = Discount.id;
        // @ts-ignore
        this.allDiscounts.push(dataDiscount);
      });
      this.loadingDiscounts = false;
    });
  }

  delTour(id){
    this.store.collection('discounts').doc(id).delete();
    location.reload();
  }

}
