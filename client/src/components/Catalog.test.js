import React from 'react';
import Catalog from "./Catalog";

import { render, fireEvent } from '@testing-library/react'


describe('CatalogList', ()=>{
    const items = [
        {name: 'Banana', comment: 'delicious', 'size/weight': 'Large', outOfStock: false, id:0},
        {name: 'Apple', comment: 'delicious', 'size/weight': 'Large', outOfStock: true, id:1},
        {name: 'Eggs', comment: 'delicious', 'size/weight': 'Large', outOfStock: false, id:2},
        {name: 'Tofu', comment: 'delicious', 'size/weight': 'Large', outOfStock: true, id:3},
        {name: 'Salmon', comment: 'delicious', 'size/weight': 'Large', outOfStock: false, id:4},
        {name: 'Milk', comment: 'delicious', 'size/weight': 'Large', outOfStock: false, id:5}];

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

    test("Identifies that a delete button exists on all catalog list",()=>{
        const {queryAllByTestId} = render(<Catalog catalogItems={items}/>)
        const deleteButton = queryAllByTestId('remove-catalog-item')
        expect(deleteButton.length).toEqual(6)
    })
    test("Identifies that the item removed is no longer on the list",()=>{
        const {queryAllByTestId,debug} = render(<Catalog catalogItems={items} shoppingListItems = {items}/>)
        const deleteButtons = queryAllByTestId('remove-catalog-item')

        fireEvent.click(deleteButtons[1])
        debug()
        const listItems = queryAllByTestId('catalog-list-item')
        expect(listItems.length).toEqual(0)
    })
    test('Clicking on an item will open the expanded view', (done)=>{
        const {queryAllByTestId, getAllByTestId} = render(<Catalog catalogItems={items} />)
        const catalogListItems = queryAllByTestId('catalog-list-item')
        for(const catalogItem of catalogListItems){
            fireEvent.click(catalogItem);
            getAllByTestId('catalog-item-expanded-view');
        }
        done()
    })
});