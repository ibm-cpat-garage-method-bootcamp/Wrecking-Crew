import React from 'react';
import Catalog from "./Catalog";

import { render, fireEvent } from '@testing-library/react'

describe('CatalogList', ()=>{
    const items = [
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false, 'store/aisle':[{store:'Publix', aisle:'12'}]},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: true},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: true},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false},
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false}];

    test('The Catalog List will contain 6 items', ()=>{

        const {queryAllByTestId} = render(<Catalog catalogItems={items}/>)
        const catalogListItems = queryAllByTestId('catalog-list-item')
        expect(catalogListItems.length).toEqual(6)
    })

    test('The Catalog List will contain 2 items that need to be added to the shopping list/not in stock', ()=>{
        const {queryAllByTestId} = render(<Catalog catalogItems={items}/>)
        const outOfStockItems = queryAllByTestId('catalog-list-item-out').filter(item => item.checked);
        expect(outOfStockItems.length).toEqual(2)

    })
    test('Clicking on an item will open the expanded view', (done)=>{
        const {queryAllByTestId, getAllByTestId} = render(<Catalog catalogItems={items} />)
        const catalogListItems = queryAllByTestId('catalog-list-item')
        for(const catalogItem of catalogListItems){
            fireEvent.click(catalogItem);
            const expandedView = getAllByTestId('catalog-item-expanded-view');
        }
        done()
    })
});