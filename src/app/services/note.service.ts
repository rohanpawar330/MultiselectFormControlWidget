import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteDetails = new Subject<any>();

  constructor() { }
}
