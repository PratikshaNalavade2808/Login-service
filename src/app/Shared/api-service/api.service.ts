import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalErrorService } from '../error-handling/global-error.service';
import { userUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private errorHandlerService: GlobalErrorService) { }

  postEmployee(data: any) {
    return this.http.post<any>(`${userUrl }`,data).pipe(map(((res: any) =>{
      return res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }

  updateEmployee(data: any,id: number) {
    return this.http.put<any>(`${userUrl }/`+  id,data).pipe(map(((res: any) =>{
      return  res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }

  getEmployee() {
    return this.http.get<any>(`${userUrl }`).pipe(map(((res: any)=>{
      return res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${userUrl }/`+id).pipe(map(((res: any)=>{
    return res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }
}
