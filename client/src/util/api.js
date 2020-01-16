const defaultShoppingListItems = [
    {
      name:'banana',
      'size/weight':'large',
      quantity:7,
      comment:"RIPE PLEASE"
    },
    {
      name:'apple',
      'size/weight':'large',
      quantity:7,
      comment:"RIPE PLEASE"
    },
    {
      name:'chips',
      'size/weight':'large',
      quantity:7,
      comment:"RIPE PLEASE"
    },
    {
      name:'soda',
      'size/weight':'large',
      quantity:7,
      comment:"RIPE PLEASE"
    },
    {
      name:'chocolate',
      'size/weight':'large',
      quantity:7,
      comment:"RIPE PLEASE"
    },
  ];

const defaultCatalogItems = [
    {
        name:'banana',
        'size/weight':'large',
        quantity:7,
        comment:"RIPE PLEASE",
        outOfStock: false,
        id: 0,
        'store/aisle':[
            {
            store:'Publix North',
            aisle:'1'
            }
        ]
    },
    {
        name:'Apples',
        'size/weight':'large',
        quantity:7,
        comment:"RIPE PLEASE",
        outOfStock: true,
        id: 1,
        'store/aisle':[
            {
            store:'Publix Central',
            aisle:'10'
            }
        ]
    },
    {
        name:'Eggs',
        'size/weight':'large',
        quantity:7,
        comment:"AA Grade Only",
        outOfStock: true,
        id: 2,
        'store/aisle':[
            {
            store:'Publix South',
            aisle:'4'
            }
        ]
    }
];

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