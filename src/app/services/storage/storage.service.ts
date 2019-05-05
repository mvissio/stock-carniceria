import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveStorage( ...items) {
    items.forEach(item => {
      const division = item.split(':', 2);
      localStorage.setItem(division[0], division[1]);
    });
  }

  removeStorage(...items) {
    items.forEach(item => {
      localStorage.removeItem(item);
    });
  }

  loadStorage(item: string): string {
    return localStorage.getItem(item);
  }
}
