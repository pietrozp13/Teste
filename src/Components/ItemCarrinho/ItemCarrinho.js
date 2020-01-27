import React, { useState } from 'react'
import { Paper, IconButton, Chip, TextField } from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Check from '@material-ui/icons/Check';

import { ItemContainer, Item, ItemImage, SkuText, TitleText, CategoriaContainer, MarkerText, InfosGrup, SelectGrup } from './styles'


export default function ItemProduto({
    sku,
    name,
    imageURL,
    category,
    maker,
    quantityAvailable,
    quantity,
    price,
    handleRemove,
    addCart
}) {
    const [totalItem, setTotalItem] = useState(quantity)

    const isSelectDisabled = () => {
        return quantity === totalItem
    }

    return (
        <ItemContainer>
            <Paper elevation={3} style={{ width: "100%", height: "100%" }}>
                <Item>
                    <ItemImage src={imageURL}/>
                    <div>
                        <MarkerText>{maker}</MarkerText>
                        <TitleText><b>{name}</b></TitleText>
                        <SkuText>{sku}</SkuText>
                    </div>
                    <CategoriaContainer>
                        <Chip label={category} variant="outlined" style={{ color: "#3cba92", }} size="small" />
                    </CategoriaContainer>
                    <SelectGrup>
                        <TextField
                            style={{ maxHeight: "20px", fontSize: "10px" }}
                            type="number"
                            size="small"
                            margin="dense"
                            variant="outlined"
                            value={totalItem}
                            onChange={(event)=>{
                                setTotalItem(event.target.value)
                            }}
                            inputProps={{
                                min: 0,
                                max: quantityAvailable
                            }} 
                        />
                        <IconButton
                            disabled={isSelectDisabled()}
                            onClick={() => addCart(sku, totalItem)}
                            aria-label="Remover item do carrinho"
                        >
                            <Check style={{ color: isSelectDisabled() ? "gray" : "#3cba92", fontSize: 20 }}/>
                        </IconButton>
                    </SelectGrup>
                    <InfosGrup>
                        <b>Preço: R$ {price}</b>
                        <b>Total: R$ {(price * totalItem).toFixed(2)}</b>
                    </InfosGrup>
                    <IconButton onClick={handleRemove} aria-label="Remover item do carrinho">
                        <DeleteForever style={{ color: "red", fontSize: 24 }}/>
                    </IconButton>
                </Item>
            </Paper>
        </ItemContainer>
    )
}
