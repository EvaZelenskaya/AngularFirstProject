import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor() {}
  element: any;
  form: FormGroup;
  name: string;
  autore: string;
  typeOfPerson: any;
  week: any;
  longTour: boolean;

  weeks = [
    {
      type: 'm',
      text: 'Пн',
    },
    {
      type: 'tu',
      text: 'Вт',
    },
    {
      type: 'w',
      text: 'Ср',
    },
    {
      type: 'th',
      text: 'Чт',
    },
    {
      type: 'f',
      text: 'Пт',
    },
    {
      type: 'sat',
      text: 'Сб',
    },
    {
      type: 'sun',
      text: 'Вс',
    },
  ];
  ngOnInit() {
    // localStorage.setItem('formdata', JSON.stringify(null));



    this.element = JSON.parse(localStorage.getItem('formdata') || '{}');
    this.name = this.element.name;
    this.autore = this.element.autore;
    this.typeOfPerson = this.element.typeOfPerson;
    this.week = this.element.week;
    this.longTour = this.element.longTour;

    this.form = new FormGroup({
      name: new FormControl(this.name),
      autore: new FormControl(this.autore),
      typeOfPerson: new FormControl(this.typeOfPerson),
      week: new FormControl(this.week),
      longTour: new FormControl(this.longTour),
    });

    this.form.valueChanges.subscribe(() => {
      console.log(this.form);
    });
    this.form.get('longTour')?.valueChanges.subscribe((e) => {
      if (e) {
        this.form
          .get('name')
          ?.setValidators([Validators.required, Validators.minLength(3)]);
        this.form
          .get('autore')
          ?.setValidators([Validators.required, Validators.minLength(3)]);
        this.form.get('typeOfPerson')?.setValidators([Validators.required]);
        this.form.get('week')?.setValidators([Validators.required]);
      } else {
        this.form.get('name')?.setValidators([Validators.nullValidator]);
        this.form.get('autore')?.setValidators([Validators.nullValidator]);
        this.form
          .get('typeOfPerson')
          ?.setValidators([Validators.nullValidator]);
        this.form.get('week')?.setValidators([Validators.nullValidator]);
      }
      this.form.controls['name'].updateValueAndValidity();
      this.form.controls['autore'].updateValueAndValidity();
      this.form.controls['typeOfPerson'].updateValueAndValidity();
      this.form.controls['week'].updateValueAndValidity();
    });
  }

  onSubmit() {
    localStorage.setItem('formdata', JSON.stringify(this.form.value));
  }
}
