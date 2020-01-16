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
        id: 0,
        'store/aisle':[
          {
            store:'Publix North',
            aisle:'1'
          }
        ]
      },
      {
        name:'Apple',
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
    //this.changeParentState = this.changeParentState.bind(this)
  }
  components = {
    "Simple List": SimpleList,
    "Catalog": Catalog,
    "Shopping List": ShoppingList,
    "New Catalog Item Form":NewCatalogItemForm
  };
  defaultComponent = this.props.patternName;

  addCatalogItem = (item) => {
    this.setState({catalogItems:[...this.state.catalogItems, item]})
    console.log('New item submitted successfully!', item)
  }

  changeParentState = (state) =>{
    this.setState(state)
  }

  render() {
    const CurrentList = this.components[this.props.currentList];
    let curScreen = this.defaultComponent;
    const PatternName = this.components[curScreen];
    return (
      <div className="pattern-container">
        <CurrentList
          showDescription={true}
          shoppingListItems={this.state.shoppingListItems} 
          catalogItems={this.state.catalogItems}
          parentState= {this.changeParentState.bind(this)}
          addCatalogItem={this.addCatalogItem}/>
          
      </div>
    );
  }
}
export default UIShellBody;
