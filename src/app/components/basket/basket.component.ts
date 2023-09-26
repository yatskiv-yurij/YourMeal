import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  isOpen = false
  basketData: any
  pathImage = "assets/images/"
  totalAmount: number
  totalPrice: any
  constructor(private variableService : VariableService){}

  ngOnInit() {
    
    this.fillBasket()
    this.setTotal()

    this.variableService.storageStatus.subscribe(data => {
      this.fillBasket()
      this.setTotal()
    })
 }

 fillBasket() {
  this.basketData = JSON.parse(localStorage.getItem('your-meal')!) 
  if(this.basketData === null || this.basketData === undefined){
    this.basketData = []
  }
 }

 setTotal() {
  this.totalAmount = this.basketData?.map((obj: any) => obj.count)?.reduce((a: number, b: number) => a + b, 0)
  this.totalPrice = this.basketData?.reduce((a: any, b: any) => a + b.count * +b.infoProduct.price, 0)
  
 }

 substractCount(id: number){
  let index = this.basketData.findIndex((item : any) => item.infoProduct.id === id);
  if(this.basketData[index].count === 1){
    this.basketData.splice(index, 1)
  }else{
    this.basketData[index].count -= 1
  }
  localStorage.setItem('your-meal', JSON.stringify(this.basketData));
  this.fillBasket()
  this.setTotal()
 }

 addCount(id: number){
  let index = this.basketData.findIndex((item : any) => item.infoProduct.id === id);
  this.basketData[index].count += 1
  localStorage.setItem('your-meal', JSON.stringify(this.basketData));
  this.fillBasket()
  this.setTotal()
 }

 openOrder(){
  this.variableService.setOpenOrder(true)
  this.isOpen = false
 }

 openBasket(){
  this.isOpen = true
 }

 closeBasket(){
  this.isOpen = false
 }
}
