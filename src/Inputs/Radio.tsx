import React, { CSSProperties } from "react";
import styled from 'styled-components';
import { Main, Responsive, MainProps, ResponsiveProps } from '@Utils/BaseStyles';
import { __useImplicitProps } from '@Utils/Hooks';
import { position, darken, flex, transition } from '@Utils/Mixins';

export interface RadioProps {
    label?: string,
    column?: number,
    className: string,
    activeStyle?: CSSProperties,
    radioStyle?: CSSProperties,
    disabled?: boolean,
    name?: string
}

export const Radio = ({
    label,
    column,
    className,
    activeStyle,
    radioStyle,
    disabled,
    name,
    ...props
}: RadioProps) => {
    const implicitProps = __useImplicitProps(props, [
        ...MainProps,
        ...ResponsiveProps
    ]);
    const radioProps = {
        activeStyle,
        radioStyle,
    };

    return (
        <Container className={ className } column={ column } { ...implicitProps }>
            <RadioContainer>
                <Input type='checkbox' { ...props }/>
                <RadioBox { ...radioProps } disabled={ disabled }>
                    <RadioDot/>
                </RadioBox>
            </RadioContainer>
            { label && <Label htmlFor={ name } column={ column }>{ label }</Label> }
        </Container>
    );
};

const Container = styled.div`
    ${ Main }
    ${ Responsive }
    ${ flex('center') }
    display: inline-flex;

    ${({ column }) => column ? 'flex-direction: column' : ''}
`;

const Input = styled.input`
    ${ position() }
    cursor: pointer;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;

    &:disabled {
        cursor: not-allowed;
    }
`;

const RadioContainer = styled.div`
    ${ flex('center') }
    display: inline-flex;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
`;

const RadioBox = styled.div`
    ${ Main }
    ${ flex('center') }
    ${ transition(['border-color']) }
    border-radius: 50%;
    margin: 0;

    // Disabled
    ${ Input }:disabled ~ & {
        opacity: 0.6;
    }

    ${({ activeStyle, ...props }) => {
        const { colors, dimensions } = props.theme;
        return `
            height: ${ dimensions.radio.size }px;
            width: ${ dimensions.radio.size }px;
            padding: ${ dimensions.radio.spacing }px;
            border: 3px solid ${ darken(colors.input.default) };

            ${ Input }:checked ~ & {
                border-color: ${ colors.primary };
                ${ activeStyle ? activeStyle(props) : '' }
            }
        `;
    }}
    ${({ radioStyle, ...props }) => radioStyle ? radioStyle(props) : ''}
`;

const RadioDot = styled.div`
    ${ transition(['transform', 'opacity']) }
    border-radius: 50%;
    transform: scale(0, 0);
    opacity: 0;
    height: 100%;
    flex-grow: 1;

    ${({ theme }) => `
        background-color: ${ theme.colors.primary };
    `}

    ${ Input }:checked ~ ${ RadioBox } & {
        transform: scale(1, 1);
        opacity: 1;
    }
`;

const Label = styled.label`
    margin: ${({ column }) => column ? '6px' : '0 8px 2px'};
    font-size: 0.85rem;
    font-weight: bold;
`;

export default Radio;
