import { Injectable } from '@angular/core';

@Injectable()

export class UploadService {

  constructor() { }

  public files = [];

  getDataFile(fieldName) {
    if (typeof this.files[fieldName] !== 'undefined' && this.files[fieldName]) {
      return this.files[fieldName];
    }
    return false;
  }

  setDataFile(fieldName, file) {
    this.files[fieldName] = file;
  }

}
