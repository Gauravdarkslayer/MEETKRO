import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpClientModule } from '@angular/common/http';

import {
  ApiService,
  NoAuthGuardService,
  AuthGuardService,
  JwtService,
  UserService,
  // S3UploadService,
} from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    NoAuthGuardService,
    AuthGuardService,
    JwtService,
    UserService,
    // S3UploadService,
  ],
  declarations: []
})
export class CoreModule { }
