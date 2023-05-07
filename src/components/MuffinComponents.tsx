import BBCodeParser from 'js-bbcode-parser/src/index.js';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Blog } from './Blog';
import { PostApi } from '../api/post';

const Wrapper = styled.div`
    margin-top: -50px;
`;

const Section = styled.section<{ hide?: boolean }>`
    position: relative;
    box-sizing: border-box;

    .one {
        width: 100%;
    }
    .one-half {
        width: 50%;
    }
    .one-third {
        width: 33.333%;
    }
    .one-fourth {
        width: 25%;
    }

    @media (max-width: 992px) {
        .mobile-one {
            width: 100%;
        }
        .mobile-one-half {
            width: 50%;
        }
        .mobile-one-third {
            width: 33.333%;
        }
        .mobile-one-fourth {
            width: 25%;
        }
    }

    ${(props) => (props.hide ? 'display: none !important;' : '')}
`;
const SectionWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;
`;

const Wrap = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    float: left;
`;
const WrapInner = styled.div`
    display: flex;
    position: relative;
    align-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    align-self: stretch;
`;

const Column = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin: 0px;
    float: left;
`;
const ColumnInner = styled.div<{ css?: string }>`
    width: 100%;
    word-break: break-word;
    margin: 0px 12px 40px 12px;
    color: #626262;

    .image_frame {
        vertical-align: top;
        display: inline-block;
        border-color: #f8f8f8;

        .image_wrapper {
            position: relative;
            overflow: hidden;
            border-color: #e2e2e2;

            img {
                position: relative;
                top: 0;
                transform: scale(1);
                -webkit-mask-size: contain;
                -webkit-mask-position: center center;
                -webkit-mask-repeat: no-repeat;
                -webkit-transition: unset;
                max-width: 100%;
                height: auto;
            }
        }

        &.align-center {
            display: block;
            width: 100%;
            text-align: center;
            margin: 0px auto;

            img {
                display: inline;
            }
        }
    }
    .photo_box {
        text-align: center;
        .image_frame {
            margin-bottom: 0px;
        }
    }

    p {
        margin: 0px 0px 15px;
        color: var(--color-block);
    }
    a {
        color: var(--color-primary-light);

        &:hover {
            color: var(--color-primary);
        }
    }
    h3 {
        font-size: 1.75rem;
        line-height: 2rem;
        color: var(--color-block);
    }
    h4 {
        font-size: 1.35rem;
        line-height: 1.65rem;
        color: var(--color-block);
    }

    iframe {
        max-width: 100%;
    }

    hr {
        background: none;
        color: transparent;
    }

    ${(props) => props.css || ''}
`;
const ColumnAttr = styled.div<{ align: 'left' | 'center' | 'right' }>`
    text-align: ${(props) => props.align || 'unset'};
