import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./CustomDropDown.module.css";

const CustomDropdown = ({ categorias, selectedCategories, setSelectedCategories }) => {
    const handleSelect = (categoria) => {
      if (categoria === "Todas as Categorias") {
        if (selectedCategories.includes("Todas as Categorias")) {
          // Remove "Todas as Categorias" e desmarca todas
          setSelectedCategories([]);
        } else {
          // Ativa "Todas as Categorias" e remove outras
          setSelectedCategories(["Todas as Categorias"]);
        }
      } else {
        // Alterna a seleção da categoria individual
        if (selectedCategories.includes(categoria)) {
          setSelectedCategories(selectedCategories.filter(item => item !== categoria));
        } else {
          setSelectedCategories([...selectedCategories, categoria]);
        }
      }
    };
  
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <i className="bi bi-caret-down-fill"></i>
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelect("Todas as Categorias")}>
            <input 
              type="checkbox" 
              checked={selectedCategories.includes("Todas as Categorias")} 
              readOnly 
            />{" "}
            Todas as Categorias
          </Dropdown.Item>
          {categorias.map((categoria) => (
            <Dropdown.Item key={categoria.id} onClick={() => handleSelect(categoria.nome)}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(categoria.nome)} 
                readOnly 
              />{" "}
              {categoria.nome}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  
  export default CustomDropdown;