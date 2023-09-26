import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(){
   return this.http.get('https://delivery-food-back-ih95.onrender.com/posts')
  }

  getProductById(id: String){
    return this.http.get(`https://delivery-food-back-ih95.onrender.com/posts/${id}`)
  }

  sendOrder(data: any){
    return this.http.post('https://delivery-food-back-ih95.onrender.com/orders', data)
  }
}
