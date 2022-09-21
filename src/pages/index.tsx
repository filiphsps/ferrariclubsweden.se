import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import { PageApi } from '../api/page';
import Slide1 from '../../public/img/carousel/slide-1.jpg';
import Slide2 from '../../public/img/carousel/slide-2.jpg';
import Slide3 from '../../public/img/carousel/slide-3.jpg';
import { Title } from '../components/Title';
import styled from 'styled-components';

const Slider = styled(Carousel)`
    width: 100%;
    max-width: 100%;
`;
const Slide = styled.div`
    z-index: -1;
    height: calc(100vh - 10rem);

    @media (max-width: 992px) {
        height: 40vh;
    }

    img {
        height: 100%;
        object-fit: cover;
        object-position: bottom center;
    }
`;

const Header = styled.div`
    position: relative;
    width: calc(100% + 1rem);
    max-width: calc(100% + 1rem);
    margin: -0.5rem;
    border-bottom: 6rem solid var(--color-block);
`;
const HeaderContent = styled.div`
    position: absolute;
    top: 5rem;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 2rem 0.5rem;
    text-align: center;

    background: linear-gradient(
        0deg,
        rgba(27, 27, 27, 1) 0%,
        rgba(0, 0, 0, 0) 40%
    );
`;
const HeaderContentContainer = styled.div`
    display: flex;
    width: 42rem;
    max-width: 100%;
    color: var(--color-block-body);

    @media (max-width: 992px) {
        translate: 0px 6rem;
    }

    h1 {
        font-family: 'PT Sans', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: 0.15rem;
        line-height: 3.25rem;
        text-transform: uppercase;
    }
`;

interface IndexPageProps {}
const IndexPage: FunctionComponent<IndexPageProps> = () => {
    return (
        <Page>
            <NextSeo title="Hem" />

            <Header>
                <Slider
                    autoPlay
                    infiniteLoop
                    animationHandler="fade"
                    interval={5000}
                    transitionTime={500}
                    swipeable={false}
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

                <HeaderContent>
                    <HeaderContentContainer>
                        <Title>Välkommen till Ferrari Club Sweden</Title>
                    </HeaderContentContainer>
                </HeaderContent>
            </Header>

            <div style={{ height: '6rem' }}></div>
        </Page>
    );
};

export default IndexPage;
