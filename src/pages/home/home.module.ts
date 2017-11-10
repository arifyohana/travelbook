import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InlineSVGModule } from "ng-inline-svg";
import { HomePage } from './home';
import { SearchPageModule } from '../search/search.module';
import { SearchHotelPageModule } from '../search-hotel/search-hotel.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    InlineSVGModule,
    SearchPageModule,
    SearchHotelPageModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
