import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { Filter2Component } from './filter2/filter2.component';

@NgModule({
  declarations: [MenuComponent, FilterComponent, FilterPipe, Filter2Component],
  imports: [CommonModule, TranslateModule.forChild(), FormsModule],
  exports: [MenuComponent, FilterComponent],
})
export class ComponentModule {}
