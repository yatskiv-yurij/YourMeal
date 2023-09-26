import { Component, ElementRef, ViewChild } from '@angular/core';
import { VariableService } from 'src/app/services/variable.service';
import { Swiper, SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})

export class TabsComponent {
  constructor(private variableService: VariableService){}

  selectTab (event: any, type: string, name: string) {
    let tabs = document.querySelectorAll(".tab")
    tabs.forEach((elem) => {
      elem.classList.remove('active');
    })
    event.currentTarget.classList.add('active')
    this.variableService.setChoiceEat(new Array(type, name))
  }


  @ViewChild('swiperRef', { static: true })
  _swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  options: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesOffsetBefore: 20,
      },
      480: {
        slidesPerView: 3,
        slidesOffsetBefore: 20,
      },
      650: {
          slidesPerView: 4,
          slidesOffsetBefore: 20,
      },
      880: {
          slidesPerView: 5,
          slidesOffsetBefore: 20,
      },
      1024: {
          slidesPerView: 6,
          slidesOffsetBefore: 0,
      }
    }
  }

  ngOnInit(){
    const swiperEl = Object.assign(this._swiperRef?.nativeElement, this.options);

    swiperEl.initialize();

    this.swiper = this._swiperRef?.nativeElement.swiper;
  }
}
