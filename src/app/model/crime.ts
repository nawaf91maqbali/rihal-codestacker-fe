import { CrimeType } from "../enums/crime-type";

export interface Crime {
    id?: number;
    report_details: string;
    crime_type: string;
    report_date_time: Date; // Consider using Date type if needed
    report_status: string;
    latitude: number;
    longitude: number;
}

export interface CrimeFilter {
    crime_types: CrimeType[]
}