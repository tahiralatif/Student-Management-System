import inquirer from "inquirer";
import chalk from "chalk";
// define a stuent  class
class student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; // initialize an empty array for courses
        this.balance = 1000;
    }
    // method to enrolled a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // method to view a student balance
    view_balance() {
        console.log(`balance for ${this.name}: $${this.balance}`);
    }
    // method to pay student fees
    pay_fees(amount) {
        this.balance -= amount; // subtraction assigment (-=)
        console.log(chalk.greenBright(`$${amount}: fees paid successfully for [${this.name}]`));
    }
    // method to show the student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// defining a student manager class to student manage
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new  student:
    add_student(name) {
        let Student = new student(name);
        this.students.push(Student);
        console.log(`Student: ${name} added Successfully. Student ID: ${Student.id}`);
    }
    // method to enrolled a student in a course
    enrolle_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolle  in ${course} course Successfully`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please Enter a correct Student ID");
        }
    }
    // method to pay student fees
    pay_student_fees(student_id, ammount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(ammount);
        }
        else {
            console.log("Student not found. Please Enter a correct Student ID");
        }
    }
    // method to display student status
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// main function to run the program
async function main() {
    console.log(chalk.magenta("<<<<=========<<<<<<<==========<<<<<<=======<<<<<=========>>>>>"));
    console.log(chalk.bold.bgBlack("Welcome to  `Tahira's` - [Student Management System] Project "));
    console.log(chalk.magenta("<<<<<<=======<<<<<<<===========<<<<<<=======<<<<<=======>>>>>>"));
    console.log("-".repeat(50));
    let studentmanager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let Optionchoice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enrolle Student",
                    "View Stuent Balance",
                    "Pay Studen Fees",
                    "Show Student Status",
                    "Exit",
                ]
            }
        ]);
        // Using  a switch case to hanle user choice
        switch (Optionchoice.choice) {
            case "Add Student":
                let student_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    }
                ]);
                studentmanager.add_student(student_input.name);
                break;
            case "Enrolle Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course Name"
                    }
                ]);
                studentmanager.enrolle_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    }
                ]);
                studentmanager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Studen Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",
                    },
                    {
                        name: "ammount",
                        type: "number",
                        message: "Enter a ammount to pay"
                    }
                ]);
                studentmanager.pay_student_fees(fees_input.student_id, fees_input.ammount);
                break;
            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID "
                    }
                ]);
                studentmanager.show_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exited....");
                process.exit();
        }
    }
}
main();
