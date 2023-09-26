import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { VariableService } from '../../services/variable.service';

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})
export class PopupInfoComponent {

  productData: any
  isOpen = false
  constructor(private productsService: ProductsService, private variableService: VariableService){}

  ngOnInit(){
    this.variableService.openInfo.subscribe(data => {
      if(data[0]){
        this.isOpen = true
        this.productsService.getProductById(data[1]).subscribe(data => {
          this.productData = data
        })
      }else{
        this.isOpen = false
      }
    })
  }

  close(){
    this.variableService.setOpenInfo([false, '1'])
  }


  addToBasket(infoProduct: any) {
    let basket = JSON.parse(localStorage.getItem('your-meal')!) 
    if(basket == null) basket = []
    let data = {infoProduct, count: 1}
    basket.push(data);
    localStorage.setItem('your-meal', JSON.stringify(basket));
    this.variableService.setStorageStatus(!this.variableService.getStorageStatus());
    this.close()
  }
}
