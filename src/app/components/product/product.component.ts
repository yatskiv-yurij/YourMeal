import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { VariableService } from '../../services/variable.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productsData: any
  selectedData: any
  
  pathImage = "assets/images/";

  constructor(private productsService: ProductsService, private variableService: VariableService) {}

  ngOnInit(){
    this.productsService.getProducts().subscribe(data => {
    this.productsData = data
    this.selectedData = this.productsData.filter((item: any) => item.type === 'burger')
  })
    

    this.variableService.choiceEat.subscribe(data => {
      const arr = this.productsData || [];
      this.selectedData = arr.filter((item: any) => item.type === data[0])
    })
  }


  openInfo(open: boolean, id: string){
    this.variableService.setOpenInfo([open, id])
  }
}
