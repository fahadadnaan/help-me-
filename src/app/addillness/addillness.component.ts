import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-addillness',
  templateUrl: './addillness.component.html',
  styleUrls: ['./addillness.component.css']
})
export class AddillnessComponent implements OnInit {

  angularForm = new FormGroup ({
    name: new FormControl(),
    phone: new FormControl(),
    comments: new FormControl(),
    illness: new FormControl(),
    province: new FormControl(),
    price: new FormControl(),
    imageURL: new FormControl(),
  });


  uid: string;


  data = {
    name : '' ,
    phone :  '' ,
    comments :  '' ,
    illness :  '' ,
    province :  '' ,
    price :  '',
    email: '',
    imageURL: '',
    date: '',
    fileId: ''

     };

   email: string;
   myid: string;
   itemList: AngularFireList<any>;
   itemArray = [];
   userKey: any;
   ref: AngularFireStorageReference;
   task: AngularFireUploadTask;
   downloadURL: Observable<string>;


  constructor(private afStorage: AngularFireStorage ,
     public db: AngularFireDatabase,
      public router: Router,
       private fb: FormBuilder
       , private fire: AngularFireAuth ) {

    this.createForm();

    this.itemList = db.list('illness');
    this.email = localStorage.getItem('email');
    this.myid = localStorage.getItem('uid');
    const user =  localStorage.getItem('email');
    this.email = user;

    this.uid =  localStorage.getItem('uid');
    console.log( 'uid: ' + this.uid);

  }

  createForm() {
    this.angularForm = this.fb.group({
      name: ['', Validators.required ],
      phone: ['', Validators.required ],
      comments: ['', Validators.required ],
      illness: ['', Validators.required ],
      province: ['', Validators.required ],
      price: ['', Validators.required ],
      imageURL: ['', Validators.required ],

    });
}

  ngOnInit() {
    console.log(this.email);
    console.log(this.myid);
    if (this.fire.auth.currentUser === null) {
      this.router.navigate(['/']);
    }

  }




  upload(event) {
    this.itemArray = [];
    console.log('start upload');
    const id = Math.random().toString(36).substring(2);
    this.afStorage.upload(id, event.target.files[0]).then(() => {
    const task = this.ref = this.afStorage.ref(id);
    const downloadURL = this.ref.getDownloadURL().subscribe(url => {
      if (url) {
        this.data.imageURL =  url;
        this.data.fileId = id;
        localStorage.setItem('fileId', this.data.fileId );
       }

    console.log('storing image is done');
    });
    }).catch((error) => {
alert(error);
    });
    }

  insertSkill( ) {

   const  d = new Date();
   const time = [d.getMonth() + 1,
                 d.getDate(),
                 d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                 d.getMinutes(),
                 d.getSeconds()].join(':');

    this.itemList.push({
      name : this.data.name  ,
      phone :  this.data.phone ,
      comments : this.data.comments ,
      province :  this.data.province ,
      illness :  this.data.illness ,
      price :  this.data.price  ,
      email:  this.email,
      imageURL: this.data.imageURL,
      uid: this.myid,
      decs: 0 - Date.now(),
      time: time,
      fileId: this.data.fileId
    }).then(() => {
      alert('تم أضافة الحالة المرضية بنجاح ');
    });

this.router.navigate(['/myillness']);
  }


}

export class ListItemClass {
  $key: string;
  name: string;
  comments: string;
  phone:  string;
  province: string;
  illness:  string;
  price: string;
  email: string;
}
