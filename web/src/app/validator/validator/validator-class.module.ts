import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorClassDirective } from './validator-class.directive';


/**
 * 校验样式
 */
@NgModule({
  declarations: [ValidatorClassDirective],
  imports: [
    CommonModule
  ],
  exports: [ValidatorClassDirective]
})
export class ValidatorClassModule { }
