import React from "react";

const ViewEmployeeModal = ({ employee, onClose }) => (
  <div className="overlay active" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>View Employee</h3>
      <div className="view-content">
        <p>
          <strong>First Name:</strong> {employee.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {employee.lastName}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
      </div>
      <div className="buttons" style={{ justifyContent: "center" }}>
        <button type="button" className="cancel" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ViewEmployeeModal;
