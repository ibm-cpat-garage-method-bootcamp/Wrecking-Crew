import {defaultCatalogItems,defaultShoppingListItems} from './dummyData'

if(!window.localStorage.getItem('catalogItems')) {
  window.localStorage.setItem('catalogItems', JSON.stringify(defaultCatalogItems));
}
if(!window.localStorage.getItem('shoppingListItems')) {
  window.localStorage.setItem('shoppingListItems', JSON.stringify(defaultShoppingListItems));
}

async function getShoppingListItems(){
  if(window.localStorage.getItem('shoppingListItems')) {
    return JSON.parse(window.localStorage.getItem('shoppingListItems'));
  } 
    return defaultShoppingListItems;
}
async function getCatalogItems(){
  if(window.localStorage.getItem('catalogItems')) {
    return JSON.parse(window.localStorage.getItem('catalogItems'));
  } 
    return defaultCatalogItems;
}
async function addCatalogItem(item){
  const currentCatalogItems = JSON.parse(window.localStorage.getItem('catalogItems'));
  window.localStorage.setItem('catalogItems', JSON.stringify([...currentCatalogItems, item]))
  return currentCatalogItems.concat([item])
}

export {
    getShoppingListItems,
    getCatalogItems,
    addCatalogItem
}