import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeDataModel } from "src/app/EmployeeData.model";
import { JSON_APIService } from "src/Services/json-api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  formValues!: FormGroup;
  EmployeeDataObj: EmployeeDataModel = new EmployeeDataModel();
  EmployeeDetails!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  showHelp!: boolean;

  constructor(private api: JSON_APIService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValues = this.formBuilder.group({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      salary: "",
    });
    this.getEmployeeDetails();
  }
  //show and hide the add button
  showAddButton() {
    this.showAdd = true;
    this.showUpdate = false;
  }
  showUpdateButton() {
    this.showAdd = false;
    this.showUpdate = true;
  }

  getEmployeeDetails() {
    this.api.getEmployee().subscribe((data) => {
      this.EmployeeDetails = data;
      this.EmployeeDetails.length === 0
        ? (this.showHelp = true)
        : (this.showHelp = false);
    });
  }

  postEmployeeDetails() {
    this.EmployeeDataObj.firstName = this.formValues.value.firstName;
    this.EmployeeDataObj.lastName = this.formValues.value.lastName;
    this.EmployeeDataObj.email = this.formValues.value.email;
    this.EmployeeDataObj.salary = this.formValues.value.salary;
    this.EmployeeDataObj.mobile = this.formValues.value.mobile;

    this.api.postEmployee(this.EmployeeDataObj).subscribe(
      (data) => {
        console.log(data);
        alert("User Were add successfully");
        //close the form automatic
        let closeBtn = document.getElementById("close");
        closeBtn?.click();
        console.log();
        this.formValues.reset();
        this.getEmployeeDetails();
      },
      (err) => {
        console.log("something went WRONG" + err);
      }
    );
  }

  deleteEmployee(index: any) {
    console.log(this.api.deleteEmployee(index));
    this.api.deleteEmployee(index).subscribe((data) => {
      alert("Employee was Deleted");
      this.getEmployeeDetails();
    });
  }

  EditValues(index: any) {
    this.showUpdateButton();

    //store the id of the particular employee
    this.EmployeeDataObj.id = index.id;

    this.formValues.controls["firstName"].setValue(index.firstName);
    this.formValues.controls["lastName"].setValue(index.lastName);
    this.formValues.controls["email"].setValue(index.email);
    this.formValues.controls["mobile"].setValue(index.mobile);
    this.formValues.controls["salary"].setValue(index.salary);

    console.log(this.formValues.value);
  }

  UpdateEmployeeDetails() {
    this.EmployeeDataObj.firstName = this.formValues.value.firstName;
    this.EmployeeDataObj.lastName = this.formValues.value.lastName;
    this.EmployeeDataObj.email = this.formValues.value.email;
    this.EmployeeDataObj.salary = this.formValues.value.salary;
    this.EmployeeDataObj.mobile = this.formValues.value.mobile;

    this.api
      .updateEmployee(this.EmployeeDataObj, this.EmployeeDataObj.id)
      .subscribe((data) => {
        alert("Updated Successfully");
        let closeBtn = document.getElementById("close");
        closeBtn?.click();
        console.log();
        this.formValues.reset();
        this.getEmployeeDetails();
      });
  }
}
