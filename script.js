class Employee {
    constructor(firstName, lastName, dob, doj, type, department, position, report, salary, location, email, phone, casualLeaves = 15, sickLeaves = 5, annualLeaves = 15) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.doj = doj;
        this.type = type;
        this.department = department;
        this.position = position;
        this.report = report;
        this.salary = salary;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.casualLeaves = casualLeaves;
        this.sickLeaves = sickLeaves;
        this.annualLeaves = annualLeaves;
    }

    calcAge() {
        let today = new Date();
        let splitDate = this.dob.split("-");
        let dob = new Date(Number(splitDate[0]), Number(splitDate[1]), Number(splitDate[2]));
        this.age = today.getFullYear() - dob.getFullYear() + " years";
    }
    
    calcTenure() {
        let today = new Date();
        let splitDate = this.doj.split("-");
        let doj = new Date(Number(splitDate[0]), Number(splitDate[1]), Number(splitDate[2]));
        if(doj.getMonth() == today.getMonth()) {
            this.tenure = Number(today.getDate()) - Number(doj.getDate()) + " days";
        }
        else if(doj.getFullYear() == today.getFullYear()) {
            this.tenure = Number(today.getMonth()) - Number(doj.getMonth()) + " months";
        }
        else this.tenure = today.getFullYear() - doj.getFullYear() + " years";
    }
}

const dashboardBtn = document.getElementById("dashboard-button");
const addEmployeeBtn = document.getElementById("add-employee-button");
const addEmployeeDivBtn = document.getElementById("add-new-employee");
const addNewEmployeeForm = document.getElementById("add-new-employee-form");
const viewAllEmployeesBtn = document.getElementById("view-all-employees");
const employeeSelector = document.querySelectorAll(".employee-selector")
const additionalEmployeeDetailsTable = document.getElementById("additional-employee-details-table");
const employeeLeaveSelector = document.getElementById("employee-leave-selector");

let employeesArr = [];
let totalEmployees = 0;
const employeeStorage = window.localStorage;

let content = employeeStorage.getItem("Employee Details");
if(content != null) {
    let contentObj = JSON.parse(content);
    totalEmployees = contentObj.length;
    contentObj.forEach((ele) => {
        employeesArr.push(ele);
    })
}

const employeeTableDetailsArr = ["Name", "Date Of Birth", "Age", "Date Of Joining", "Tenure", "Type", "Department", "Position", "Reports To", "Salary", "Location", "E-Mail", "Phone No"];

const updateTotalEmployees = () => {
    $('#total-employees').html(`${totalEmployees}`)
}

$("#add-new-employee-form").hide();
$("#employees-table-div").hide();
$("#additional-info-div").hide();
$("#assign-leave-div").hide();
$("#remove-employee-div").hide();

$("#assign-leave").click(() => {
    populateReportsSelector();
    $("#assign-leave-div").show();
})

$("#remove-employee").click(() => {
    populateReportsSelector();
    $("#remove-employee-div").show();
})

updateTotalEmployees();

const addNewEmployee = () => {
    let selectors = document.querySelectorAll("#add-new-employee-form select");
    let inputs = document.querySelectorAll("#add-new-employee-form input");
    let newEmployee = new Employee(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, 
                                    selectors[0].value, selectors[1].value, selectors[2].value, selectors[3].value,
                                    inputs[4].value, selectors[4].value, inputs[5].value, inputs[6].value,);
    
    console.log(newEmployee);
    newEmployee.calcAge();
    newEmployee.calcTenure();
    employeesArr.push(newEmployee);
    employeeStorage.setItem("Employee Details", JSON.stringify(employeesArr));
    clearInputFields(inputs);
    totalEmployees++;
    populateReportsSelector();
}

const clearInputFields = (inputFields) => {
    inputFields.forEach((ele) => {
        ele.value = "";
    })
}

const populateReportsSelector = () => {
    let content = employeeStorage.getItem("Employee Details");
    let contentObj = JSON.parse(content);

    employeeSelector.forEach((selector) => {
        selector.innerHTML = "";
        let defaultOption = document.createElement("option");
        defaultOption.textContent = "CEO";
        selector.appendChild(defaultOption);

        contentObj.forEach((ele) => {
            let option = document.createElement("option");
            option.textContent = ele.firstName;
            selector.appendChild(option);
        })
    })
}

