import { Component, OnInit,Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  @Input() row: any;
  ngOnInit() {
    console.log(this.row)
  }
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  onNoClick(): void {
    this.dialogRef.close(); 
  }

 
}
