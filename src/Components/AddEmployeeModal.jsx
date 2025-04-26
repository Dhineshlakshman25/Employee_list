import React from "react";

const AddEmployeeModal = ({
  formData,
  setFormData,
  errors,
  onClose,
  onSubmit,
}) => (
  <div className="overlay active" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>Add Employee</h3>
      <div className="data">
        <label>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="buttons">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="submit" onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AddEmployeeModal;
