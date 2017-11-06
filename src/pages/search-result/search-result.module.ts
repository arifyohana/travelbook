import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultPage } from './search-result';
import { InlineSVGModule } from "ng-inline-svg";

import { IsiDataPageModule } from "./../isi-data/isi-data.module";

@NgModule({
  declarations: [
    SearchResultPage,
  ],
  imports: [
    InlineSVGModule,
    IsiDataPageModule,
    IonicPageModule.forChild(SearchResultPage),
  ],
})
export class SearchResultPageModule {}
