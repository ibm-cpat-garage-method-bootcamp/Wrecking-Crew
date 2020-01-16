import React, { Component } from "react";
import {
    StructuredListWrapper,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    StructuredListInput,
    Toggle
} from "carbon-components-react";
import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";

class Catalog extends Component {
    constructor(props) {
        super(props);
        let sortedCatalogItems = props.catalogItems.sort((a, b)=>{
            let item1 = a.name;
            let item2 = b.name;

            if (item1 < item2) {
                return -1
            }
            if (item1 > item2){
                return 1
            }
            return 0;
        });

        this.state = {
            catalogItems: sortedCatalogItems
        }
    }

    onRowClick = id => {
        let catalogItem = this.state.catalogItems[id];
        let newCatalogItems = this.state.catalogItems;
        newCatalogItems[id] = {...catalogItem, outOfStock: !catalogItem.outOfStock};

        this.setState({catalogItems: newCatalogItems});
        console.log('Added to shopping list')
    };

    renderRow = (row, id) => {
        return (
            <StructuredListRow data-testid='catalog-list-item' key={row.id}>
                <div>
                    <StructuredListInput
                        id={`row-${row.id}`}
                        value="row-0"
                        title="row-0"
                        name="row-0"
                        //defaultChecked={this.state.selectedRow === id}
                        checked={row.outOfStock}
                    />
                    <StructuredListCell>
                        <Toggle data-testid='catalog-list-item-out' toggled={row.outOfStock} onClick={() => this.onRowClick(id)}/>
                    </StructuredListCell>
                </div>
                <StructuredListCell className="simple-list-row">
                    {row.name}
                </StructuredListCell>
                <StructuredListCell className="simple-list-row">
                    {row.comment}
                </StructuredListCell>
                <StructuredListCell className="simple-list-row">
                    {row['size/weight']}
                </StructuredListCell>
                <StructuredListCell/>
            </StructuredListRow>
        );
    };

    render() {
        return (
            <div className="bx--grid pattern-container">
                <Header
                    title="Catalog"
                    subtitle="Please add items to your favorite items to your catalog"
                />
                <div className="bx--row">
                    <div className="bx--col-xs-12">
                        <StructuredListWrapper selection border>
                            <StructuredListRow head>
                                <StructuredListCell head />
                                <StructuredListCell head>
                                    Item
                                </StructuredListCell>
                                <StructuredListCell head>
                                    Comments
                                </StructuredListCell>
                                <StructuredListCell head>
                                    Size
                                </StructuredListCell>
                            </StructuredListRow>
                            <StructuredListBody>
                                {this.state.catalogItems.map((row, i) => {
                                    return this.renderRow(row, i);
                                })}
                            </StructuredListBody>
                        </StructuredListWrapper>
                    </div>
                </div>
            </div>
        );
    }
}

export default Catalog;
