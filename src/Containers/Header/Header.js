import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const HeaderContainer = styled.div`
    display: flex;
    height: 72px;
    background-color: #3cba92;
    color: white;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -2px 24px 7px rgba(196,196,196,1);
`

const RightButtonsContainer = styled.div`
    position: absolute;
    padding-right: 10px;
    right: 0;
`

export default function Header({ onClickRightButtons }) {
    return (
        <HeaderContainer >
            <h1>Nexfar - Teste</h1>
            <RightButtonsContainer>
                <IconButton onClick={onClickRightButtons} aria-label="Abrir carrinho">
                    <ShoppingCart style={{ color: "white", fontSize: 28 }}/>
                </IconButton>
            </RightButtonsContainer>
        </HeaderContainer>
    )
}
