import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Icon
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";
import * as _ from 'lodash';

function ShoppingList(props) {
  const [selectedRow, setSelectedRow] = React.useState(0)
  const sortedItemsFromProps = props.items && _.sortBy(props.items, 'name');
  const [items, setItems] = React.useState(sortedItemsFromProps || []);
    
  const onRowClick = id => {
    setSelectedRow(id);
  };

  const columns =['name', 'size/weight','quantity','comment'];

  const renderItem = (item, id) => {
    return (
      <StructuredListRow key={id} onClick={() => onRowClick(id)} data-testid='shopping-list-item'>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            //defaultChecked={this.state.selectedRow === id}
            checked={selectedRow === id}
          />
          <StructuredListCell>
            <Icon
              className="bx--structured-list-svg"
              icon={iconCheckmarkSolid}
            />
          </StructuredListCell>
        </div>
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
                    <StructuredListCell head />
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

