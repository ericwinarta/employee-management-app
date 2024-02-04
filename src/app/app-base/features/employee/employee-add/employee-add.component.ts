import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDataInterface, EmployeeService } from '../employee.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgSelectModule
  ],
  providers: [],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit {
  @Input() formMode: string;
  employeeForm: FormGroup;
  groupItems: Array<any>;
  maxDate: any;
  paramId: any = '';
  detailData: Partial<EmployeeDataInterface> = {};

  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formMode = '';
    this.groupItems = employeeSvc.dummyGroupList;
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (!this.formMode) {
      this.formMode = 'Add';
    }
    this.setMaxDate();

    this.route.paramMap.subscribe(params => {
      this.paramId = params.get('username');
    });

    if (this.formMode === 'Detail') {
      this.setDetailData();
      this.employeeForm.disable();
    } else if (this.formMode === 'Edit') {
      this.setDetailData();
    }
  }


  getform(formControlName: string) {
    return this.employeeForm.get(formControlName) as FormControl;
  }

  setMaxDate(): void {
    const dateNow = new Date();
    this.maxDate = {
      year: dateNow.getFullYear(),
      month: dateNow.getMonth() + 1,
      day: dateNow.getDate()
    }
  }

  navigateToList(): void {
    this.router.navigate([`/employee`]);
  }

  submitData(): void {
    alert('Data saved successfully!');
    this.employeeSvc.modifyEmployeeData(this.employeeForm.value, this.formMode);
    this.navigateToList();
  }

  setDetailData(): void {
    this.detailData = this.employeeSvc.getEmployeeDataByUsername(this.paramId);

    const birthdateObjValue = {
      year: this.detailData.birthDate!.getFullYear(),
      month: this.detailData.birthDate!.getMonth() + 1,
      day: this.detailData.birthDate!.getDate(),
    };

    const descriptionObjValue = {
      year: this.detailData.description!.getFullYear(),
      month: this.detailData.description!.getMonth() + 1,
      day: this.detailData.description!.getDate(),
    };

    const formattedSalary = this.formMode === 'Detail' ? this.employeeSvc.formatPrice(this.detailData.basicSalary) : this.detailData.basicSalary;

    this.getform('username').setValue(this.detailData.username);
    this.getform('email').setValue(this.detailData.email);
    this.getform('firstName').setValue(this.detailData.firstName);
    this.getform('lastName').setValue(this.detailData.lastName);
    this.getform('birthdate').setValue(birthdateObjValue);
    this.getform('basicSalary').setValue(formattedSalary);
    this.getform('status').setValue(this.detailData.status);
    this.getform('group').setValue({id: this.detailData.group, name: this.detailData.group});
    this.getform('description').setValue(descriptionObjValue);
  }
}
