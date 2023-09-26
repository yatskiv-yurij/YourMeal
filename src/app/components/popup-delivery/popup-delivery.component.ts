import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-popup-delivery',
  templateUrl: './popup-delivery.component.html',
  styleUrls: ['./popup-delivery.component.scss']
})
export class PopupDeliveryComponent {

  isOpen = false
  isDelivery = false

  form = this.fb.group({
    name: ["", Validators.required],
    phone: ["", Validators.required],
    address: [""],
    floor: [""],
    intercome: [""]
  })

  constructor(private productsService: ProductsService, private variableService: VariableService, private fb: FormBuilder){}

  ngOnInit() {
    this.variableService.openOrder.subscribe(data => {
      this.isOpen = data
    })
  }

  close(){
    this.variableService.setOpenOrder(false)
  }

  onChange(e: Event) {
    this.isDelivery = (e.target as HTMLInputElement).value === "true" ? true : false;
  }

  submitOrder() {

    if(this.form.valid){
      const basketData = JSON.parse(localStorage.getItem('your-meal')!) 
      const order = 
        {
          products: [basketData.map((item: any) => {return {name: item.infoProduct.name, count: item.count}})],
          ...this.form.value
        }
      this.productsService.sendOrder(order).subscribe({
        next: () => {
          alert("Ваше замовлення прийнято")
          this.form.reset()
          this.variableService.setOpenOrder(false)
          localStorage.removeItem('your-meal')
          this.variableService.setStorageStatus(!this.variableService.getStorageStatus())
        },
        error: () => {
          alert("Стались певні проблеми, замовлення не було прийняте")
        }
      })
    }
  }
}
