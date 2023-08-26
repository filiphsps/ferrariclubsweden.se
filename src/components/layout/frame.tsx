import { FunctionComponent, useRef, useState } from 'react';

import styled from 'styled-components';

const Contaier = styled.div``;
const Frame = styled.iframe.attrs({
    width: '100%',
    frameBorder: '0',
    scrolling: 'no'
})``;

type FrameComponentProps = {
    path: string;
};
const FrameComponent: FunctionComponent<FrameComponentProps> = ({ path }) => {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const [frameHeight, setFrameHeight] = useState<number>(0);

    return (
        <Contaier>
            <Frame
                ref={frameRef}
                onLoad={() => {
                    const height = frameRef.current?.contentWindow?.document.body.scrollHeight;
                    if (!height) return;

                    // TODO: set to 100% if height is less than 100%.
                    setFrameHeight(height);
                }}
                height={!frameHeight ? '100%' : `${frameHeight}px`}
                src={`/wp/${path}?iframe`}
            />
        </Contaier>
    );
};

export { FrameComponent as Frame };
