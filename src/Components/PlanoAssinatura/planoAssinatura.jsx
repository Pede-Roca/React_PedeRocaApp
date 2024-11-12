import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import styles from './planoAssinatura.module.css';

// imagens
import queijo from '../../assets/Queijos.png';
import vinhos from '../../assets/Vinhos.png';
import descontos from '../../assets/Descontos.png';
import doces from '../../assets/Doces.png';

const PlanoAssinatura = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen="md-down" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className={styles.titulo}>Plano de assinatura</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <section className={styles.containerTexto}>
              <h2>Conheça nosso plano de assinatura</h2>
              <p>
                Desfrute de vantagens exclusivas ao participar do nosso plano de assinatura! Tenha acesso a descontos especiais, produtos selecionados e uma curadoria de itens premiados, incluindo vinhos e queijos artesanais de alta qualidade. Surpreenda-se com novidades e ofertas personalizadas, feitas para quem busca o melhor em sabor e exclusividade.
              </p>
              <div className={styles.ContainerBtn}>
                <button>Participar</button>
              </div>
            </section>
            <section className={styles.containerCarousel}>
              <Carousel interval={2500} className={styles.carousel}>
                <Carousel.Item>
                  <img
                    className={`${styles.imgCarousel} d-block`}
                    src={queijo}
                    alt="Queijos Premiados"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className={`${styles.imgCarousel} d-block`}
                    src={vinhos}
                    alt="Vinhos da região"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className={`${styles.imgCarousel} d-block`}
                    src={descontos}
                    alt="Descontos exclusivos"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className={`${styles.imgCarousel} d-block`}
                    src={doces}
                    alt="Doces caseiros"
                  />
                </Carousel.Item>
              </Carousel>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.btnFechar} onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PlanoAssinatura;
