import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportStatus } from '../../../../enums/report-status';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CrimeType } from '../../../../enums/crime-type';
import { Crime } from '../../../../model/crime';
import { CrimeService } from '../../../../services/crime.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AddMapComponent } from "./add-map/add-map.component";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule,
    NzSelectModule, NzModalModule, NzStepsModule, NzResultModule, AddMapComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  crimeForm: FormGroup = new FormGroup({
    details: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
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

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  async onSubmit() {
    if (this.crimeForm.valid) {
      const crimeData: Crime = {
        report_details: this.crimeForm.value.details,
        crime_type: this.crimeForm.value.type,
        report_date_time: new Date(),
        report_status: ReportStatus.Pending,
        latitude: this.crimeForm.value.latitude,
        longitude: this.crimeForm.value.longitude
      }

      this.crimeService.postCrime(crimeData).subscribe({
        next: (response) => {
          this.crimeForm.reset();
          this.next();
          this.onSubmitSuccess();
        },
        error: (error) => {
          this.messageSerive.error(error.message);
        }
      });
    }
  }

  async onSubmitClick() {
    await this.onSubmit();
  }

  onClose() {
    this.crimeForm.reset();
    this.isVisible = false;
    this.current = 0;
    this.closeReportCrime.emit();
  }

  getLatLong(coordinates: number[]) {
    this.crimeForm.patchValue({
      longitude: coordinates[0],
      latitude: coordinates[1]
    });
  }
}
