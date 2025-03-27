import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { CrimeType } from '../../../../enums/enums';
import { V } from 'ol/renderer/webgl/FlowLayer';

@Component({
  selector: 'app-filter',
  imports: [NzButtonModule, NzDrawerModule, NzDividerModule, NzGridModule,NzIconModule,NzInputModule,FormsModule, NzDatePickerModule,NzFloatButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})

//filter crime component
export class FilterComponent {
  isVisble: boolean = false;
  //output used to update new value from child
  //call when crime type filter changed
  @Output() onCrimeTypesFilter = new EventEmitter<CrimeType[]>();
  //call when national id filter changed
  @Output() onSearchFilterById = new EventEmitter<string>();
  //call when date filter chnage
  @Output() onDateFilter = new EventEmitter<string>();
  crimeTypes = Object.values(CrimeType);
  crimeTypesFilter: CrimeType[] = [];
  searchById!: string;
  date!: Date;

  //call when the crime type click on UI
  onCrimeTypeFilterClick(crimeType: CrimeType) {
    if (this.crimeTypesFilter.includes(crimeType)) {
      this.crimeTypesFilter = this.crimeTypesFilter.filter(x => x !== crimeType);
    } else {
      this.crimeTypesFilter.push(crimeType);
    }
    //update parent with new values
    this.onCrimeTypesFilter.emit(this.crimeTypesFilter);
  }

  //call when the search by national id input changed
  onInputChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchById = value;
    //update parent with new value
    this.onSearchFilterById.emit(value);
  }

  //call when the search by date input changed
  onDateChange(value: Date): void {
    this.date = value;
    const dateStr = new DatePipe("en-US").transform(value, 'YYYY-MM-dd')?? '';
    //update parent with new value
    this.onDateFilter.emit(dateStr);
  }

  //call when open or close button of search drawer clicked
  onOpenCloseDrawer(){
      this.isVisble = !this.isVisble;
  }

}
