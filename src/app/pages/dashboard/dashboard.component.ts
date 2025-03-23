import { Component, OnInit, ViewChild } from '@angular/core';
import { CrimeService } from '../../services/crime.service';
import { Crime, CrimeFilter } from '../../model/crime';
import { AddComponent } from "./components/add/add.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapComponent } from "./components/map/map.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { CrimeType } from '../../enums/crime-type';
import { filter } from 'rxjs';
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
  searchValue: string = 'theft';

  constructor(private crimesService: CrimeService, private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.loadCrimes();
  }

  loadCrimes(): void {
    this.crimesService.getCrimes().subscribe({
      next: (response) => {
        this.crimesArray = response.filter(c => !this.crimeTypesFilter.includes(c.crime_type as CrimeType))
        .filter(c => this.applyFilter(c)
          // // (c.id?.toString().includes(this.searchValue) || 
          //  c.report_date_time?.toISOString().includes(this.searchValue) || 
          //  c.crime_type?.toLowerCase().includes(this.searchValue.toLowerCase())
          // // )
        )
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
    console.log(crimeTypes);
    this.loadCrimes();
  }

  onSearchFilter(searchText: string) {

  }

  applyFilter(crime: Crime): boolean {
    if (!this.searchValue) return true; // Show all if searchValue is empty
  
    const search = this.searchValue.toLowerCase();
  
    return (
      crime.crime_type?.toLowerCase().includes(search) //||
      //crime.report_date_time?.toISOString().includes(search) //||
      //(crime.id ? crime.id.toString().includes(this.searchValue) : false) // Allows partial match for id
    );
  }
}
