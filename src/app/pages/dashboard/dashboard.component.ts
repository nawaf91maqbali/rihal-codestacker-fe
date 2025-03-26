import { Component, OnInit, ViewChild } from '@angular/core';
import { CrimeService } from '../../services/crime.service';
import { Crime } from '../../model/crime';
import { AddComponent } from "./components/add/add.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapComponent } from "./components/map/map.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { FilterComponent } from "./components/filter/filter.component";
import { CrimeType } from '../../enums/enums';

//The main page to display the map with pins
@Component({
  selector: 'app-dashboard',
  imports: [AddComponent, NzModalModule, MapComponent, FilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent; //ViewChild decorator to interact with map component
  crimesArray: Crime[] = [];//array to load the crime list
  isVisible: boolean = false;//display the add crime modal
  crimeTypesFilter: CrimeType[] = []; //crime type array used for filtering crimes
  searchById!: string; //search var to search for a crime by national id
  dateSearch: string = ''; //search var to search by date as date stored in db as string


  constructor(private crimesService: CrimeService, private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    //load crimes and init pin on the map
    this.loadCrimes();
  }

  loadCrimes(): void {
    //load crime using crimes services
    this.crimesService.getCrimes().subscribe({
      next: (response) => {
        this.crimesArray = response
        //filter by crime type
        .filter(c => !this.crimeTypesFilter.includes(c.crime_type))
        //filter by national id
        .filter(c => c.national_id.toString().includes(this.searchById) || !this.searchById)
        //filter by report date
        .filter(c => (c.report_date_time && c.report_date_time.includes(this.dateSearch)) || !this.dateSearch);

        //load pin on the map 
        this.mapComponent.reloadMarkers(this.crimesArray);
      },
      error: (error) => {
        this.messageService.error(error.message);
      }
    })
  }

  //call after new crime added
  onSubmitSuccess = () => {
    //load crimes when a new crime report is added
    this.loadCrimes();
  }

  //call when report crime button cliked
  reportCrime() {
    if (!this.isVisible) {
      this.isVisible = !this.isVisible;
    }
  }

  //call when need to close add crime modal
  closeReportCrime() {
    if (this.isVisible) {
      this.isVisible = !this.isVisible;
    }
  }

  //call when filter using crime type
  onCrimeTypeFilterClick(crimeTypes: CrimeType[]) {
    this.crimeTypesFilter = crimeTypes;
    this.loadCrimes();
  }

  //call when filter using national id
  onSearchFilterById(searchByIdText: string) {
    this.searchById = searchByIdText;
    this.loadCrimes();
  }

  //call when filter using date search
  onDateFilter(dateStr: string) {
    this.dateSearch = dateStr;
    this.loadCrimes();
  }
}
