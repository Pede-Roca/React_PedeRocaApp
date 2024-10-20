import React, { useState, useEffect } from "react";
import styles from "./Cadastro.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userAuthentication } from "../../hooks/userAuthentication";
import StepAcesso from "./StepAcesso";
import StepUsuario from "./StepUsuario";
import StepEntrega from "./StepEntrega";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config"; // Importa a configuração do Firebase

const Cadastro = () => {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");
    const [dob, setDob] = useState("");

    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");

    const [error, setError] = useState("");
    const [renderPassError, setRenderPassError] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    const { createUser, error: authError, loading } = userAuthentication();

    const confirmarSenha = () => {
        if (password !== confirmedPassword) {
            setRenderPassError(true);
            return false;
        } else {
            setRenderPassError(false);
            return true;
        }
    };

    const handleNext = () => {
        if (step === 1) {
            if (!email || !password || !confirmedPassword || !confirmarSenha()) {
                setFieldError(true);
                return;
            }
        } else if (step === 2) {
            if (!fullName || !phone || !cpf || !dob) {
                setFieldError(true);
                return;
            }
        } else if (step === 3) {
            if (!cep || !city || !state || !neighborhood || !street || !number) {
                setFieldError(true);
                return;
            }
        }
        setFieldError(false);
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const cleanedPhone = phone.replace(/\D/g, "");
        const cleanedCpf = cpf.replace(/\D/g, "");
        const cleanedDob = dob.split("/").reverse().join("-");

        const user = {
            displayName: fullName,
            email,
            password,
            phone: cleanedPhone,
            cpf: cleanedCpf,
            dob: cleanedDob,
            address: {
                cep,
                city,
                state,
                neighborhood,
                street,
                number,
                complement,
            },
        };

        const res = await createUser(user);

        if (res) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Usuário logado com sucesso.");
            } catch (loginError) {
                setError("Erro ao fazer login: " + loginError.message);
                console.error("Erro no login:", loginError);
            }
        }
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const maskCep = (value) => {
        const cleaned = value.replace(/\D/g, "");
        const match = cleaned.match(/(\d{5})(\d{3})/);
        if (match) {
            return `${match[1]}-${match[2]}`;
        }
        return value;
    };

    const handleCepChange = async (e) => {
        const { value } = e.target;

        const newCep = maskCep(value);

        const cleanedCep = newCep.replace(/\D/g, ""); // Remove caracteres não numéricos

        setCep(newCep); // Atualiza o valor formatado para exibição

        // Verifica se o CEP limpo tem 8 dígitos
        if (cleanedCep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setError("CEP inválido.");
                } else {
                    setCity(data.localidade);
                    setState(data.uf);
                    setNeighborhood(data.bairro);
                    setStreet(data.logradouro);
                    setError("");
                }
            } catch (error) {
                setError("Erro ao buscar o CEP.");
            }
        }
    };

    return (
        <>
            <div className={styles.containerEtapa}>
                <div className={styles.etapa}>
                    <span
                        className={`${styles.circle} ${step === 1 ? styles.active : ""}`}
                    ></span>
                    <p className={styles.stepTitle}>Acesso</p>
                </div>
                <span className={styles.CirculoE}></span>
                <div className={styles.etapa}>
                    <span
                        className={`${styles.circle} ${step === 2 ? styles.active : ""}`}
                    ></span>
                    <p className={styles.stepTitle}>Usuário</p>
                </div>
                <span className={styles.CirculoE}></span>
                <div className={styles.etapa}>
                    <span
                        className={`${styles.circle} ${step === 3 ? styles.active : ""}`}
                    ></span>
                    <p className={styles.stepTitle}>Entrega</p>
                </div>
            </div>

            <div className={styles.registerContainer}>
                <form className="form-group form-floating mb-3" onSubmit={handleSubmit}>
                    {step === 1 && (
                        <StepAcesso
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmedPassword={confirmedPassword}
                            setConfirmedPassword={setConfirmedPassword}
                            renderPassError={renderPassError}
                            fieldError={fieldError}
                        />
                    )}

                    {step === 2 && (
                        <StepUsuario
                            fullName={fullName}
                            setFullName={setFullName}
                            phone={phone}
                            setPhone={setPhone}
                            cpf={cpf}
                            setCpf={setCpf}
                            dob={dob}
                            setDob={setDob}
                            fieldError={fieldError}
                        />
                    )}

                    {step === 3 && (
                        <StepEntrega
                            cep={cep}
                            setCep={setCep}
                            city={city}
                            setCity={setCity}
                            state={state}
                            setState={setState}
                            neighborhood={neighborhood}
                            setNeighborhood={setNeighborhood}
                            street={street}
                            setStreet={setStreet}
                            number={number}
                            setNumber={setNumber}
                            complement={complement}
                            setComplement={setComplement}
                            handleCepChange={handleCepChange}
                            fieldError={fieldError}
                        />
                    )}
                    
                    <div className={styles.containerBtn}>
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className={styles.btnBack}
                            >
                                <i className="bi bi-arrow-return-left"></i>
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className={styles.btnNext}
                            >
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
                    </div>
                </form>
            </div>
        </>
    );
};

export default Cadastro;
