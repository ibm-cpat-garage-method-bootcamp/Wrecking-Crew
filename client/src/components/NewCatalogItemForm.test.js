import React from 'react';
import 'jest';
import NewCatalogItemForm from './NewCatalogItemForm';
import {
    render,fireEvent, wait
  } from '@testing-library/react';

describe('Shopping list', ()=>{
    test('That user can add an item to the catalog', (done)=>{
        const {getByTestId} = render(<NewCatalogItemForm/>)
        const addCatalogItemButton = getByTestId('add-catalog-item-button');
        const nameInput = getByTestId('input-name');
        fireEvent.change(nameInput,{target:{value:"orange juice"}})
        fireEvent.click(addCatalogItemButton, {button:0});
        // expect(addedItem).toEqual({name:'orange juice', 'size/weight':"", comment:"", 'store/aisle':[]})
        wait(done, {timeout:1000})
    })
    test('That the user cannot add a duplicate item', (done)=>{
        const items = [
            {name:"banana"},
            {name:"apples"},
            {name:"milk"},
            {name:"almonds"},
            {name:"lays potato chips"}
        ];
        let addedItem={};
        const addCatalogItem = (item)=>{
            addedItem = item;
        }
        const {getByTestId} = render(<NewCatalogItemForm />)
        const addCatalogItemButton = getByTestId('add-catalog-item-button');
        const nameInput = getByTestId('input-name');
        fireEvent.change(nameInput,{target:{value:"apples"}})
        fireEvent.click(addCatalogItemButton, {button:0});
        expect(addedItem).toEqual({})
        wait(done, {timeout:1000})
    })
 })