import { CrimeType } from "../enums/crime-type";
import { ReportStatus } from "../enums/report-status";

export interface Crime {
    id?: number;
    national_id: number;
    report_details: string;
    crime_type: CrimeType;
    report_date_time?: string; // Consider using Date type if needed
    report_status: ReportStatus;
    latitude: number;
    longitude: number;
}