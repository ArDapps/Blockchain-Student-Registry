// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    // Struct to hold student details
    struct Student {
        string name;
        string section;
    }
    
    // Counter for assigning student IDs
    uint256 public studentCount;
    
    // Mapping to store students by ID
    mapping(uint256 => Student) public students;
    
    // Function to register a student
    function registerStudent(string memory _name, string memory _section) public {
        studentCount++; // Increment student count
        students[studentCount] = Student(_name, _section); // Assign new student ID
    }
    
    // Function to get a specific student's details
    function getStudent(uint256 _studentId) public view returns (string memory, string memory) {
        Student memory student = students[_studentId];
        return (student.name, student.section);
    }
}
