import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Crime } from '../model/crime';

@Injectable({
  providedIn: 'root'
})

//Service the manage api calls with crimes 
export class CrimeService {

  private apiName = "crimes";
  constructor(private httpClient: HttpClient) { }

  //get all crimes
  getCrimes(): Observable<Crime[]> {
    //use http client to call crime api to get all crimes
    return this.httpClient.get<Crime[]>(this.apiName);
  }

  //post crime to the backend
  postCrime(crime : Crime): Observable<void> {
    //use http client to post a crime object
    return this.httpClient.post<void>(this.apiName, crime);
  }
}
