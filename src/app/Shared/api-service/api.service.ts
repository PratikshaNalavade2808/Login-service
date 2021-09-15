import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GlobalErrorService } from '../error-handling/global-error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private errorHandlerService: GlobalErrorService) { }

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map(((res: any) =>{
      return res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }

  updateEmployee(data: any,id: number) {
    return this.http.put<any>("http://localhost:3000/posts/"+  id,data).pipe(map(((res: any) =>{
      return  res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }

  getEmployee() {
    return this.http.get<any>("http://localhost:3000/posts").pipe(map(((res: any)=>{
      return res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map(((res: any)=>{
    return res;
    })),
    catchError(this.errorHandlerService.handleError)
    )
  }
}
