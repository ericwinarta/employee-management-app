import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface EmployeeDataInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: Date;
}

export interface FilterDataInterface {
  searchByUsername: string;
  searchByEmail: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeData: Array<EmployeeDataInterface>;
  private employeeSubject: BehaviorSubject<Array<EmployeeDataInterface>>;
  private dummyFirstNameList: Array<string>;
  private dummyLastNameList: Array<string>;
  private dummyStatusList: Array<string>;
  public dummyGroupList: Array<any>;
  private employeeHasBeenSet: boolean;

  filterData: FilterDataInterface;

  constructor() { 
    this.employeeData = [];
    this.employeeSubject = new BehaviorSubject(this.employeeData);
    this.dummyFirstNameList = ['Ali', 'Agung', 'Nada', 'Angel', 'Sofia', 'Thomas', 'Bambang', 'Rey', 'Yanto', 'Bastian', 'John', 'Rena', 'Siti', 'Santi', 'Amel', 'Alex', 'Nurul'];
    this.dummyLastNameList = ['Saputra', 'Riawan', 'Hartono', 'Siregar', 'Ramadhan', 'Pamungkas', 'Tambunan', 'Nainggolan', 'Wijaya', 'Prasetyo', 'Santoso', 'Sungkar', 'Gunawan'];
    this.dummyStatusList = ['full_time', 'contract', 'internship', 'part_time'];
    this.dummyGroupList = [
      { id :'ABC', name: 'ABC' }, { id :'XYZ', name: 'XYZ' }, { id :'KLM', name: 'KLM' }, { id :'RST', name: 'RST' }, { id :'JKL', name: 'JKL' },
      { id :'PQR', name: 'PQR' }, { id :'GHI', name: 'GHI' }, { id :'MNO', name: 'MNO' }, { id :'QRS', name: 'QRS' }, { id :'STU', name: 'STU' }
    ];
    this.employeeHasBeenSet = false;

    if (this.employeeHasBeenSet === false) {
      this.setEmployeeData();
    }

    this.filterData = {
      searchByUsername: '',
      searchByEmail: ''
    }
  }

  obsEmployeeData(): Observable<Array<EmployeeDataInterface>> {
    return this.employeeSubject.asObservable();
  }

  setEmployeeData(): void {
    let totalEmployee: number = 100;
    const startDate = new Date(1950, 0, 1);
    const endDate = new Date(2003, 0, 1);

    for (let i=0;i<totalEmployee;i++) {
      const randomFirstName = this.dummyFirstNameList[Math.floor(Math.random() * this.dummyFirstNameList.length)];
      const randomLastName = this.dummyLastNameList[Math.floor(Math.random() * this.dummyLastNameList.length)];

      const data: EmployeeDataInterface = {
        username: 'user_' + i,
        firstName: randomFirstName,
        lastName: randomLastName,
        email: randomFirstName.toLowerCase() + '.' + randomLastName.toLowerCase() + '@gmail.co.id',
        birthDate: this.generateRandomDate(startDate, endDate),
        basicSalary: Math.floor(Math.random() * (30000000 - 6000000 + 1)) + 6000000,
        status: this.dummyStatusList[Math.floor(Math.random() * this.dummyStatusList.length)],
        group: this.dummyGroupList[Math.floor(Math.random() * this.dummyGroupList.length)].name,
        description: this.generateRandomDate(startDate, endDate)
      }

      this.employeeData.push(data);
    }

    this.employeeHasBeenSet = true;
  }

  generateRandomDate(start: Date, end: Date): Date {
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime);
  }

  formatNumber(num: number): string {
    return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : '-';
  }

  formatPrice(price = 0): string {
    return `Rp ${this.formatNumber(price)}`;
  }

  searchEmployee(username: string, email: string): void {
    this.filterData = {
      searchByUsername: username,
      searchByEmail: email
    };

    const filteredData = this.employeeData.filter(
      data => data.username.toLowerCase().includes(username.toLowerCase()) && data.email.toLowerCase().includes(email.toLowerCase())
    );
    
    if (username || email) {
      this.employeeSubject.next(filteredData);
    } else {
      this.employeeSubject.next(this.employeeData);
    }
  }

  resetFilter(): void {
    this.employeeSubject.next(this.employeeData);
    this.filterData = {
      searchByUsername: '',
      searchByEmail: ''
    }
  }

  modifyEmployeeData(data: any, type: string): void {
    const dataToSend: EmployeeDataInterface = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: new Date(data.birthdate.year, data.birthdate.month-1, data.birthdate.day),
      basicSalary: data.basicSalary,
      status: data.status,
      group: data.group.name,
      description: new Date(data.description.year, data.description.month-1, data.description.day)
    };

    if (type === 'Edit') {
      const index = this.employeeData.findIndex(d => d.username === data.username);
      if (index !== -1) {
        this.employeeData[index] = dataToSend;
      }
    } else {
      this.employeeData.push(dataToSend);
    }
  }

  getEmployeeDataByUsername(username: string): Partial<EmployeeDataInterface> {
    const detailData = this.employeeData.filter(data => data.username === username);
    return detailData.length > 0 ? detailData[0] : {};
  }

  deleteEmployeeData(username: string): void {
    const index = this.employeeData.findIndex(data => data.username === username);
    if (index !== -1) {
      this.employeeData.splice(index, 1);
    }
  }
}
