import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EmployeeDasboardComponent } from './employee-dasboard.component';

describe('EmployeeDasboardComponent', () => {
  let component: EmployeeDasboardComponent;
  let fixture: ComponentFixture<EmployeeDasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDasboardComponent ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(async () => {
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it("should add the employee on click on Add button ", () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.add).toBeTruthy();
  });

  it("should edit  the employee on click on Edit button ", () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.edit).toBeTruthy();
  });

  it("should Delete  the employee on click on delete button ", () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.delete).toBeTruthy();
  });


});
});