import React, { useEffect } from 'react';
import { Dropdown,  Button, ButtonGroup  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./CustomDropdown.module.css";

const CustomDropdown = ({ categorias, selectedCategories, setSelectedCategories }) => {
  
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(["Todas as Categorias"]);
    }
  }, [selectedCategories, setSelectedCategories]);

  const handleSelect = (categoriaId) => {
    if (categoriaId === "Todas as Categorias") {
      if (selectedCategories.includes("Todas as Categorias")) {
        setSelectedCategories([]); // Deseleciona todas
      } else {
        setSelectedCategories(["Todas as Categorias"]); // Seleciona apenas "Todas as Categorias"
      }
    } else {
      if (selectedCategories.includes(categoriaId)) {
        const updatedCategories = selectedCategories.filter(item => item !== categoriaId);
        setSelectedCategories(updatedCategories.length > 0 ? updatedCategories : ["Todas as Categorias"]);
      } else {
        const updatedCategories = selectedCategories.filter(item => item !== "Todas as Categorias");
        setSelectedCategories([...updatedCategories, categoriaId]);
      }
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className={styles.bgFiltro} id="dropdown-basic">
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
          <Dropdown.Item key={categoria.id} onClick={() => handleSelect(categoria.id)}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(categoria.id)}
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