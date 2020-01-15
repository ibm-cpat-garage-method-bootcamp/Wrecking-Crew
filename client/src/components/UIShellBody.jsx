import React, { Component } from "react";
import SimpleList from "../pattern-components/SimpleList";
import ShoppingList from "./ShoppingList";
import Catalog from "./Catalog";
import NewCatalogItemForm from "./NewCatalogItemForm";
import "../pattern-components/patterns.scss";

class UIShellBody extends Component {
  components = {
    "Simple List": SimpleList,
    "Catalog List": Catalog,
    "Shopping List": ShoppingList,
    "New Catalog Item Form":NewCatalogItemForm
  };
  defaultComponent = "New Catalog Item Form";
  shoppingListItems = [
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

  render() {
    let curScreen = this.defaultComponent;
    const PatternName = this.components[curScreen];
    return (
      <div className="pattern-container">
        <PatternName showDescription={true} items={this.shoppingListItems}/>
      </div>
    );
  }
}
export default UIShellBody;
