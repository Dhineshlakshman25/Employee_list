import React from "react";

const EmployeeTable = ({ employees, onView, onUpdate, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee First Name</th>
          <th>Employee Last Name</th>
          <th>Employee Email Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No employees yet.
            </td>
          </tr>
        ) : (
          employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td className="actions">
                <button className="update" onClick={() => onUpdate(emp)}>
                  Update
                </button>
                <button className="delete" onClick={() => onDelete(emp)}>
                  Delete
                </button>
                <button className="view" onClick={() => onView(emp)}>
                  View
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
