import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { SubTitle } from '@/components/SubTitle';
import { Title } from '@/components/Title';
import styled from 'styled-components';

const Content = styled.section`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: var(--color-block-body);

    h1 {
        text-transform: unset;
        font-family: 'Poppins', sans-serif;
    }

    h2 {
        padding-bottom: 0px;
    }
`;

const ContentContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 32rem;
    width: 100%;

    h1 {
        text-transform: unset;
        font-family: 'Poppins', sans-serif;
    }
`;

const Policy = styled.div``;

interface VaraVilkorPageProps {}
const VaraVilkorPage: FunctionComponent<VaraVilkorPageProps> = ({}) => {
    return (
        <Page>
            <NextSeo title="Våra Vilkor" />

            <Content>
                <ContentContainer>
                    <Title>Våra Vilkor</Title>

                    <SubTitle>Integritetspolicy</SubTitle>
                    <Policy>
                        Ferrari Club Sweden behandlar personuppgifter i enlighet med Personuppgiftslagen (1998:204).I
                        denna Integritetspolicy redogör vi närmare för hur Ferrari Club Sweden behandlar de person och
                        biluppgifter som Du registrerar hos Ferrari Club Sweden. Personuppgiftsansvarig är Ferrari Club
                        Sweden.
                    </Policy>

                    <SubTitle>Allmänt</SubTitle>
                    <Policy>
                        Ferrari Club Sweden behandlar registrerade medlemmars personuppgifter i ett medlemsregister. Den
                        som registrerar sig skall före registreringen tillfrågas om denne samtycker till att uppgifterna
                        behandlas i enlighet med Integritetspolicyn. <b>OBS</b>. Särskilt viktigt är det att meddela om
                        man t ex har skyddad identitet i upplysningsfältet I särskilda undantagsfall kan dock behandling
                        av registrerade personuppgifter vara nödvändig även om den registrerade inte lämnat något
                        särskilt samtycke. Det kan t ex vara nödvändigt för att Ferrari Club Sweden skall kunna fullgöra
                        avtal och skyldigheter enligt lag. För sådan registrering och behandling, som enligt
                        Personuppgiftslagen är tillåten utan samtycke från den registrerade, efterfrågas inget särskilt
                        samtycke.
                    </Policy>

                    <SubTitle>Personuppgiftshantering</SubTitle>
                    <Policy>
                        Ferrari Club Sweden är personuppgiftsansvarig för de uppgifter Du som medlem registrerar i
                        Ferrari Club Sweden medlemsregister. Dina uppgifter används för att vi ska kunna fullgöra våra
                        åtaganden gentemot dig, som medlem i klubben som att ge dig god information om våra event, klubb
                        aktiviteter, skicka ut klubbtidningen periodico, köp av våra lokala Ferrari accessoarer samt Din
                        årliga medlemsavgift m.m. Dina registrerade medlemsuppgifter kommer inte under några
                        omständligheter att vidare befordras till tredjepart, utan är helt konfidentiella inom Ferrari
                        Club Sweden och dess medlemmar. Vidare är enskilda medlemmars inlagda bilder och eventuella
                        försäljningsutbud som publiceras på Ferrari Club Sweden Hemsida föremål för etisk granskning och
                        kan komma att tas bort.
                    </Policy>

                    <SubTitle>Tillgänglighet</SubTitle>
                    <Policy>
                        Den som registrerat sig och blivit godkänd medlem i Ferrari Club Sweden har fri tillgång till
                        informationen på Ferrari Club Sweden hemsida dock med gällande begränsningar i spridning av
                        tillgänglig information till tredjepart. Om någon uppgift i registren är felaktig rättas
                        uppgiften omgående efter det att Ferrari Club Sweden uppmärksammats på felet.
                    </Policy>

                    <SubTitle>Gallring</SubTitle>
                    <Policy>
                        Registrerade medlemsuppgifter gallras löpande. Om något medlemsförhållande inte följer normala
                        Ferrari Club Sweden krav enligt gällande stadgar t.ex. utebliven betalning av medlems avgift
                        raderas normalt medlemsuppgifterna. Uppgifterna kan också raderas på begäran av den enskilde
                        medlemmen.
                    </Policy>

                    <SubTitle>Kontaktuppgifter</SubTitle>
                    <Policy>Kontakt resurs för Ferrari Club Sweden är</Policy>
                </ContentContainer>
            </Content>
        </Page>
    );
};

export default VaraVilkorPage;
