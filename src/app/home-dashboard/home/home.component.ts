import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //form group created 
  form2: FormGroup;
  form1: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  /**
   * inialized value of form1 with default and form1 empty
   */
  ngOnInit() {
    this.form1 = this.fb.group({
      list: this.fb.array([
        "0-24",
        "25-99",
        "50-99",
        "100-249",
        "500-999",
        "1000-4999",
        "5000-9999",
        "10000-49999",
        "50000-100000",
        ">100000"
      ])
    });

    this.form2 = this.fb.group({
      list: this.fb.array([
      ])
    });

  }

  /**
   * select all function to move all item from left to right 
   */
  _selectAll() {
    const form1 = this.form1.get('list') as FormArray
    const form2 = this.form2.get('list') as FormArray;
    console.log(form1, form2)
    this._shiftAll(form1, form2);
  }

  /**
   * clear function to clear all the selected item in right box
   */
  _clearAll() {
    const form1 = this.form1.get('list') as FormArray
    const form2 = this.form2.get('list') as FormArray;
    this._shiftAll(form2, form1)
  }

  /**
   * common code for swipping of form data from left to right 
   * and right to left
   * @param form1 contains form data of source
   * @param form2 contains form data of target
   */
  _shiftAll(form1: any, form2: any) {
    form1.value.forEach((element, index) => {
      if (form2.value) {
        form2.setControl(form2.value.length + index, new FormControl(element));
      } else {
        form2.setControl(index, new FormControl(element));
      }
      // form1.removeAt(index);
    });
    form1.controls.length = 0;
    form1.value.length = 0;
  }

  /**
   * function on item click to move from left to right
   * @param index index no. of selected itme
   */
  removeFromLeft(index) {
    const form1 = this.form1.get('list') as FormArray
    const form2 = this.form2.get('list') as FormArray;
    setTimeout(() => {
      form2.setControl(form2.value.length + 1, new FormControl(form1.value[index]));
      form1.removeAt(index);
    }, 100);

  }

  /**
   * function on item click to move from right to left
   * @param index index no. of selected itme
   */
  removeFromRight(index) {
    const form1 = this.form1.get('list') as FormArray
    const form2 = this.form2.get('list') as FormArray;
    setTimeout(() => {
      form1.setControl(form1.value.length + 1, new FormControl(form2.value[index]));
      form2.removeAt(index);
    }, 100);
  }

}