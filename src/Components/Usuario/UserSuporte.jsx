import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "./Usuario.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserSuporte = ({ onBack }) => {
    return (
        <div>
            <h4 className={styles.titulo}>Redes Sociais</h4>
            <div className={styles.ContainerLinksSocial}>
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    disabled
                    className={styles.socialink}
                >
                    <i className="bi bi-instagram" id={styles.instSVG}></i>Instagram
                </a>
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    disabled
                    className={styles.socialink}
                >
                    <i className="bi bi-facebook" id={styles.faceSVG}></i>Facebook
                </a>
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    disabled
                    className={styles.socialink}
                >
                    <i className="bi bi-envelope" id={styles.emailSVG}></i>Email
                </a>
            </div>
            <h4 className={styles.titulo}>Contato</h4>
            <div>
                <label htmlFor="Email" className={styles.label}>
                    Email
                </label>
                <input type="email" name="Email" className={styles.input} />
                <label htmlFor="Mensagem" className={styles.label}>
                    Conteúdo
                </label>
                <textarea name="Mensagem" className={styles.input2} />
                <button className={styles.btnEnviar}>Enviar</button>
            </div>
            <h4 className={styles.titulo}>Localização</h4>
            <p className={styles.endereco}>Av. Habib Gabriel, 1360</p>
            <p className={styles.endereco}>
                Jardim Buscardi, Matão - SP, 15990-539
            </p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.1855904563968!2d-48.36269552475904!3d-21.61769059307542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8e159d287a237%3A0x70df7e81597e2d08!2sFatec%20Mat%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1718590405337!5m2!1spt-BR!2sbr"
                width="100%"
                height="250"
                loading="lazy"
            ></iframe>

            <h4 className={styles.titulo}>Perguntas Frequentes (FAQ)</h4>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quais métodos de pagamento são aceitos?</Accordion.Header>
                    <Accordion.Body>
                        Aceitamos cartões de crédito, débito e boleto bancário. 
                        Também trabalhamos com métodos de pagamento digitais como Pix e carteiras digitais.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Tipos de Entrega</Accordion.Header>
                    <Accordion.Body>
                        Oferecemos entregas rápidas para a região de Matão e transportadoras para outras localidades. 
                        O prazo de entrega será informado no momento da compra.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Formas de Contato</Accordion.Header>
                    <Accordion.Body>
                    Você pode nos contatar pelo número (17) 9987-7654 WhatsApp, e-mail ou redes sociais.
                    Estamos disponíveis de segunda a sábado, das 8h às 18h
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Vocês oferecem descontos ou promoções?</Accordion.Header>
                    <Accordion.Body>
                    Sim, temos promoções semanais e descontos
                    exclusivos para assinantes da nossa newsletter.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Posso alterar ou cancelar meu pedido?</Accordion.Header>
                    <Accordion.Body>
                    Sim, alterações ou cancelamentos
                    podem ser feitos até 1 hora após a compra.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header> Como acompanho meu pedido?</Accordion.Header>
                    <Accordion.Body>
                    Após a confirmação, você poderá acompanhar pelo site PeDeRoça.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header> Vocês têm valor mínimo para entrega?
                    </Accordion.Header>
                    <Accordion.Body>
                    Sim, o valor mínimo para entrega local é de R$ 50,00.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <button onClick={onBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
            </button>
        </div>
    );
};
