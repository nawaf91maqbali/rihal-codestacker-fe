import { Component, OnInit, ViewChild } from '@angular/core';
import { CrimeService } from '../../services/crime.service';
import { Crime } from '../../model/crime';
import { AddComponent } from "./components/add/add.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapComponent } from "./components/map/map.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { CrimeType } from '../../enums/crime-type';
import { FilterComponent } from "./components/filter/filter.component";

@Component({
  selector: 'app-dashboard',
  imports: [AddComponent, NzModalModule, MapComponent, FilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  crimesArray: Crime[] = [];
  isVisible: boolean = false;
  crimeTypesFilter: CrimeType[] = [];
  searchById!: string;
  dateSearch: string = '';


  constructor(private crimesService: CrimeService, private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.loadCrimes();
  }

  loadCrimes(): void {
    this.crimesService.getCrimes().subscribe({
      next: (response) => {
        this.crimesArray = response
        .filter(c => !this.crimeTypesFilter.includes(c.crime_type))
        .filter(c => c.national_id.toString().includes(this.searchById) || !this.searchById)
        .filter(c => (c.report_date_time && c.report_date_time.includes(this.dateSearch)) || !this.dateSearch);
        console.log(this.dateSearch);
        this.mapComponent.reloadMarkers(this.crimesArray);
      },
      error: (error) => {
        this.messageService.error(error.message);
      }
    })
  }

  onSubmitSuccess = () => {
    this.loadCrimes();
  }

  closeReportCrime() {
    if (this.isVisible) {
      this.isVisible = !this.isVisible;
    }
  }

  reportCrime() {
    if (!this.isVisible) {
      this.isVisible = !this.isVisible;
    }
  }

  onCrimeTypeFilterClick(crimeTypes: CrimeType[]) {
    this.crimeTypesFilter = crimeTypes;
    this.loadCrimes();
  }

  onSearchFilterById(searchByIdText: string) {
    this.searchById = searchByIdText;
    this.loadCrimes();
  }

  onDateFilter(dateStr: string) {
    this.dateSearch = dateStr;
    this.loadCrimes();
  }
}
