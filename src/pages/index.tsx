import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import { FiChevronDown } from 'react-icons/fi';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { ImageBlocks } from '@/components/ImageBlocks';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import Slide1 from '../../public/img/carousel/slide-1.jpg';
import Slide2 from '../../public/img/carousel/slide-2.jpg';
import Slide3 from '../../public/img/carousel/slide-3.jpg';
import { Title } from '@/components/typography/title';
import styled from 'styled-components';

/*const Slider = styled(Carousel)`
    width: 100%;
    max-width: 100%;
`;*/
const Slide = styled.div`
    z-index: -1;
    height: calc(100vh - 2rem);
    height: calc(calc(100vh - env(safe-area-inset-bottom)) - 2rem);

    @media (max-width: 992px) {
        //height: 40vh;
    }

    img {
        height: 100%;
        object-fit: cover;
        object-position: bottom center;
    }
`;

const Header = styled.div`
    position: relative;
    width: 100%;
    border-bottom: 2rem solid var(--color-block);
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

    background: linear-gradient(0deg, rgba(27, 27, 27, 1) 0%, rgba(0, 0, 0, 0) 40%);
`;
const HeaderContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    max-width: 44rem;
    padding: 0px 0.5rem;
    color: var(--color-block-body);

    @media (max-width: 992px) {
        translate: 0px 2rem;
    }

    ${Title} {
        font-family: 'Ferrari', sans-serif;
        font-size: 3.5rem;
        font-weight: 700;
        letter-spacing: 0.15rem;
        line-height: 3.5rem;
        text-transform: uppercase;
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
        color: var(--color-light-background);

        @media (max-width: 992px) {
            font-size: 1.75rem;
            line-height: 2rem;
        }
    }
`;

const ScrollDownIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-size: 3rem;
    line-height: 3rem;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    opacity: 0.5;
    transition: 250ms ease-in-out all;

    @media (max-width: 992px) {
        margin-top: 1rem;
    }

    &:hover {
        opacity: 1;
    }
`;

interface IndexPageProps {}
const IndexPage: FunctionComponent<IndexPageProps> = () => {
    return (
        <Page>
            <NextSeo
                titleTemplate="%s"
                title="Ferrari Club Sweden"
                description={
                    'Ferrari Club Sweden startade som “Ferraristi Svezia” och grundades 1973 som den sjunde officiella Ferrariklubben i världen. ' +
                    'Vi är även medlemmar i Motorhistoriska Riksförbundet, MHRF vilket möjliggör entusiastförsäkringar för medlemmar med klassiska bilar. ' +
                    'Klubben arrangerar många aktiviteter så som sociala event, utställningar, körningar mm. Samarbetspartner'
                }
                canonical="https://www.ferrariclubsweden.se/"
            />

            <Header>
                <Carousel
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
                    axis="horizontal"
                    centerSlidePercentage={0}
                    labels={{
                        leftArrow: '',
                        rightArrow: '',
                        item: ''
                    }}
                >
                    <Slide>
                        <Image src={Slide1} alt="Ferrari" loading="eager" />
                    </Slide>
                    <Slide>
                        <Image src={Slide2} alt="Gruppträff" />
                    </Slide>
                    <Slide>
                        <Image src={Slide3} alt="Gruppträff" />
                    </Slide>
                </Carousel>

                <HeaderContent>
                    <HeaderContentContainer>
                        <Title>
                            Välkommen till
                            <br />
                            Ferrari Club Sweden
                        </Title>
                        <ScrollDownIcon
                            onClick={() => {
                                document.querySelector('#content')?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            <FiChevronDown />
                        </ScrollDownIcon>
                    </HeaderContentContainer>
                </HeaderContent>
            </Header>

            <ImageBlocks
                id="content"
                blocks={[
                    {
                        background: <Image src={Slide2} alt="Vår Historia" />,
                        children: <Link href="/om-oss/">Vår Historia</Link>
                    },
                    {
                        background: <Image src={Slide3} alt="Periodico" />,
                        children: <Link href="/periodico/">Periodico</Link>
                    }
                ]}
            />
        </Page>
    );
};

export default IndexPage;
