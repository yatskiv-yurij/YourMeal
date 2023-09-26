import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor() { }

  private changeChoice = new BehaviorSubject<Array<string>>(['burger', 'Бургери']);
  choiceEat = this.changeChoice.asObservable();

  setChoiceEat(value: string[]){
    this.changeChoice.next(value);
  }

  private getOpenInfo = new BehaviorSubject<Array<any>>([false, 1]);
  openInfo = this.getOpenInfo.asObservable();

  setOpenInfo(value: Array<any>){
    this.getOpenInfo.next(value);
  }

  private changeStorage = new BehaviorSubject<boolean>(true);
  storageStatus = this.changeStorage.asObservable();

  setStorageStatus(value: boolean){
    this.changeStorage.next(value);
  }

  getStorageStatus(){
    return this.changeStorage.value;
  }

  private getOpenOrder = new BehaviorSubject<boolean>(false);
  openOrder = this.getOpenOrder.asObservable();

  setOpenOrder(value: boolean){
    this.getOpenOrder.next(value);
  }

}
