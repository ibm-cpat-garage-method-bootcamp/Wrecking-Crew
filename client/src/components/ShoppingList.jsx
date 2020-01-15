import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
} from "carbon-components-react";
import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";
import * as _ from 'lodash';

function ShoppingList(props) {
  const sortedItemsFromProps = props.items && _.sortBy(props.items, 'name');
  const [items, setItems] = React.useState(sortedItemsFromProps || []);
    
  const columns =['name', 'size/weight','quantity','comment'];

  const renderItem = (item, id) => {
    return (
      <StructuredListRow key={id} data-testid='shopping-list-item'>
        {columns.map(column=>(
            <StructuredListCell className="simple-list-row">
                {item[column] || 'N/A'}
            </StructuredListCell>
          ))}
      </StructuredListRow>
    );
  };
    return (
        <div className="bx--grid pattern-container">
        <Header
            title="Shopping List"
            // subtitle="This pattern will display an array of model objects in a simple list column list."
        />
        <div className="bx--row">
            <div className="bx--col-xs-12">
              <StructuredListWrapper selection border>
                  <StructuredListHead>
                    <StructuredListRow head>
                        {columns.map(column=>(
                            <StructuredListCell head style={{textTransform:'capitalize'}}>
                                {column}
                            </StructuredListCell>
                        ))}
                    </StructuredListRow>
                  </StructuredListHead>

                  <StructuredListBody>
                    {items.map((item, i) => {
                        return renderItem(item, i);
                    })}
                  </StructuredListBody>
              </StructuredListWrapper>
            </div>
        </div>
        </div>
    );
}

export default ShoppingList;

