import React, { useState } from "react";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployeeModal from "./components/AddEmployeeModal";
import UpdateEmployeeModal from "./components/UpdateEmployeeModal";
import ViewEmployeeModal from "./components/ViewEmployeeModal";
import DeleteEmployeeModal from "./components/DeleteEmployeeModal";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [addFormErrors, setAddFormErrors] = useState({});
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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

      <EmployeeTable
        employees={employees}
        onView={(emp) => {
          setCurrentEmployee(emp);
          setShowViewModal(true);
        }}
        onUpdate={(emp) => {
          setCurrentEmployee(emp);
          setUpdateFormData(emp);
          setShowUpdateModal(true);
        }}
        onDelete={(emp) => {
          setEmployeeToDelete(emp);
          setShowDeleteModal(true);
        }}
      />

      {showAddModal && (
        <AddEmployeeModal
          formData={addFormData}
          setFormData={setAddFormData}
          errors={addFormErrors}
          onClose={() => {
            setShowAddModal(false);
            setAddFormErrors({});
            setAddFormData({ firstName: "", lastName: "", email: "" });
          }}
          onSubmit={handleAdd}
        />
      )}

      {showUpdateModal && currentEmployee && (
        <UpdateEmployeeModal
          formData={updateFormData}
          setFormData={setUpdateFormData}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdate}
        />
      )}

      {showViewModal && currentEmployee && (
        <ViewEmployeeModal
          employee={currentEmployee}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteEmployeeModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default App;
