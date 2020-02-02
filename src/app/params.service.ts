import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  private data: { [id: string]: any } = {};

  constructor() { }

  push<T>(key: string, value: T) {
    this.data[key] = value;
  }

  get<T>(key: string): T {
    return this.data[key] as T;
  }
}
