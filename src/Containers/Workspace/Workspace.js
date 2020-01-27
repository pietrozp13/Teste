import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ItemProduto from '../../Components/ItemProduto/ItemProduto'

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

export const LoaderContainer = styled.div`
    padding-top: 100px;
`

export default function Workspace() {
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts () {
        const rawResponse = await fetch(window.endpoint + '/product');
        const content = await rawResponse.json();
        if (rawResponse.status !== 200) {
            toast.error('Erro ao carregar produtos', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
        setProdutos(await content)
    }

    return (
        <ItemsContainer>
            {produtos.length ? (
                produtos.map((produto) => {
                    return (
                            <ItemProduto 
                                key={produto.sku + new Date().getTime()}
                                sku={produto.sku}
                                name={produto.name}
                                imageURL={produto.imageURL}
                                category={produto.category}
                                maker={produto.maker}
                                quantityAvailable={produto.quantityAvailable}
                                price={produto.price}
                            />
                        );
                })
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
        </ItemsContainer>
    )
}
