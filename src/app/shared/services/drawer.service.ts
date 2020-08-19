import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class DrawerService {
  toggle = new EventEmitter<any>();
}
