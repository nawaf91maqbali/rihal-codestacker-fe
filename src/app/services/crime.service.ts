import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Crime } from '../model/crime';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  private apiUrl = "crimes";
  constructor(private httpClient: HttpClient) { }

  getCrimes(): Observable<Crime[]> {
    return this.httpClient.get<Crime[]>(this.apiUrl);
  }

  postCrime(crime : Crime): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, crime);
  }
}
