import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  base_url: string =
    'https://hindi-kahaniya-375e9-default-rtdb.firebaseio.com/';
  constructor(public http: HttpClient) {}

  convertObjToArr(obj: any) {
    let returnArr: any[] = [];
    Object.keys(obj).forEach((objKey) => {
      let value = obj[objKey];
      if (typeof value == 'object') {
        value['key'] = objKey;
        returnArr.push(value);
      }
    });
    return returnArr;
  }

  readCategoriesFromDb() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.base_url}categories.json`).subscribe(
        (res) => {
          console.log('res:: categories page', res);
          let list = this.convertObjToArr(res);
          resolve(list);
        },
        (err) => {
          resolve([]);
        }
      );
    });
  }

  getSpecificCategoryData(catId: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.base_url}categories/${catId}.json`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          resolve('');
        }
      );
    });
  }

  getSpecificCatStoriesList(catId: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.base_url}stories/${catId}.json`).subscribe(
        (res) => {
          let list: any[] = [];
          if (res) list = this.convertObjToArr(res);
          if (list.length > 0) {
            list.forEach((element) => {
              element.categoryId = catId;
            });
          }
          resolve(list);
        },
        (err) => {
          resolve([]);
        }
      );
    });
  }

  addStory(catId: string, storyId: string, storyObj: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put(`${this.base_url}stories/${catId}/${storyId}.json`, storyObj)
        .subscribe(
          (res) => {
            resolve('');
          },
          (err) => {
            resolve('');
          }
        );
    });
  }
}
