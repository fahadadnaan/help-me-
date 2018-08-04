import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-callus',
  templateUrl: './callus.component.html',
  styleUrls: ['./callus.component.css']
})
export class CallusComponent implements OnInit {
  angForm: FormGroup;


  constructor(private fb: FormBuilder ,
     private router: Router,
      public af: AngularFireDatabase) {
    this.createForm();
   }



  ngOnInit() {
  }


  createForm() {

    this.angForm = this.fb.group({
      subject: ['', Validators.required ],
      email: ['', Validators.required ],
      message: ['', Validators.required ],
    });
}

  onSubmit() {
    const {subject, email, message} = this.angForm.value;
    const  d = new Date();
   const time = [d.getMonth() + 1,
               d.getDate(),
               d.getFullYear()].join('/') + ' ' +
              [d.getHours(),
               d.getMinutes(),
          d.getSeconds()].join(':');
    const angForm = { subject, email, message, time, decs: 0 - Date.now() };
    this.af.list('/messages').push(angForm);

    this.angForm.reset();
alert('تم ارسال الرسالة بنجاح سوف نقوم بالرد عليك باقرب وقت ممكن ');


  }

}
