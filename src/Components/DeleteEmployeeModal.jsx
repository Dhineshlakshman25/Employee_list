import React from "react";

const DeleteEmployeeModal = ({ onConfirm, onCancel }) => (
  <div className="overlay active" onClick={onCancel}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>Delete Employee</h3>
      <p className="delete-message">
        Are you sure you want to delete this employee?
      </p>
      <div className="buttons buttons-center">
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="delete" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteEmployeeModal;
