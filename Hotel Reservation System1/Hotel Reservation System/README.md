Ocean View Resort – Room Reservation Management System
Project Overview

The Ocean View Resort Reservation Management System is a distributed web-based application developed using Java to automate the room reservation process of Ocean View Resort located in Galle, Sri Lanka.

Currently, the resort manages reservations manually, which often results in booking conflicts, delays, and inefficient record management. This system replaces the manual process with a secure computerized reservation system that allows staff to manage guest reservations, retrieve booking details, calculate bills, and generate reports efficiently.

The application provides a menu-driven user interface, secure login authentication, reservation management, billing calculation, and a help module to guide staff members.

The system follows modern software engineering principles, including UML-based design, design patterns, distributed web services, database integration, version control, and automated testing.

System Objectives

The primary objectives of this system are:

• Eliminate manual reservation errors
• Prevent double booking conflicts
• Store guest information securely
• Improve reservation processing speed
• Provide accurate billing calculations
• Enable easy retrieval of reservation records
• Provide a user-friendly interface for hotel staff

System Features
1. User Authentication

The system requires users to log in before accessing the reservation system.

Functions:
• Username and password verification
• Prevent unauthorized access
• Secure system entry

2. Add New Reservation

Staff can create new guest reservations by entering the required guest information.

Reservation details include:

• Reservation Number (Unique ID)
• Guest Name
• Address
• Contact Number
• Room Type
• Check-in Date
• Check-out Date

All reservation details are stored in the database.

3. Display Reservation Details

Staff can retrieve the complete reservation details by entering the reservation number.

Displayed information includes:

• Guest information
• Reservation details
• Room type
• Check-in and check-out dates

4. Calculate and Print Bill

The system calculates the bill automatically based on the number of nights stayed.

Room rates example:

Room Type	Price Per Night
Standard	$50
Deluxe	$80
Suite	$120

Bill calculation formula:

Total Cost = Number of Nights × Room Rate

5. Help Section

A built-in help section assists new staff members.

The help section explains:

• How to log in
• How to create reservations
• How to retrieve booking details
• How to calculate guest bills

6. Reports

The system generates useful operational reports such as:

• Daily reservations report
• Guest check-in report
• Guest check-out report
• Revenue summary report
• Room occupancy report

7. Exit System

Allows the user to safely close the application.

System Architecture

This system is developed as a Distributed Web Application consisting of the following layers:

Client Layer
Web browser interface for staff interaction.

Application Layer
Java backend services that process requests and manage business logic.

Service Layer
RESTful Web Services handle reservation operations.

Data Layer
MySQL database stores guest and reservation information.

Architecture Model:

Client → REST API → Business Logic → Database

Technologies Used
Technology	Purpose
Java	Backend programming
Spring Boot	Web service framework
MySQL	Database
JDBC / JPA	Database connectivity
HTML / CSS	User Interface
JavaScript	Client interactions
Git	Version control
GitHub	Repository hosting
JUnit	Automated testing
Maven	Dependency management
Design Patterns Used

The following design patterns are implemented in the system:

MVC (Model View Controller)

Separates application logic into three components:

Model
Handles database objects such as reservations and users.

View
User interface pages.

Controller
Handles user requests and responses.

Singleton Pattern

Used for database connection management to ensure only one database connection instance is active.

Benefits:
• Reduces resource usage
• Improves application performance

DAO Pattern (Data Access Object)

Encapsulates database operations such as:

• Insert reservation
• Retrieve reservation
• Update reservation
• Delete reservation

Benefits:
• Clean separation between business logic and database access.

UML Diagrams

The system design is represented using three UML diagrams.

Use Case Diagram

Actors:
• Hotel Staff
• System Administrator

Main Use Cases:

• Login
• Add Reservation
• View Reservation
• Generate Bill
• View Reports
• Help
• Exit System

The Use Case diagram illustrates how users interact with the reservation system.

Class Diagram

Main Classes:

User
Reservation
Room
Bill
ReservationService
DatabaseConnection

Relationships include:

• Reservation belongs to Guest
• Reservation has Room
• Bill calculated from Reservation

Sequence Diagram

Sequence diagram shows interaction flow when creating a reservation.

Steps:

User logs into system

User enters reservation details

Controller sends request to ReservationService

ReservationService stores data in database

System confirms reservation creation

Database Design

Database Name:

oceanview_resort

Main Tables:

Users Table
Field	Type
user_id	INT
username	VARCHAR
password	VARCHAR
role	VARCHAR
Reservations Table
Field	Type
reservation_id	INT
guest_name	VARCHAR
address	VARCHAR
contact_number	VARCHAR
room_type	VARCHAR
check_in_date	DATE
check_out_date	DATE
API Endpoints
Method	Endpoint	Description
POST	/login	Authenticate user
POST	/reservation	Create reservation
GET	/reservation/{id}	Retrieve reservation
GET	/reports	Generate reports
GET	/help	Display help section
Input Validation

To ensure data accuracy, the system validates:

• Contact number format
• Date validation (check-out must be after check-in)
• Unique reservation number
• Required fields cannot be empty

Invalid entries display clear error messages to the user.

Testing Strategy

The system follows Test Driven Development (TDD).

Steps:

Write test cases before implementation

Run test cases

Implement functionality

Re-run tests to confirm success

Test Tools

JUnit
Mockito

Example Test Cases
Test Case	Expected Result
Login with correct credentials	Access granted
Login with wrong credentials	Access denied
Create reservation	Data stored successfully
Invalid date input	Error message displayed
Bill calculation	Correct total amount
Test Automation

Automated testing is implemented using JUnit.

Automated tests include:

• Login validation tests
• Reservation creation tests
• Database insertion tests
• Billing calculation tests

Version Control – Git & GitHub

This project uses Git version control for managing source code changes.

Repository Link:


https://github.com/kujilinip100-hub/OceanViewResort.git
