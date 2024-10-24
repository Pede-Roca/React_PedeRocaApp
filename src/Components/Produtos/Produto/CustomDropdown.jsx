import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./CustomDropdown.module.css";

const CustomDropdown = ({ categorias, selectedCategories, setSelectedCategories }) => {

  // Efeito opcional para sincronizar o estado se necessário
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

  // Determina o label do botão baseado nas categorias selecionadas
  const getDropdownLabel = () => {
    if (selectedCategories.includes("Todas as Categorias") || selectedCategories.length === 0) {
      return "Todas as Categorias";
    }
    return `${selectedCategories.length} categorias selecionadas`;
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {getDropdownLabel()}
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
