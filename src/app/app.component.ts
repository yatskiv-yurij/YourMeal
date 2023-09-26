import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { VariableService } from './services/variable.service';
import { register } from 'swiper/element/bundle'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YourMeal';
  productsTitle = "Бургери"
  isMask = false
  constructor(private variableService: VariableService) {
    register()
  }

  ngOnInit() {
    this.variableService.choiceEat.subscribe(data => {
      this.productsTitle = data[1]
    })

    this.variableService.openInfo.subscribe(data => {
      this.isMask = data[0] ? true : false
    })

    this.variableService.openOrder.subscribe(data => {
      this.isMask = data ? true : false
    })
  }
}
