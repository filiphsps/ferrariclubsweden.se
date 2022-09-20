import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import { FunctionComponent } from 'react';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import Slide1 from '../../public/img/carousel/slide-1.jpg';
import Slide2 from '../../public/img/carousel/slide-2.jpg';
import Slide3 from '../../public/img/carousel/slide-3.jpg';
import styled from 'styled-components';

const Slider = styled(Carousel)`
    width: calc(100% + 1rem);
    max-width: calc(100% + 1rem);
    margin: -0.5rem;
`;
const Slide = styled.div`
    z-index: -1;
    height: calc(100vh - 10rem);

    @media (max-width: 992px) {
        height: 45vh;
    }

    img {
        height: 100%;
        object-fit: cover;
        object-position: bottom center;
        filter: brightness(0.85);
    }
`;

interface IndexPageProps {}
const IndexPage: FunctionComponent<IndexPageProps> = () => {
    return (
        <Page>
            <NextSeo title="Hem" />

            <Slider
                autoPlay
                infiniteLoop
                animationHandler="fade"
                interval={5000}
                transitionTime={500}
                stopOnHover={false}
                showArrows={false}
                showIndicators={false}
                showStatus={false}
                showThumbs={false}
            >
                <Slide>
                    <Image src={Slide1} alt="Ferrari" />
                </Slide>
                <Slide>
                    <Image src={Slide2} alt="Gruppträff" />
                </Slide>
                <Slide>
                    <Image src={Slide3} alt="Gruppträff" />
                </Slide>
            </Slider>
        </Page>
    );
};

export default IndexPage;
