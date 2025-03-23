import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Crime } from '../model/crime';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  private apiUrl = "http://localhost:3080/crimes";
  constructor(private httpClient: HttpClient) { }

  getCrimes(): Observable<Crime[]> {
    return this.httpClient.get<Crime[]>(this.apiUrl);
  }

  postCrime(crime : Crime): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, crime);
  }

  // postCrime(crime: Crime): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(this.apiUrl, crime).subscribe(response => {
  //       console.log("Successfully Add");
  //       resolve(true);
  //     },
  //       error => {
  //         console.log(`Error ${error}`)
  //         reject(false);
  //       });
  //   })
  // }
}
