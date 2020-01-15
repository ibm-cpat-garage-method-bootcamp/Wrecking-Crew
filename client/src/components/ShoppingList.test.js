import React from 'react';
import ShoppingList from './ShoppingList';
import {
    render
  } from '@testing-library/react';

describe('Shopping list', ()=>{
    test('That shopping list will display item "banana" if passed an item array including "banana"', (done)=>{
        const items = [
            {name:"banana"},
            {name:"apples"},
            {name:"milk"},
            {name:"almonds"},
            {name:"lays potato chips"}
        ];
        const {queryAllByTestId} = render(<ShoppingList shoppingListItems={items}/>)
        const shoppingListItems = queryAllByTestId('shopping-list-item')
        expect(shoppingListItems.length).toEqual(5)
        done()
    })
})