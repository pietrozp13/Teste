import React from 'react'
import { Paper, IconButton, Chip } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ItemContainer, Item, ItemImage, Area1, Area2, Area3, TitleText, SkuText, PriceText } from './styles'

export default function ItemProduto({
    sku,
    name,
    imageURL,
    category,
    maker,
    quantityAvailable,
    price,
}) {

    const addCart = async (sku, quant) => {
        const rawResponse = await fetch(window.endpoint + '/cart/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sku: sku, quantity: quant })
        });
        const content = await rawResponse;
        if (content.status === 200) {
            toast.success('Item adicionado ao carrinho com sucesso', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        } else {
            toast.error('Erro ao adicionado item no carrinho', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
    }

    function getQuantidadeTag (quant) {
        if (quant === 0) return <Chip label={"Sem Estoque"} variant="outlined" style={{ color: "red", }} size="small" />
        if (quant < 10) return <Chip label={"Últimas Unidades"} variant="outlined" style={{ color: "#d18b00", }} size="small" />
    }

    return (
        <ItemContainer>
            <Paper elevation={3}>
                <Item>
                    <Area1>
                        <Chip label={category} variant="outlined" style={{ color: "#3cba92", }} size="small" />
                    </Area1>
                    <ItemImage src={imageURL}/>
                    <div>{maker}</div>
                    <TitleText><b>{name}</b></TitleText>
                    <SkuText>{sku}</SkuText>
                    <Area2>
                        {getQuantidadeTag(quantityAvailable)}
                    </Area2>
                    <Area3>
                        <PriceText>
                            <b>Preço: R$ {price}</b>
                        </PriceText>
                        {quantityAvailable !== 0 &&    
                            <IconButton onClick={()=> addCart(sku, 1)} aria-label="Adicionar item ao carrinho">
                                <AddShoppingCartIcon style={{ color: "#3cba92", fontSize: 24 }} />
                            </IconButton>
                        }
                    </Area3>
                </Item>
            </Paper>
        </ItemContainer>
    )
}
