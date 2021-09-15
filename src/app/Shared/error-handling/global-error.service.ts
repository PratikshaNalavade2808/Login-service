import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

    constructor() { }

  handleError(error: any) {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {        			  
        errorMessage = `Error: ${error.error.message}`;        	  
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;       
    }  
     window.alert(errorMessage);
     return throwError(errorMessage);   
  }
}
