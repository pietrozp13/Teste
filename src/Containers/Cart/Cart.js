import React, { useEffect, useState } from 'react'
import { Drawer } from '@material-ui/core';
import ItemCarrinho from '../../Components/ItemCarrinho/ItemCarrinho'
import { HeaderCart } from './HeaderCart'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components'

export const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ItemContainer = styled.div`
    display: flex;
    width: 70vw;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    justify-content: center;
    flex-direction: column;
    overflow-x: hidden;
`

export const LoaderContainer = styled.div`
    display: flex;
    width: 70vw;
    height: 100%;
    justify-content: center;
    align-items: center;
`


export default function Cart({ isOpen, handleClose }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchCart()
    }, [])

    async function fetchCart () {
        const rawResponse = await fetch(window.endpoint + '/cart');
        const content = await rawResponse.json();
        if (content.items.length === 0) {
            toast.warning('Sem itens no carrinho', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
            });
            handleClose()
        }
        setItems(await content.items)
    }

    async function removeFromCart (sku) {
        const rawResponse = await fetch(window.endpoint + '/cart/remove/' + sku, {
            method: 'DELETE',
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
        fetchCart()
    }

    const addCart = async (sku, quant) => {
        const rawResponse = await fetch(window.endpoint + '/cart/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sku: sku, quantity: quant })
        });
        await rawResponse;
        fetchCart()
    }

    const getTotalPrice = () => {
        let totalPrice = 0
        items.forEach((item)=> {
            totalPrice += item.product.price * item.quantity
        })
        return totalPrice
    }
    return (
        <Drawer anchor="right" open={isOpen} onClose={handleClose}>
            {items.length ? (
                <CartContainer>
                    <HeaderCart price={getTotalPrice().toFixed(2)} />
                    <ItemContainer>
                        {items && items.map(({ product, quantity })=> {
                            return(
                                <ItemCarrinho
                                    key={product.sku + new Date().getTime()}
                                    sku={product.sku}
                                    name={product.name}
                                    imageURL={product.imageURL}
                                    category={product.category}
                                    maker={product.maker}
                                    quantityAvailable={product.quantityAvailable}
                                    price={product.price}
                                    quantity={quantity}
                                    handleRemove={() => removeFromCart(product.sku)}
                                    addCart={addCart}
                                />
                            )
                        })}
                    </ItemContainer>
                </CartContainer>
            ) : (
                <LoaderContainer>
                    <Loader
                        type="TailSpin"
                        color="#3cba92"
                        height={120}
                        width={120}
                    />
                </LoaderContainer>
            )}
        </Drawer>
    )
}
