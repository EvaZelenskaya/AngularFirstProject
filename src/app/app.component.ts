import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder} from "@angular/forms";
import {EMPTY} from 'rxjs';
import {tap, distinctUntilChanged, switchMap, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent  {
form: FormGroup;
  weeks = [{
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
    }

  ];
    ngOnInit() {
      localStorage.setItem("formdata", JSON.stringify(null));
    this.form = new FormGroup({
      name: new FormControl(''),
      autore: new FormControl(''),
      typeOfPerson: new FormControl('mec'),
      week: new FormControl('f'),
      longTour: new FormControl(false)
    })
      this.form.valueChanges.subscribe(() => {
        console.log(this.form)
      })
      this.form.get('longTour')?.valueChanges.subscribe(e => {
        if(e) {
          this.form.get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
          this.form.get('autore')?.setValidators([Validators.required, Validators.minLength(3)]);
          this.form.get('typeOfPerson')?.setValidators([Validators.required]);
          this.form.get('week')?.setValidators([Validators.required]);
          this.form.updateValueAndValidity();
        } else {
          this.form.get('name')?.setValidators([Validators.nullValidator]);
          this.form.get('autore')?.setValidators([Validators.nullValidator]);
          this.form.get('typeOfPerson')?.setValidators([Validators.nullValidator]);
          this.form.get('week')?.setValidators([Validators.nullValidator]);
          this.form.updateValueAndValidity();
        }
        this.form.controls['name'].updateValueAndValidity();
        this.form.controls['autore'].updateValueAndValidity();
        this.form.controls['typeOfPerson'].updateValueAndValidity();
        this.form.controls['week'].updateValueAndValidity();

      })

  }

  onSubmit() {
    localStorage.setItem("formdata", JSON.stringify(this.form.value));
  }

}
