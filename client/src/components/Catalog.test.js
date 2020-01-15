import React from 'react';
import Catalog from "./Catalog";

import { render } from '@testing-library/react'
import ShoppingList from "./ShoppingList";

describe('CatalogList', ()=>{

    test('The Catalog List will contain 6 items', ()=>{
        const items = [
            {name: 'Banana', comment: 'delicious', 'size/weight': 'Large'},
            {name: 'Banana', comment: 'delicious', 'size/weight': 'Large'},
            {name: 'Banana', comment: 'delicious', 'size/weight': 'Large'},
            {name: 'Banana', comment: 'delicious', 'size/weight': 'Large'},
            {name: 'Banana', comment: 'delicious', 'size/weight': 'Large'},
            {name: 'Banana', comment: 'delicious', 'size/weight': 'Large'}]

        const {queryAllByTestId} = render(<Catalog items={items}/>)
        const catalogListItems = queryAllByTestId('catalog-list-item')
        expect(catalogListItems.length).toEqual(6)
    })

});