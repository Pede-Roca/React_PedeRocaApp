import styles from "./Cadastro.module.css";

const StepUsuario = ({
  fullName,
  setFullName,
  phone,
  setPhone,
  cpf,
  setCpf,
  dob,
  setDob,
  fieldError,
}) => {
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    } else if (value.length > 5) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1)$2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1)$2");
    }
    setPhone(value);
  };

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    setCpf(value);
  };

  const handleDobChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }
    setDob(value);
  };

  return (
    <div className={styles.containerDados}>
      <h5 className={styles.titulo}>Dados do Usuário</h5>
      <label className={styles.label}>
        <span className={styles.span}>Nome completo: </span>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="form-control"
          placeholder="Entre com seu nome completo"
        />
      </label>
      <label className={styles.label}>
        <span className={styles.span}>Telefone: </span>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          className="form-control"
          placeholder="(XX)XXXXX-XXXX"
          maxLength="14"
        />
      </label>
      <label className={styles.label}>
        <span className={styles.span}>CPF: </span>
        <input
          type="text"
          name="cpf"
          value={cpf}
          onChange={handleCpfChange}
          className="form-control"
          placeholder="XXX.XXX.XXX-XX"
          maxLength="14"
        />
      </label>
      <label className={styles.label}>
        <span className={styles.span}>Data de nascimento: </span>
        <input
          type="text"
          name="dob"
          value={dob}
          onChange={handleDobChange}
          className="form-control"
          placeholder="DD/MM/AAAA"
          maxLength="10"
        />
        {fieldError && (!fullName || !phone || !cpf || !dob) && (
          <span className={styles.erro}>Preencha todos os campos.</span>
        )}
      </label>
    </div>
  );
};

export default StepUsuario;
