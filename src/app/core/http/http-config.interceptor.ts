import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertMessageService } from '../alert/alert-message.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private alertMessageService: AlertMessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.processError(error)));
  }

  processError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error: ${error.status} - ${error.error.message}`;
    }
    this.alertMessageService.dispatchError(errorMessage);
    return throwError(errorMessage);
  }
}
