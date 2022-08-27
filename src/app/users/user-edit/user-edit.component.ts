import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserEditComponent>, @Inject(MAT_DIALOG_DATA) public user: {name : string,
  email : string,
  gender : string,
  dob : string,
  address : string}) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name : [this.user.name],
      email : [this.user.email],
      gender : [this.user.gender],
      dob : [this.user.dob],
      address : [this.user.address]
    });
  }
  updateUser(){
    this.dialogRef.close(this.userForm);
  }
}
