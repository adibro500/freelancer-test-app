import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {Component, Inject, OnInit, ElementRef, ViewChild, forwardRef, EventEmitter, OnChanges, OnDestroy} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/Issue';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DeleteDialogComponent } from '../delete/delete.dialog.component';
import {AppComponent} from '../../app.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css'],
  providers:[DeleteDialogComponent]
})

export class AddDialogComponent implements OnInit, OnChanges{
  displayedColumns = ['Invoice No.', 'Invoice Date', 'Customer', 'Total Quantity Invoice', 'Total Amt.'];
@ViewChild('inputELmt') el: ElementRef;
public event: EventEmitter<any> = new EventEmitter();
byControl = new FormControl();

  myControl = new FormControl();
  options: string[] = [];
  optCustomers: string[] = [];
  products: any[] = [];
  filteredOptions: Observable<string[]>;
  filteredCustomers: Observable<string[]>;
  deleteBtnEnable:boolean = false;
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
    const filterValue = value;

    return this.options.filter(option => option.includes(filterValue));
  }
  private _filterCustomers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optCustomers.filter(optCustomer => optCustomer.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.data.products.forEach((li) => {
      if(li !== undefined){
      this.options.push(li.product_id+'');
      }
    }) 
    this.data.products.forEach((li) => {
      if(li !== undefined){
      this.optCustomers.push(li.Customer);
      }
    }) 
    console.log('jjjj',this.optCustomers);

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredCustomers = this.byControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCustomers(value))
    );

    this.products = this.data.products;
  }
  getPost($evt){
    if($evt !== undefined || $evt !== ''){
      this.deleteBtnEnable = true;
      console.log($evt)
    let filteredIdx;
    this.options.forEach((obj,idx) => {
      if(obj == $evt){
        filteredIdx = idx;
        return;
      }
    })
    this.data = this.products[filteredIdx];
    this.products[filteredIdx].invoice_date = new Date(this.data.products[filteredIdx].invoice_date);

    // this.el.nativeElement.value = this.data.products[filteredIdx].invoice_no
    console.log(this.data)
    // this.byCustomer(this.data.Customer)
  } else 
  this.deleteBtnEnable = false;

}

  byCustomer(evt){
    if(evt !== undefined || evt !== ''){
      this.deleteBtnEnable = true;
    const foundIndex = this.products.findIndex(x => x.Customer === evt);

    this.data = this.products[foundIndex];
    this.products[foundIndex].invoice_date = new Date(this.products[foundIndex].invoice_date);

    // this.el.nativeElement.value = this.data.products[filteredIdx].invoice_no
    console.log(this.data)
    // this.getPost(this.data.product_id)
  } else
  this.deleteBtnEnable = false;

}
deleteItem(data){
  if(this.data)
  this.dataService.deleteIssue(this.data.invoice_no);
  else
  this.data.invoice_no = -1
}

ngOnChanges() {
  this.dialogRef.afterClosed().subscribe(result => {
    if (result === 2|| result === 1) {
      this.options =[];
      this.optCustomers = [];
    }})
    if(!this.data) {
      this.deleteBtnEnable = false
    }
}
events: string[] = [];

addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  this.events.push(`${type}: ${event.value}`);
}

valueChanged($evt) {
  if($evt){
  console.log($evt)
  let year = $evt.getFullYear()
  let month = $evt.getMonth()
  let day = $evt.getDate()
  return day+'/'+month +'/'+year;
}
}
}
