import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-curd',
  templateUrl: './user-curd.component.html',
  styleUrls: ['./user-curd.component.scss']
})
export class UserCurdComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'gender', 'address', 'dob', 'icons'];
  dataSource: MatTableDataSource<UserList>;
  selection: any;
  maleCount: Number = 0
  femaleCount: Number = 0
  progreesPercentage: any = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.maleFemaleCount();
  }
  ngOnInit(): void {
    const initialSelection: any = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel(allowMultiSelect, initialSelection);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Object) {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  editUser(selectedColumn: any, index: number) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '500px',
      data: selectedColumn
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ELEMENT_DATA.splice(index, 1, result.value);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.maleFemaleCount();
      }
    });
  }
  deleteUser(selectedColumn: any, index: number) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '500px',
      data: selectedColumn
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ELEMENT_DATA.splice(index, 1);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.maleFemaleCount();
      }
    });
  }
  maleFemaleCount(){
    this.progreesPercentage = this.dataSource.data.length*10; 
    this.maleCount = this.dataSource.data.filter(item => item['gender'] == 'male').length;
    this.femaleCount = this.dataSource.data.filter(item => item['gender'] == 'female').length;
  }
}

export interface UserList {
  name: string;
  email: string;
  gender: string;
  address: string;
  dob: any;
}

const ELEMENT_DATA: UserList[] = [
  { name: 'Sew joen', email: 'sewjoen@gmail.com', gender: 'male', address: '471 Duncan Avenue, New York', dob: new Date('2022-03-11T00:00:00') },
  { name: 'John Doe', email: 'johndoe@gmail.com', gender: 'female', address: '471 Duncan Avenue, New York', dob: new Date('2022-02-11T00:00:00') },
  { name: 'Rose Smith', email: 'rose.smith@gmail.com', gender: 'female', address: '471 Duncan Avenue, New York', dob: new Date('1970-02-11T00:00:00') },
  { name: 'Sew joen', email: 'sewjoen@gmail.com', gender: 'male', address: '471 Duncan Avenue, New York', dob: new Date('1989-02-11T00:00:00') },
  { name: 'Sew joen1', email: 'sewjoen1@gmail.com', gender: 'male', address: '471 Duncan Avenue, New York', dob: new Date('2022-02-11T00:00:00') },
  { name: 'Sew joen2', email: 'sewjoen2@gmail.com', gender: 'male', address: '471 Duncan Avenue, New York', dob: new Date('2000-02-11T00:00:00') }
];


