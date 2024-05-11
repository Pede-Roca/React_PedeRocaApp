import { Swiper, SwiperSlide } from 'swiper/react';
import ImgCarrocel1 from '../../assets/Carrocel1.svg';
import ImgCarrocel2 from '../../assets/Carrocel2.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Carrocel.module.css';
import { register } from 'swiper/element/bundle'
register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'


const Carrocel = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
            >
                <SwiperSlide><img src={ImgCarrocel1} alt="imagem carrocel 1" className="d-block w-100 mt-2 d-md-none" /></SwiperSlide>
                <SwiperSlide><img src={ImgCarrocel2} alt="imagem carrocel 2" className="d-block w-100 mt-2 d-md-none" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Carrocel;