`;

const SizeToClass = (size: string) => {
    switch (size) {
        case '1/2':
            return 'one-half';
        case '1/3':
            return 'one-third';
        case '1/4':
            return 'one-fourth';
        default:
            return 'one';
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
    type: 'placeholder' | 'column' | 'image' | 'accordion' | 'photo_box' | 'blog';
    size: string;
    tablet_size: string;
    mobile_size: string;
    fields: {
        content: string;
        title: string;
        padding?: string;
        style?: string;
        align: 'left' | 'center' | 'right';
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
                <MuffinSection key={item.uid} data={item} />
            ))}
        </Wrapper>
    );
};

export type MuffinSectionProps = {
    data: MuffinEntry;
};
const MuffinSection: FunctionComponent<MuffinSectionProps> = ({ data }) => {
    const { attr } = data;
    return (
        <Section
            id={data.uid}
            style={{
                backgroundColor: attr?.bg_color || 'none',
                paddingTop: attr?.padding_top ? `${attr.padding_top}px` : '0px',
                paddingBottom: attr?.padding_bottom
                    ? `${attr.padding_bottom}px`
                    : '0px'
            }}
            hide={attr?.hide === '1'}
        >
            <SectionWrapper>
                {Array.isArray(data.wraps) &&
                    data.wraps.map((wrap) => (
                        <MuffinWrap key={wrap.uid} data={wrap} />
                    ))}
            </SectionWrapper>
        </Section>
    );
};

export type MuffinWrapProps = {
    data: MuffinWrap;
};
const MuffinWrap: FunctionComponent<MuffinWrapProps> = ({ data }) => {
    const { attr } = data;
    return (
        <Wrap
            id={data.uid}
            className={`${SizeToClass(data.size)} tablet-${SizeToClass(
                data.tablet_size
            )} mobile-${SizeToClass(data.mobile_size)}`}
            style={{
                padding: attr?.padding || '0px'
            }}
        >
            <WrapInner>
                {Array.isArray(data.items) &&
                    data.items?.map((item) => (
                        <MuffinItem key={item.uid} data={item} />
                    ))}
            </WrapInner>
        </Wrap>
    );
};

export type MuffinItemProps = {
    data: MuffinItem;
};
const MuffinItem: FunctionComponent<MuffinItemProps> = ({ data }) => {
    const { fields } = data;
    switch (data.type) {
        case 'placeholder':
            return null;
        case 'image':
            return (
                <Column
                    id={data.uid}
                    className={`${SizeToClass(data.size)} tablet-${SizeToClass(
                        data.tablet_size
                    )} mobile-${SizeToClass(data.mobile_size)}`}
                >
                    <ColumnInner
                        css={fields.style || ''}
                        style={{
                            padding: fields.padding || '0px'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: `<div class="image_frame align-${
                                fields.align
                            }"><div class="image_wrapper"><img src="${
                                (fields as any).src
                            }"/></div></div>`
                        }}
                    ></ColumnInner>
                </Column>
            );
        case 'photo_box':
            return (
                <Column
                    id={data.uid}
                    className={`${SizeToClass(data.size)} tablet-${SizeToClass(
                        data.tablet_size
                    )} mobile-${SizeToClass(data.mobile_size)}`}
                >
                    <ColumnInner
                        css={fields.style || ''}
                        style={{
                            padding: fields.padding || '0px'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: `<div class="photo_box"><div class="image_frame align-${
                                fields.align
                            }"><div class="image_wrapper"><img src="${
                                (fields as any).image
                            }"/></div></div></div>`
                        }}
                    ></ColumnInner>
                </Column>
            );
        case 'column': {
            const content = data.fields.content || '';
            const parser = new BBCodeParser({
                '\\[divider height="(.+?)"\\]': '<hr style="height: $1px" />',
                '\\[image src="(.+?)"(.+?)\\]': `<div class="image_frame align-${fields.align}"><div class="image_wrapper"><img src="$1" /></div></div>`
            });

            return (
                <Column
                    id={data.uid}
                    className={`${SizeToClass(data.size)} tablet-${SizeToClass(
                        data.tablet_size
                    )} mobile-${SizeToClass(data.mobile_size)}`}
                >
                    <ColumnInner
                        css={fields.style || ''}
                        style={{
                            padding: fields.padding || '0px'
                        }}
                    >
                        <ColumnAttr
                            align={fields.align}
                            dangerouslySetInnerHTML={{
                                __html: parser.parse(content)
                            }}
                        ></ColumnAttr>
                    </ColumnInner>
                </Column>
            );
        }
        case 'blog': {
            return (
                <Column
                    id={data.uid}
                    className={`${SizeToClass(data.size)} tablet-${SizeToClass(
                        data.tablet_size
                    )} mobile-${SizeToClass(data.mobile_size)}`}
                >
                    <ColumnInner
                        css={fields.style || ''}
                        style={{
                            padding: fields.padding || '0px'
                        }}
                    >
                        <Blog />
                    </ColumnInner>
                </Column>
            );
        }
        default:
            console.warn(data);
            return null;
    }
};
