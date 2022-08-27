import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {

  constructor(public dialogRef: MatDialogRef<UserDeleteComponent>, @Inject(MAT_DIALOG_DATA) public user: {
    name: string,
    email: string,
    gender: string,
    dob: string,
    address: string
  }) { }
  deleteUser() {
    this.dialogRef.close(true);
  }
}
