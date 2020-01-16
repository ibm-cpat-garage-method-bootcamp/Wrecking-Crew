import React from 'react';
import ShoppingList from './ShoppingList';
import {defaultShoppingListItems} from '../util/dummyData'
import {
    render
  } from '@testing-library/react';

describe('Shopping list', ()=>{
    test('That shopping list will display item "banana" if passed an item array including "banana"', async (done)=>{
        const items = defaultShoppingListItems;
        const {findAllByTestId} = render(<ShoppingList />)
        const shoppingListItems = await findAllByTestId('shopping-list-item')
        expect(shoppingListItems.length).toEqual(items.length)
        done()
    })
})