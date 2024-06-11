import { Carousel } from "react-bootstrap";
import ImgCarrocel1 from "../../assets/Carrocel1.svg";
import ImgCarrocel2 from "../../assets/Carrocel2.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Carrocel.module.css";

const Carrocel = () => {
  return (
    <>
      <Carousel className="d-md-none mt-2">
        <Carousel.Item>
          <img className="w-100" src={ImgCarrocel1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100" src={ImgCarrocel2} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Carrocel;
