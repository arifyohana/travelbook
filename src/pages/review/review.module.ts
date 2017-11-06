import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPage } from './review';

import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
  declarations: [
    ReviewPage,
  ],
  imports: [
    InlineSVGModule,
    IonicPageModule.forChild(ReviewPage),
  ],
})
export class ReviewPageModule {}
