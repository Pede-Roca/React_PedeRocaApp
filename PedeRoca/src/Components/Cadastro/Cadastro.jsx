import React, { useState, useEffect } from "react";
import styles from './Cadastro.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { userAuthentication } from '../../hooks/userAuthentication';

const Cadastro = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dob, setDob] = useState('');

  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = userAuthentication();

  const handleNext = () => {
    if (step === 1 && password !== confirmedPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      displayName: fullName,
      email,
      password,
      phone,
      cpf,
      dob,
      address: {
        cep,
        city,
        state,
        neighborhood,
        street,
        number,
        complement,
      }
    };

    const res = await createUser(user);
    console.table(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleCepChange = async (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setError('CEP inválido.');
        } else {
          setCity(data.localidade);
          setState(data.uf);
          setNeighborhood(data.bairro);
          setStreet(data.logradouro);
          setError('');
        }
      } catch (error) {
        setError('Erro ao buscar o CEP.');
      }
    }
  }
  return (
    <>
      <div className={styles.containerEtapa}>
        <span className={styles.linhaProgresso}></span>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 1 ? styles.active : ""}`}
          ></span>
          <p>Acesso</p>
        </div>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 2 ? styles.active : ""}`}
          ></span>
          <p>Usuário</p>
        </div>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 3 ? styles.active : ""}`}
          ></span>
          <p>Entrega</p>
        </div>
      </div>
      <div className={styles.registerContainer}>
        <form class="form-group form-floating mb-3" onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h5 className={styles.titulo}>Dados de Acesso</h5>
              <br />
              <label >
                <span className={styles.span}>E-mail: </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  requiredClass= {styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu e-mail"
                />
              </label>
              <label>
                <span className={styles.span}>Senha: </span>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  requiredClass= {styles.formInput}
                  id="floatInput"
                  placeholder="Entre com sua senha"
                />
              </label>
              <label>
                <span className={styles.span}>Confirmação da senha: </span>
                <input
                  type="password"
                  name="confirmedPassword"
                  required
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  className="form-control"
                  requiredClass= {styles.formInput}
                  id="floatInput"
                  placeholder="Confirme sua senha"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <h5 className={styles.titulo}>Dados do Usuáro</h5>
              <br />
              <label>
                <span>Nome Completo: </span>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu nome completo"
                />
              </label>
              <label>
                <span className={styles.span}>Telefone: </span>
                <input
                  type="text"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu telefone"
                />
              </label>
              <label>
                <span className={styles.span}>CPF: </span>
                <input
                  type="text"
                  name="cpf"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu CPF"
                />
              </label>
              <label>
                <span className={styles.span}>Data de Nascimento: </span>
                <input
                  type="date"
                  name="dob"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <h5 className={styles.titulo}>Dados da Entrega</h5>
              <br />
              <label>
                <span className={styles.span}>CEP: </span>
                <input
                  type="text"
                  name="cep"
                  required
                  value={cep}
                  onChange={handleCepChange}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu CEP"
                />
              </label>
              <label>
                <span className={styles.span}>Cidade: </span>
                <input
                  type="text"
                  name="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com sua cidade"
                />
              </label>
              <label>
                <span className={styles.span}>Estado: </span>
                <input
                  type="text"
                  name="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu estado"
                />
              </label>
              <label>
                <span className={styles.span}>Bairro: </span>
                <input
                  type="text"
                  name="neighborhood"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com seu bairro"
                />
              </label>
              <label>
                <span className={styles.span}>Rua: </span>
                <input
                  type="text"
                  name="street"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com sua rua"
                />
              </label>
              <label>
                <span className={styles.span}>Número: </span>
                <input
                  type="text"
                  name="number"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com o número"
                />
              </label>
              <label>
                <span className={styles.span}>Complemento: </span>
                <input
                  type="text"
                  name="complement"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  className="form-control"
                  requiredClass={styles.formInput}
                  id="floatInput"
                  placeholder="Entre com o complemento"
                />
              </label>
            </div>
          )}
          <div className={styles.containerBtn}>
            {step > 1 && (
              <button type="button" onClick={handleBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
              </button>
            )}

            {step < 3 && (
              <button type="button" onClick={handleNext} className={styles.btnNext}>
                <i className="bi bi-check-lg"></i>
              </button>
            )}

            {step === 3 && !loading && (
              <button type="submit" className={styles.btnNext}>
                <i className="bi bi-check-lg"></i>
              </button>
            )}

            {step === 3 && loading && (
              <button type="submit" className="btn" disabled>
                Aguarde...
              </button>
            )}
            {error && <p className='error'>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Cadastro;