addEmployeeDivBtn.addEventListener("click", () => {
    $("#dashboard").hide();
    $("#add-new-employee-form").show();
    $("#additional-info-div").hide();
    $("#employees-table-div").hide();
    updateTotalEmployees();
    populateReportsSelector();
})
addEmployeeBtn.addEventListener("click", addNewEmployee);

dashboardBtn.addEventListener("click", () => {
    $("#dashboard").show();
    $("#add-new-employee-form").hide();
    $("#additional-info-div").hide();
    $("#employees-table-div").hide();
    updateTotalEmployees();
})

populateAdditionalInfo = (query) => {
    $("#employees-table-div").hide();
    $("#dashboard").hide();
    $("#add-new-employee-form").hide();
    $("#additional-info-div").show();

    let content = employeeStorage.getItem("Employee Details");
    let contentObj = JSON.parse(content);

    contentObj.forEach((ele) => {
        if(ele.firstName == query) {
            $('#casual-leaves').html(`${ele.casualLeaves} / 15`);
            $('#sick-leaves').html(`${ele.sickLeaves} / 5`);
            $('#annual-leaves').html(`${ele.annualLeaves} / 15`);

            let element = `
            <tr><td>${employeeTableDetailsArr[0]}</td><td>:</td><td>${ele.firstName + " " + ele.lastName}</td></tr>
            <tr><td>${employeeTableDetailsArr[1]}</td><td>:</td><td>${ele.dob}</td></tr>
            <tr><td>${employeeTableDetailsArr[2]}</td><td>:</td><td>${ele.age}</td></tr>
            <tr><td>${employeeTableDetailsArr[3]}</td><td>:</td><td>${ele.doj}</td></tr>
            <tr><td>${employeeTableDetailsArr[4]}</td><td>:</td><td>${ele.tenure}</td></tr>
            <tr><td>${employeeTableDetailsArr[5]}</td><td>:</td><td>${ele.type}</td></tr>
            <tr><td>${employeeTableDetailsArr[6]}</td><td>:</td><td>${ele.department}</td></tr>
            <tr><td>${employeeTableDetailsArr[7]}</td><td>:</td><td>${ele.position}</td></tr>
            <tr><td>${employeeTableDetailsArr[8]}</td><td>:</td><td>${ele.report}</td></tr>
            <tr><td>${employeeTableDetailsArr[9]}</td><td>:</td><td>${ele.salary}</td></tr>
            <tr><td>${employeeTableDetailsArr[10]}</td><td>:</td><td>${ele.location}</td></tr>
            <tr><td>${employeeTableDetailsArr[11]}</td><td>:</td><td>${ele.email}</td></tr>
            <tr><td>${employeeTableDetailsArr[12]}</td><td>:</td><td>${ele.phone}</td></tr>`;
            additionalEmployeeDetailsTable.innerHTML = element;
            console.log(ele.firstName);
        }
    })
}

viewAllEmployeesBtn.addEventListener("click", () => {
    let content = employeeStorage.getItem("Employee Details");
    $("#dashboard").hide();
    if(content != null) {
        $("#additional-info-div").hide();
        $("#add-new-employee-form").hide();
        $("#employees-table-div").show();
        let tableBody = document.getElementById("employees-table-body");
        tableBody.innerHTML = "";
        let contentObj = JSON.parse(content);
        console.log(contentObj);
        let i = 1;

        contentObj.forEach((ele) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td class="align-middle">${i}</td>
            <td class="align-middle">${ele.firstName + " " + ele.lastName}</td>
            <td class="align-middle">${ele.position}</td>
            <td class="align-middle">${ele.report}</td>
            <td class="align-middle">${ele.department}</td>
            <td class="align-middle">${ele.type}</td>
            <td class="align-middle">${ele.location}</td>
            <td class="align-middle"><button class="btn btn-success" onclick="populateAdditionalInfo('${ele.firstName}')">View</button></td>`;
            i++;
            tableBody.appendChild(tr);
        })
    }
    else alert("No Data To Display");    
})