import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Calendar as CalendarIcon } from "lucide-react";
import "../assets/Index.css";

interface Employee {
  id: number;
  name: string;
  last_name: string;
  birthday: string;
}

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ name: "", last_name: "", birthday: "" });
  const [showCalendar, setShowCalendar] = useState(false);

  const employeesPerPage = 10;
  const apiUrl =
    process.env.REACT_APP_API_URL ||
    "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/josafat_rodriguez";

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log("Respuesta de la API:", response.data);

      if (response.data?.data?.employees) {
        setEmployees(response.data.data.employees);
      } else {
        console.error("La API no devolvió un array válido:", response.data);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error al obtener empleados", error);
      setEmployees([]);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employees.filter((emp) =>
    `${emp.name} ${emp.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value: Date | Date[] | null) => {
    if (!value) return;

    const date = Array.isArray(value) ? value[0] : value;
    if (!(date instanceof Date)) return;

    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    setFormData({ ...formData, birthday: formattedDate });
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.last_name || !formData.birthday) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (formData.name.length > 30 || formData.last_name.length > 30) {
      alert("Nombre y apellido deben tener máximo 30 caracteres");
      return;
    }
    try {
      await axios.post(apiUrl, formData);
      alert("Empleado agregado exitosamente");
      setFormData({ name: "", last_name: "", birthday: "" });
      fetchEmployees();
    } catch (error) {
      console.error("Error al agregar empleado", error);
      alert("Error al agregar empleado");
    }
  };

  return (
    <div className="employees-container">
      <h2 className="employees-title">Empleados</h2>

      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3 className="form-title">Nuevo Empleado</h3>
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} maxLength={30} required />
        </div>
        <div className="form-field">
          <label>Apellido:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            maxLength={30}
            required
          />
        </div>
        <div className="form-field">
          <label>Fecha de Nacimiento:</label>
          <div className="calendar-input" onClick={() => setShowCalendar(!showCalendar)}>
            <CalendarIcon size={30} color="#A52019" style={{ cursor: "pointer" }} />
          </div>
          {showCalendar && (
            <div className="calendar-popup">
              <Calendar onChange={(value) => handleDateChange(value as Date | Date[] | null)} />
            </div>
          )}
        </div>
        <button className="submit-button" type="submit">
          Agregar
        </button>
      </form>

      <h3 className="form-title">Tabla de Empleados</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
  {currentEmployees.map((emp) => (
    <tr key={emp.id}>
      <td>{emp.last_name}</td> {/* Apellido primero */}
      <td>{emp.name}</td>      {/* Nombre después */}
      <td>{new Date(emp.birthday).toISOString().split("T")[0].replace(/-/g, "/")}</td>
    </tr>
  ))}
</tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? "pagination-button-active" : ""}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
