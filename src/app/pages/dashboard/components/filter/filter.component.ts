import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CrimeType } from '../../../../enums/crime-type';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-filter',
  imports: [NzButtonModule, NzDrawerModule, NzDividerModule, NzGridModule,NzIconModule,NzInputModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() isVisble: boolean = true;
  @Output() onCrimeTypesFilter = new EventEmitter<CrimeType[]>();
  @Output() onSearchFilter = new EventEmitter<string>();
  crimeTypes = Object.values(CrimeType);
  crimeTypesFilter: CrimeType[] = [];
  searchValue!: string;

  onCrimeTypeFilterClick(crimeType: CrimeType) {
    if (this.crimeTypesFilter.includes(crimeType)) {
      this.crimeTypesFilter = this.crimeTypesFilter.filter(x => x !== crimeType);
    } else {
      this.crimeTypesFilter.push(crimeType);
    }
    this.onCrimeTypesFilter.emit(this.crimeTypesFilter);
  }

  onInputChanged(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onSearchFilter.emit(inputValue);
  }

}
