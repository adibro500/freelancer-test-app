import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {Component, Inject, OnInit, ElementRef, ViewChild, forwardRef, EventEmitter} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/Issue';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DeleteDialogComponent } from '../delete/delete.dialog.component';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css'],
  providers:[DeleteDialogComponent]
})

export class AddDialogComponent implements OnInit{
  displayedColumns = ['Invoice No.', 'Invoice Date', 'Customer', 'Total Quantity Invoice', 'Total Amt.'];
@ViewChild('inputELmt') el: ElementRef;
public event: EventEmitter<any> = new EventEmitter();

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public dataService: DataService,
              public dialog: MatDialog,
              public comp: DeleteDialogComponent) {
              }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  changed($evt) {
    // console.log('kkk')
    // let date = new Date($evt);
    // console.log('kkk111') 
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // console.log('kkk2222')
    // this.data.invoice_date = day + '/' + month + '/' + year;
    // console.log('kkk3333')
    this.data.invoice_date = $evt;
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.data.products.forEach((li) => {
      if(li !== undefined){
      this.options.push(li.product_id+'');
      }
    }) 

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  getPost($evt){
    console.log($evt)
    let filteredIdx;
    this.options.forEach((obj,idx) => {
      if(obj == $evt){
        filteredIdx = idx;
        return;
      }
    })
    this.data = this.data.products[filteredIdx];
    // this.el.nativeElement.value = this.data.products[filteredIdx].invoice_no
    console.log(this.data)
  }
deleteItem(data){
  this.dataService.deleteIssue(this.data.invoice_no);
}


}
