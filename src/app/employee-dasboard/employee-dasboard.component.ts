import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { ApiService } from '../Shared/api-service/api.service';
import { EmployeeModel } from './employee-dashboard.model';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../Shared/Dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import { AuthService } from '../Shared/auth-service/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-employee-dasboard',
  templateUrl: './employee-dasboard.component.html',
  styleUrls: ['./employee-dasboard.component.css']
})
export class EmployeeDasboardComponent implements OnInit{
  
  formValue !: FormGroup;
  employeeModelObject: EmployeeModel =new EmployeeModel();
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;
  todos = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','mobile','action'];
  dataSource = new MatTableDataSource<EmployeeModel>();
  user = {
    username: '',
    id: ''
  }
  durationInSeconds = 3;
  successfulMessage: string = "successfully added";
  displayedMessage: string = "Displayed all employee";
  updatedMessage: string = " updated Successfully";

  @ViewChild(MatPaginator) private paginator:MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  constructor(
    private formBuilder: FormBuilder, 
    private api:ApiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router:Router,
    private translate: TranslateService
    ) {
     
      translate.setDefaultLang('en');
      translate.use('en')
     }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: new FormControl('',[Validators.email]),
      mobile: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
    
    this.translate.onLangChange.subscribe(() => {

    })
    
    this.getAllEmployee();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeLang(selectedLang: string) {
     this.translate.use(selectedLang);

  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd =  true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;

    this.api.postEmployee(this.employeeModelObject).subscribe(res=>{
      this._snackBar.open(this.successfulMessage);
      let ref = document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong");
    })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
      this._snackBar.open(this.displayedMessage);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteEmployee(row : any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.api.deleteEmployee(row.id).subscribe(res=>{
         
         })
      }
     
    });
  }

  onEdit(row: any) {
    this.showAdd =  false;
    this.showUpdate = true;
    this.employeeModelObject.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    
  }

  updateEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;

    this.api.updateEmployee(this.employeeModelObject,this.employeeModelObject.id).subscribe(res=>{
      let ref = document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      this._snackBar.open(this.updatedMessage);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
