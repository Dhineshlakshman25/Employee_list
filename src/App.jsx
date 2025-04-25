import React, { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [addFormErrors, setAddFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!addFormData.firstName.trim())
      errors.firstName = "First name is required";
    if (!addFormData.lastName.trim()) errors.lastName = "Last name is required";
    if (!addFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(addFormData.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const handleAdd = () => {
    const errors = validateForm();
    setAddFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setEmployees([...employees, addFormData]);
      setAddFormData({ firstName: "", lastName: "", email: "" });
      setShowAddModal(false);
    }
  };

  const handleUpdate = () => {
    const updated = {
      firstName: updateFormData.firstName.trim(),
      lastName: updateFormData.lastName.trim(),
      email: updateFormData.email.trim(),
    };
    setEmployees((prev) =>
      prev.map((emp) => (emp === currentEmployee ? updated : emp))
    );
    setShowUpdateModal(false);
  };

  const handleDelete = () => {
    setEmployees((prev) => prev.filter((emp) => emp !== employeeToDelete));
    setEmployeeToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <h2>Employees List</h2>
      <button className="add-employee" onClick={() => setShowAddModal(true)}>
        Add Employee
      </button>
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
                  <button
                    className="update"
                    onClick={() => {
                      setCurrentEmployee(emp);
                      setUpdateFormData(emp); // ✅ populate form fields
                      setShowUpdateModal(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      setEmployeeToDelete(emp);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="view"
                    onClick={() => {
                      setCurrentEmployee(emp);
                      setShowViewModal(true);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="overlay active"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Employee</h3>
            <p className="delete-message">
              Are you sure you want to delete this employee?
            </p>
            <div className="buttons buttons-center">
              <button
                type="button"
                className="cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button type="button" className="delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="overlay active" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Employee</h3>
            <div className="data">
              <>
                <label>First Name</label>
                <input
                  type="text"
                  value={addFormData.firstName}
                  onChange={(e) =>
                    setAddFormData({
                      ...addFormData,
                      firstName: e.target.value,
                    })
                  }
                />
                {addFormErrors.firstName && (
                  <p className="error">{addFormErrors.firstName}</p>
                )}

                <label>Last Name</label>
                <input
                  type="text"
                  value={addFormData.lastName}
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, lastName: e.target.value })
                  }
                />
                {addFormErrors.lastName && (
                  <p className="error">{addFormErrors.lastName}</p>
                )}

                <label>Email</label>
                <input
                  type="email"
                  value={addFormData.email}
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, email: e.target.value })
                  }
                />
                {addFormErrors.email && (
                  <p className="error">{addFormErrors.email}</p>
                )}

                <div className="buttons">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                      setShowAddModal(false);
                      setAddFormErrors({});
                      setAddFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="button" className="submit" onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && currentEmployee && (
        <div
          className="overlay active"
          onClick={() => setShowUpdateModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Update Employee</h3>
            <div className="data">
              <>
                <label>First Name</label>
                <input
                  type="text"
                  value={updateFormData.firstName}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      firstName: e.target.value,
                    })
                  }
                />
                <label>Last Name</label>
                <input
                  type="text"
                  value={updateFormData.lastName}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      lastName: e.target.value,
                    })
                  }
                />
                <label>Email</label>
                <input
                  type="email"
                  value={updateFormData.email}
                  onChange={(e) =>
                    setUpdateFormData({
                      ...updateFormData,
                      email: e.target.value,
                    })
                  }
                />
                <div className="buttons">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="submit"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && currentEmployee && (
        <div className="overlay active" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>View Employee</h3>
            <div className="view-content">
              <p>
                <strong>First Name:</strong> {currentEmployee.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {currentEmployee.lastName}
              </p>
              <p>
                <strong>Email:</strong> {currentEmployee.email}
              </p>
            </div>
            <div className="buttons" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="cancel"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
