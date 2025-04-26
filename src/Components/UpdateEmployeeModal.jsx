import React from "react";

const UpdateEmployeeModal = ({ formData, setFormData, onClose, onSubmit }) => (
  <div className="overlay active" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>Update Employee</h3>
      <div className="data">
        <label>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <label>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="buttons">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="submit" onClick={onSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default UpdateEmployeeModal;
