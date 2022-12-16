import BBCodeParser from 'js-bbcode-parser/src/index.js';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Wrapper = styled.section``;

const Contaier = styled.div<{
    sizes?: {
        desktop: string;
        tablet: string;
        mobile: string;
    };
    hide?: '1';
}>`
    max-width: ${(props) => props.sizes?.desktop || '100%'};
    width: 100%;

    @media (max-width: 992px) {
        max-width: ${(props) => props.sizes?.mobile || '100%'};
        width: 100%;
    }

    gap: 12px;
    .muffin-item-inner {
        iframe {
            max-width: 100%;
        }

        h3 {
            text-transform: uppercase;
            font-family: 'Ferrari';
            font-size: 1.65rem;
        }
        h4 {
            font-size: 1.35rem;
        }

        a {
            color: var(--color-primary-light);
            font-weight: 600;

            &:hover {
                color: var(--color-primary);
            }
        }
    }

    ${(props) => (props.hide ? 'display: none !important;' : '')}
`;

const ItemInner = styled.div<{ css?: string }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    max-width: calc(100vw - 2rem);
    height: 100%;
    word-break: break-word;
    overflow: hidden;
    margin: 0px 0px 2.5rem 0px;

    @media (max-width: 992px) {
        margin-bottom: 2rem;
    }

    .image_wrapper {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        max-width: 100%;
        border-color: #e2e2e2;

        img {
            object-fit: contain;
            width: 100%;
        }
    }

    ${(props) => props.css || ''}
`;

const SizeToCss = (size: string) => {
    switch (size) {
        case '1/3':
            return '33%';
        case '1/4':
            return '24%';
        default:
            return '100%';
    }
};

interface MuffinEntry {
    uid: string;
    size: string;
    tablet_size: string;
    mobile_size: string;
    attr?: {
        hide?: '1';
        padding_top?: string;
        padding_bottom?: string;
        bg_color?: string;
    };
    wraps: MuffinWrap[];
}
interface MuffinWrap {
    uid: string;
    size: string;
    tablet_size: string;
    mobile_size: string;
    attr: {
        padding: string;
    };
    items?: MuffinItem[];
}
interface MuffinItem {
    uid: string;
    type: 'placeholder' | 'column' | 'image';
    size: string;
    tablet_size: string;
    mobile_size: string;
    fields: {
        content: string;
        title: string;
        padding?: string;
        style?: string;
    };
}

export type MuffinComponentsProps = {
    data: MuffinEntry[];
};
export const MuffinComponents: FunctionComponent<MuffinComponentsProps> = ({
    data
}) => {
    return (
        <Wrapper>
            {data.map((item) => (
                <MuffinComponent key={item.uid} data={item} />
            ))}
        </Wrapper>
    );
};

export type MuffinComponentProps = {
    data: MuffinEntry;
};
const MuffinComponent: FunctionComponent<MuffinComponentProps> = ({ data }) => {
    const { attr } = data;
    return (
        <Contaier
            id={data.uid}
            style={{
                backgroundColor: attr?.bg_color || 'none',
                paddingTop: attr?.padding_top ? `${attr.padding_top}px` : '0px',
                paddingBottom: attr?.padding_bottom
                    ? `${attr.padding_bottom}px`
                    : '0px',
                display: 'flex',
                flexDirection: 'row'
            }}
            hide={attr?.hide}
        >
            {data.wraps?.map((wrap) => (
                <MuffinWrap key={wrap.uid} data={wrap} />
            ))}
        </Contaier>
    );
};

export type MuffinWrapProps = {
    data: MuffinWrap;
};
const MuffinWrap: FunctionComponent<MuffinWrapProps> = ({ data }) => {
    const { attr } = data;
    return (
        <Contaier
            id={data.uid}
            className="muffin-wrap"
            sizes={{
                desktop: SizeToCss(data.size),
                tablet: SizeToCss(data.tablet_size),
                mobile: SizeToCss(data.mobile_size)
            }}
            style={{
                padding: attr?.padding || '0px'
            }}
        >
            {data.items?.map((item) => (
                <MuffinItem key={item.uid} data={item} />
            ))}
        </Contaier>
    );
};

export type MuffinItemProps = {
    data: MuffinItem;
};
const MuffinItem: FunctionComponent<MuffinItemProps> = ({ data }) => {
    switch (data.type) {
        case 'placeholder':
            return null;
        case 'image':
            console.log(data);
            return (
                <Contaier
                    id={data.uid}
                    className="muffin-item"
                    sizes={{
                        desktop: SizeToCss(data.size),
                        tablet: SizeToCss(data.tablet_size),
                        mobile: SizeToCss(data.mobile_size)
                    }}
                >
                    <ItemInner>
                        <div className="image_wrapper">
                            <img src={(data as any).fields.src} alt="" />
                        </div>
                    </ItemInner>
                </Contaier>
            );
    }

    const content = data.fields.content || '';
    const parser = new BBCodeParser({
        '\\[divider(.+?)\\]': '<br>',
        '\\[image src="(.+?)"(.+?)\\]':
            '<div class="image_wrapper"><img src="$1" /></div>'
    });

    const { fields } = data;
    return (
        <Contaier
            id={data.uid}
            className="muffin-item"
            sizes={{
                desktop: SizeToCss(data.size),
                tablet: SizeToCss(data.tablet_size),
                mobile: SizeToCss(data.mobile_size)
            }}
        >
            <ItemInner
                className="muffin-item-inner"
                css={fields.style || ''}
                style={{
                    padding: fields.padding || '0px'
                }}
                dangerouslySetInnerHTML={{
                    __html: parser.parse(content)
                }}
            ></ItemInner>
        </Contaier>
    );
};
