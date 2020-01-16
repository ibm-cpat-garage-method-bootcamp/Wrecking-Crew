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

export{
    defaultCatalogItems,
    defaultShoppingListItems
}