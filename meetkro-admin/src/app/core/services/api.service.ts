import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  private formatErrors(error: any): any {
    return throwError(error.error);
  }

  getBlob(path: string): Observable<any> {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });

    let requestOptions = { headers: headerOptions, responseType: 'blob' as 'blob' };
    return this.http.get(`${environment.api_url}${path}`, requestOptions)
      .pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }
}
