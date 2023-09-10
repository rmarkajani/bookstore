import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  jsonData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCSV();
  }

  loadCSV(): void {
    this.http.get('assets/booklist.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let csvToRowArray = data.split('\n');
        let headers = csvToRowArray[0].split(',');

        for (let index = 1; index < csvToRowArray.length; index++) {
          let row = csvToRowArray[index].split(',');
          let obj: any = {};
          for (
            let headerIndex = 0;
            headerIndex < headers.length;
            headerIndex++
          ) {
            obj[headers[headerIndex].toLocaleLowerCase()] = row[headerIndex];
          }
          this.jsonData.push(obj);
        }
        console.log(this.jsonData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
