import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchHotelPage } from './search-hotel';

import { SearchModalPageModule } from "../modals/search-modal/search-modal.module";
import { SearchHotelResultPageModule } from "../search-hotel-result/search-hotel-result.module";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
  declarations: [
    SearchHotelPage,
  ],
  imports: [
    InlineSVGModule,
    SearchModalPageModule,
    SearchHotelResultPageModule,
    IonicPageModule.forChild(SearchHotelPage),
  ],
})
export class SearchHotelPageModule {}
