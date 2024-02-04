import { Component, OnInit } from '@angular/core';
import { EmployeeDataInterface, EmployeeService } from './employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [DatePipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeData: Array<EmployeeDataInterface>;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  displayedData: Array<EmployeeDataInterface>;
  totalPages: number = 0;
  sortOrder = { column: '', direction: '' };
  usernameFc: FormControl;
  emailFc: FormControl;

  constructor(
    public employeeSvc: EmployeeService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.employeeData = [];
    this.displayedData = [];
    this.usernameFc = new FormControl('');
    this.emailFc = new FormControl('');
  }
  
  ngOnInit(): void {
    this.setFilterValue();

    this.employeeSvc.obsEmployeeData().subscribe(
      result => {
        this.employeeData = result;
        this.getPaginatedItems();
      }
    );

    this.filterData();
  }

  getPaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedData = this.employeeData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pages(): number[] {
    const currentPage = this.currentPage;
    this.totalPages = Math.ceil(this.employeeData.length / this.itemsPerPage);

    if (this.totalPages <= 5) {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }

    const pages: number[] = [];
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push(this.totalPages);
    } else if (currentPage >= this.totalPages - 1) {
      pages.push(1);
      for (let i = this.totalPages - 2; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(this.totalPages);
    }

    return pages;
  }

  setCurrentPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
    this.getPaginatedItems();
  }

  sortData(column: string) {
    if (this.sortOrder.column === column) {
      this.sortOrder.direction = this.sortOrder.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder.column = column;
      this.sortOrder.direction = 'asc';
    }

    const data: any = this.employeeData;

    data.sort((a: any, b: any) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortOrder.direction === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortOrder.direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.employeeData = data;
    this.getPaginatedItems();
  }

  formatDate(date: any): string {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate || date;
  }

  filterData(): void {
    this.usernameFc.valueChanges.subscribe(
      value => {
        this.employeeSvc.searchEmployee(this.usernameFc.value, this.emailFc.value);
      }
    );

    this.emailFc.valueChanges.subscribe(
      value => {
        this.employeeSvc.searchEmployee(this.usernameFc.value, this.emailFc.value);
      }
    );
  }

  setFilterValue(): void {
    this.usernameFc.setValue(this.employeeSvc.filterData.searchByUsername);
    this.emailFc.setValue(this.employeeSvc.filterData.searchByEmail);
  }

  /* resetFilter(): void {
    this.usernameFc.setValue(this.employeeSvc.filterData.searchByUsername);
    this.emailFc.setValue(this.employeeSvc.filterData.searchByEmail);
  } */

  deleteEmployee(username: string): void {
    alert('Data deleted successfully');
    this.employeeSvc.deleteEmployeeData(username);
    this.employeeSvc.resetFilter();
    this.usernameFc.setValue('');
    this.emailFc.setValue('');
    this.getPaginatedItems();
  }

  navigateToAddEmployee(): void {
    this.router.navigate(['/employee/add']);
  }

  navigateToDetailEmployee(username: string): void {
    this.router.navigate([`/employee/detail/${username}`]);
  }

  navigateToEditEmployee(username: string): void {
    this.router.navigate([`/employee/edit/${username}`]);
  }
}
