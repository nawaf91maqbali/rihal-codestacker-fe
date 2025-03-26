import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Crime } from '../../../../model/crime';
import { CrimeService } from '../../../../services/crime.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AddMapComponent } from "./add-map/add-map.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';
import { CrimeType, ReportStatus } from '../../../../enums/enums';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule,
    NzSelectModule, NzModalModule, NzStepsModule, NzResultModule, AddMapComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})

//add new crime component
export class AddComponent {
  //init crime form with default values
  crimeForm: FormGroup = new FormGroup({
    details: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    national_id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    latitude: new FormControl(0),
    longitude: new FormControl(0)
  });

  crimeTypes = Object.values(CrimeType);
  @Output() closeReportCrime = new EventEmitter<void>();
  @Input() onSubmitSuccess!: () => void;
  @Input() isVisible: boolean = false;
  @ViewChild(AddMapComponent) addMap!: AddMapComponent;
  current: number = 0;

  constructor(private crimeService: CrimeService, private messageSerive: NzMessageService) {

  }

  //call to move to pre step in form
  pre(): void {
    this.current -= 1;
  }

  //call to move to next step in form
  next(): void {
    this.current += 1;
  }

  //call when submit the form
  onSubmit() {
    //check if the form is vaild
    if (this.crimeForm.valid) {
      //map value of form to a crime object
      const crimeData: Crime = {
        report_details: this.crimeForm.value.details,
        crime_type: this.crimeForm.value.type,
        national_id: this.crimeForm.value.national_id,
        report_date_time: (new DatePipe('en-US')).transform(new Date(), 'YYYY-MM-dd-HH-mm', 'GMT+4') || '',
        report_status: ReportStatus.Pending,
        latitude: this.crimeForm.value.latitude,
        longitude: this.crimeForm.value.longitude
      }

      //using crime service to submit data to database
      this.crimeService.postCrime(crimeData).subscribe({
        next: (response) => {
          //clear form on success
          this.crimeForm.reset();
          //move to next step
          this.next();
          //call this method to update data on the parent
          this.onSubmitSuccess();
        },
        error: (error) => {
          this.messageSerive.error(error.message);
        }
      });
    }
  }

  //when submit button clicked on the ui
  onSubmitClick() {
    this.onSubmit();
  }

  //call when click close button
  onClose() {
    this.crimeForm.reset();
    this.isVisible = false;
    this.current = 0;
    this.closeReportCrime.emit();
  }

  //get the coordinates from map component
  getLatLong(coordinates: number[]) {
    this.crimeForm.patchValue({
      longitude: coordinates[0],
      latitude: coordinates[1]
    });
  }
}
