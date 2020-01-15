import React from 'react';
import Catalog from "./Catalog";

import { render } from '@testing-library/react'

describe('CatalogList', ()=>{
    const items = [
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: true},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: true},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: true}];

    test('The Catalog List will contain 6 items', ()=>{

        const {queryAllByTestId} = render(<Catalog catalogItems={items}/>)
        const catalogListItems = queryAllByTestId('catalog-list-item')
        expect(catalogListItems.length).toEqual(6)
    })

    test('The Catalog List will contain 3 items that need to be added to the shopping list', ()=>{
        const {queryAllByTestId} = render(<Catalog catalogItems={items}/>)
        const outOfStockItems = queryAllByTestId('catalog-list-item-out').filter(item => item.checked);
        expect(outOfStockItems.length).toEqual(3)

    })

});