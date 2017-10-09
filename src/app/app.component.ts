import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {
    this.fetchEmployees();
  }

  nameCount = 0;
  ageCount = 0;
  cityCount = 0;
  rowCount = 5;
  offset = 0;
  employees = [];
  sortOptions = {};
  searchText = '';
  totalRowCount = 0;
  totalPages = 1;

  fillDB() {

    const employees = [
      {name: 'Hitesh', age: 22, city: 'Jaipur'},
      {name: 'Jaideep', age: 21, city: 'Melbourne'},
      {name: 'Rohan', age: 24, city: 'Delhi'},
      {name: 'Aniruddh', age: 20, city: 'Pune'},
      {name: 'Mayank', age: 21, city: 'Agra'},
      {name: 'Shruti', age: 23, city: 'Chennai'},
      {name: 'Ram', age: 55, city: 'Ahmedabad'},
      {name: 'Ritu', age: 46, city: 'Jaipur'},
      {name: 'Mohan', age: 52, city: 'Jaipur'},
      {name: 'Sameer', age: 25, city: 'Mumbai'},
      {name: 'Saurabh', age: 25, city: 'Lucknow'},
      {name: 'Mahek', age: 19, city: 'Surat'},
      {name: 'Payal', age: 12, city: 'Kanpur'},
      {name: 'Bhavesh', age: 4, city: 'Rajkot'},
      {name: 'Jignesh', age: 6, city: 'Jamnagar'},
      {name: 'Vikas', age: 33, city: 'Mehsana'},
      {name: 'Amit', age: 29, city: 'Ahmedabad'},
      {name: 'Prateek', age: 28, city: 'Pune'},
      {name: 'Kishan', age: 26, city: 'Bangalore'},
      {name: 'Jigar', age: 9, city: 'Jamnagar'},
      {name: 'Abhinesh', age: 25, city: 'Gurgaon'},
      {name: 'Mihir', age: 26, city: 'Nadiad'},
      {name: 'Dharmesh', age: 32, city: 'Bardoli'},
      {name: 'Gunjan', age: 15, city: 'Noida'},
      {name: 'Ishita', age: 17, city: 'Jaipur'},
      {name: 'Mannat', age: 19, city: 'Ahmedabad'},
      {name: 'Naman', age: 13, city: 'Nagpur'},
      {name: 'Kunal', age: 17, city: 'Kolkata'},
      {name: 'Nilasha', age: 5, city: 'Indore'},
      {name: 'Yash', age: 8, city: 'Chandigarh'},
      {name: 'Tanisha', age: 21, city: 'Allahbad'},
      {name: 'Tushar', age: 24, city: 'Kolkata'},
      {name: 'Jay', age: 23, city: 'Rajkot'},
      {name: 'Uvesh', age: 25, city: 'Jamnagar'},
      {name: 'Vimal', age: 30, city: 'Ahmedabad'}
    ];

    // Making the HTTP request to save post to MongoDB
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://localhost:8000/fill-db', JSON.stringify(employees), {headers: headers}).subscribe(() => {
      console.log('Network request was successfull');
    }, (err) => {
      console.log('Error occured', err);
    });

  }

  fetchEmployees() {

    const filterOptions = {sortOptions: this.sortOptions, rowCount: +this.rowCount, offset: +this.offset, searchText: this.searchText};

    console.log('Filter Options: ');
    console.log(filterOptions);

    // Making the HTTP request to save post to MongoDB
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://localhost:8000/fetch-employees', JSON.stringify(filterOptions), {headers: headers}).subscribe((data) => {
      this.employees = data.json().obj;
      this.totalRowCount = data.json().count;
      this.totalPages = Math.ceil(this.totalRowCount / this.rowCount);
      console.log('Fetched Employees');
      console.log(data.json());
    }, (err) => {
      console.log('Error fetching employees');
    });

  }

  changeOffset(offset, event) {

    event.target.parentNode.parentNode.childNodes.forEach((node) => {
      node.className = '';
    });
    event.target.parentNode.className = 'active';
    this.offset = (offset - 1) * this.rowCount;
    this.fetchEmployees();

  }

  changeRowCount() {

    this.offset = 0;
    this.fetchEmployees();

  }

  toggleNameOrder(event) {

    console.log(event.target.childNodes[1]);

    this.nameCount++;
    const rem = this.nameCount % 3;

    if (rem === 0) {
      delete this.sortOptions['name'];
      event.target.childNodes[1].className = '';
    } else if (rem === 1) {
      this.sortOptions['name'] = 1;
      event.target.childNodes[1].className = 'glyphicon chevron glyphicon-chevron-up';
    } else if (rem === 2) {
      this.sortOptions['name'] = -1;
      event.target.childNodes[1].className = 'glyphicon chevron glyphicon-chevron-down';
    }

    this.fetchEmployees();

  }

  toggleAgeOrder(event) {

    this.ageCount++;
    const rem = this.ageCount % 3;

    if (rem === 0) {
      delete this.sortOptions['age'];
      event.target.childNodes[1].className = '';
    } else if (rem === 1) {
      this.sortOptions['age'] = 1;
      event.target.childNodes[1].className = 'glyphicon chevron glyphicon-chevron-up';
    } else if (rem === 2) {
      this.sortOptions['age'] = -1;
      event.target.childNodes[1].className = 'glyphicon chevron glyphicon-chevron-down';
    }

    this.fetchEmployees();

  }

  toggleCityOrder(event) {

    this.cityCount++;
    const rem = this.cityCount % 3;

    if (rem === 0) {
      delete this.sortOptions['city'];
      event.target.childNodes[1].className = '';
    } else if (rem === 1) {
      this.sortOptions['city'] = 1;
      event.target.childNodes[1].className = 'glyphicon chevron glyphicon-chevron-up';
    } else if (rem === 2) {
      this.sortOptions['city'] = -1;
      event.target.childNodes[1].className = 'glyphicon chevron glyphicon-chevron-down';
    }

    this.fetchEmployees();

  }

  getNumber(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  }

}
