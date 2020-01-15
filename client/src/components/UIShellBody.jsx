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
        comment:"RIPE PLEASE"
      },
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
      shoppingListItems:defaultShoppingListItems,
    }; 
  }
  components = {
    "Simple List": SimpleList,
    "Catalog": Catalog,
    "Shopping List": ShoppingList,
    "New Catalog Item Form":NewCatalogItemForm
  };

  addCatalogItem = (item) => {
    this.setState({catalogItems:[...this.state.catalogItems, item]})
    console.log('New item submitted successfully!', item)
  }

  render() {
    const CurrentList = this.components[this.props.currentList];
    return (
      <div className="pattern-container">
        <CurrentList 
          showDescription={true}
          shoppingListItems={this.state.shoppingListItems} 
          catalogItems={this.state.catalogItems}
          addCatalogItem={this.addCatalogItem}/>
      </div>
    );
  }
}
export default UIShellBody;
