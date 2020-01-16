import React from 'react';
import Catalog from "./Catalog";

import { render, fireEvent, wait } from '@testing-library/react'
import {defaultCatalogItems, defaultShoppingListItems} from '../util/dummyData';

describe('CatalogList', ()=>{
    const items = defaultCatalogItems; 

    test('The Catalog List will contain 6 items', async (done)=>{

        const {findAllByTestId} = render(<Catalog/>)
        const catalogListItems = await findAllByTestId('catalog-list-item')
        expect(catalogListItems.length).toEqual(items.length)
        done()
    })

    test('The Catalog List will contain 2 items that need to be added to the shopping list/not in stock',async (done)=>{
        const {findAllByTestId} = render(<Catalog />)
        const outOfStockItems = await findAllByTestId('catalog-list-item-out').then(data=>data.filter(item => item.checked));
        expect(outOfStockItems.length).toEqual(2)
        done()
    })
    describe('expanded view', ()=>{
        test('Clicking on an item will open the expanded view', async (done)=>{
            const {findAllByTestId, getAllByTestId, getByTestId} = render(<Catalog/>)
            const catalogListItems = await findAllByTestId('catalog-list-item')
            for(const catalogItem of catalogListItems){
                fireEvent.click(catalogItem);
                const expandedView = getAllByTestId('catalog-item-expanded-view');
                getByTestId('close-expanded-view');
            }
            done()
        })
        test('Close button works', async (done)=>{
            const {findAllByTestId, getByTestId, queryByTestId} = render(<Catalog/>)
            const catalogListItems = await findAllByTestId('catalog-list-item')
            fireEvent.click(catalogListItems[0]);
            const closeButton = getByTestId('close-expanded-view')
            fireEvent.click(closeButton);
            await wait(()=>{}, {timeout:300})
            const expandedView = queryByTestId('catalog-item-expanded-view');
            expect(expandedView).toEqual(null)
            done()
         }) 
    })
});