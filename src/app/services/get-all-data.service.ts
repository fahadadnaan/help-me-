import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from 'angularfire2/database';

@Injectable()
export class GetAllDataService {

  constructor(private afDB: AngularFireDatabase) { }
  getData(field) {
    return this.afDB.list(field, ref => {
      return ref.orderByChild('decs');
    }).snapshotChanges().map(actions => {
      return actions.map(action => ({ ['$key']: action.key, ...action.payload.val() }));
    });
  }
}
