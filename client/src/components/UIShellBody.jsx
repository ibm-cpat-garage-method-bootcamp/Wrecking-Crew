import React, { Component } from "react";
import SimpleList from "../pattern-components/SimpleList";
import ShoppingList from "./ShoppingList";
import Catalog from "./Catalog";
import NewCatalogItemForm from "./NewCatalogItemForm";
import "../pattern-components/patterns.scss";
import { getCatalogItems, getShoppingListItems } from '../util/api';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

class UIShellBody extends Component {

  render() {
    return (
      <div className="pattern-container">
          <Switch>
            <Route 
              path="/catalog" 
              render={(props)=>
              <Catalog 
                {...props} 
                />}
              />
              <Route 
              path="/shopping-list" 
              render={(props)=>
              <ShoppingList 
                {...props} 
                />}
              />
              <Route 
              path="/new-catalog-item" 
              render={(props)=>
              <NewCatalogItemForm 
                {...props} 
                />}
              />
          </Switch>
      </div>
    );
  }
}
export default UIShellBody;
