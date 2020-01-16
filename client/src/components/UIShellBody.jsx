import React, { Component } from "react";
import SimpleList from "../pattern-components/SimpleList";
import ShoppingList from "./ShoppingList";
import Catalog from "./Catalog";
import NewCatalogItemForm from "./NewCatalogItemForm";
import "../pattern-components/patterns.scss";

class UIShellBody extends Component {
  constructor(props){
    super(props);
    const defaultCatalogItems = [
      {
        name:'banana',
        'size/weight':'large',
        quantity:7,
        comment:"RIPE PLEASE",
        outOfStock: false,
        id: 0
      },
      {
        name:'Apples',
        'size/weight':'large',
        quantity:7,
        comment:"RIPE PLEASE",
        outOfStock: true,
        id: 1
      },
      {
        name:'Eggs',
        'size/weight':'large',
        quantity:7,
        comment:"AA Grade Only",
        outOfStock: true,
        id: 2
      }
    ];
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
    this.state ={
      catalogItems:defaultCatalogItems,
      shoppingListItems:defaultShoppingListItems
    }; 
  }
  components = {
    "Simple List": SimpleList,
    "Catalog List": Catalog,
    "Shopping List": ShoppingList,
    "New Catalog Item Form":NewCatalogItemForm
  };
  defaultComponent = this.props.patternName;

  addCatalogItem = (item) => {
    this.setState({catalogItems:[...this.state.catalogItems, item]})
    console.log('New item submitted successfully!', item)
  }

  render() {
    let curScreen = this.defaultComponent;
    const PatternName = this.components[curScreen];
    return (
      <div className="pattern-container">
        <PatternName
          showDescription={true}
          shoppingListItems={this.state.shoppingListItems} 
          catalogItems={this.state.catalogItems}
          addCatalogItem={this.addCatalogItem}/>
      </div>
    );
  }
}
export default UIShellBody;
