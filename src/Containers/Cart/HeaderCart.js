import React from 'react'
import { Paper } from '@material-ui/core';
import styled from 'styled-components'

export const TitlePriceContainer = styled.div`
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
`

export const CarrinhoTitileContainer = styled.div`
    font-size: 30px;
    padding-left: 20px;
    color: #525252;
`

export const PriceTextContainer = styled.div`
    font-size: 26px;
    padding-right: 20px;
    color: #6e6e6e;
`

export const HeaderCart = ({ price }) => {
    return (
        <TitlePriceContainer>
            <Paper elevation={5} style={{ display: "flex", height: "100%", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <CarrinhoTitileContainer>Carrinho</CarrinhoTitileContainer>
                <PriceTextContainer><b>Total: R$ {price}</b></PriceTextContainer>
            </Paper>
        </TitlePriceContainer>
    )
}

