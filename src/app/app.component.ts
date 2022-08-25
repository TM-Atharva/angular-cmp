import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFilter } from './interfaces/filter';
import { IMenuItem } from './interfaces/menu-item';
import { CommonService } from './services/common/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProjectManagement';
  isSearch = true;

  menuItems;
  filterAttributes;

  constructor(
    private translate: TranslateService,
    private commonService: CommonService
  ) {
    //Set langulage english
    translate.setDefaultLang('en');
    translate.use('en');

    this.menuItems = this.commonService.menuItems;
    this.filterAttributes = this.commonService.filterAttributes;
  }

  //To get item on click DropDown MenuItem
  onItemClick(item: any) {
    console.log(item);
  }

  //To get attribute of filter
  filtredAttributes(item: IFilter[]) {
    this.filterAttributes = item;
    console.log(this.filterAttributes);
  }
}
