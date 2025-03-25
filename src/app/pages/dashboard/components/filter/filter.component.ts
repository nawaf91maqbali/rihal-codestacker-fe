import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CrimeType } from '../../../../enums/crime-type';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'app-filter',
  imports: [NzButtonModule, NzDrawerModule, NzDividerModule, NzGridModule,NzIconModule,NzInputModule,FormsModule, NzDatePickerModule,NzFloatButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  isVisble: boolean = false;
  @Output() onCrimeTypesFilter = new EventEmitter<CrimeType[]>();
  @Output() onSearchFilterById = new EventEmitter<string>();
  @Output() onDateFilter = new EventEmitter<string>();
  @Output() onCloseDrawer = new EventEmitter<boolean>();
  crimeTypes = Object.values(CrimeType);
  crimeTypesFilter: CrimeType[] = [];
  date!: Date;

  onCrimeTypeFilterClick(crimeType: CrimeType) {
    if (this.crimeTypesFilter.includes(crimeType)) {
      this.crimeTypesFilter = this.crimeTypesFilter.filter(x => x !== crimeType);
    } else {
      this.crimeTypesFilter.push(crimeType);
    }
    this.onCrimeTypesFilter.emit(this.crimeTypesFilter);
  }

  onInputChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onSearchFilterById.emit(value);
  }

  onDateChange(value: Date): void {
    const dateStr = new DatePipe("en-US").transform(value, 'YYYY-MM-dd')?? '';
    this.onDateFilter.emit(dateStr);
  }

  onOpenCloseDrawer(){
      this.isVisble = !this.isVisble;
  }

}
