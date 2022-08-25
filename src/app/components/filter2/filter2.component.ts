import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { createPopper } from '@popperjs/core';
import { ConstantClass } from 'src/app/constants/constants';
import { IFilter } from 'src/app/interfaces/filter';
@Component({
  selector: 'app-filter2',
  templateUrl: './filter2.component.html',
  styleUrls: ['./filter2.component.scss'],
})
export class Filter2Component implements AfterViewInit {
  @Input()
  filterAttributes!: IFilter[];
  @Input()
  isSearch!: boolean;
  @Output() filtredAttributes = new EventEmitter<any>();

  attributes: any[] = [];
  dropdownPopoverShow = false;
  searchAttribute!: string;

  @ViewChild('btnDropdownRef', { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

  constructor(private _eref: ElementRef) {}

  ngAfterViewInit() {
    ConstantClass.placement =
      window.innerHeight < 368 ? 'top-start' : 'bottom-start';

    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: ConstantClass.placement,
      }
    );
  }

  //To toggle DropDown
  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  //To hide DropDown on click on outside this component
  @HostListener(ConstantClass.document.click, ['$event'])
  public hideDropdown(event: Event) {
    if (!this._eref.nativeElement.contains(event.target))
      this.dropdownPopoverShow = false;
  }

  //To hide DropDown on press on Esc
  @HostListener(ConstantClass.document.keydown, ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key.toLowerCase() === ConstantClass.escapeKey) {
      this.dropdownPopoverShow = false;
    }
  }

  onClick(attribute : string){
    if(!this.attributes.includes(attribute))
    this.attributes.push(attribute);
    console.log(this.attributes);
  }

  //On apply Filter
  onApply() {
    this.filterAttributes.map((data) => {
      if(this.attributes.includes(data.name))
      data.isChecked = true;
    });
    console.log(this.filterAttributes);
    
    this.filtredAttributes.emit(this.filterAttributes);
    this.dropdownPopoverShow = false;
  }

  //On clear filter
  onClear() {
    this.filterAttributes.map((data) => (data.isChecked = false));
    this.attributes = [];
    this.filtredAttributes.emit(this.filterAttributes);
    this.dropdownPopoverShow = false;
  }

  onCloseAttribute(index : number, attribute : string){    
    this.attributes.splice(index, 1);
  }
}
