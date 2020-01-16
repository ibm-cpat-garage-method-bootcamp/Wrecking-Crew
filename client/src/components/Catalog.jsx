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
import Modal from '@material-ui/core/Modal';
import { Popover, Table, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";

function ExpandedViewModal(props){
    const {expandedEl, expandedElObj,closeExpandedView} = props;
    React.useEffect(()=>{
        console.log(expandedElObj)
    },[expandedEl])
    return <Popover 
            open={!!expandedEl}
            onClose={closeExpandedView}
            anchorEl={expandedEl}
            >
          <div id="simple-modal-description" style={{width:'400px', height:'400px'}}>
            <Table>
                <TableHead>
                    <TableCell>
                            <h4>Store</h4>
                    </TableCell>
                    <TableCell>
                        <h4>Aisle</h4>
                    </TableCell> 
                </TableHead>
                <TableBody>
                    {expandedElObj 
                    && expandedElObj['store/aisle'] 
                    && expandedElObj['store/aisle'].map((storeAislePair)=>
                    <TableRow>
                        <TableCell>
                            {storeAislePair.store}
                        </TableCell>
                        <TableCell>
                            {storeAislePair.aisle}
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
          </div>
    </Popover>
}

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
            catalogItems: sortedCatalogItems,
            expandedEl: '',
            expandedElObj:null
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
            <StructuredListRow data-testid='catalog-list-item' key={row.id} onClick={(e)=>this.openExpandedItem(e.target, id)}>
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

    openExpandedItem = (expandedEl, expandedElId)=>{
        const expandedElObj = this.state.catalogItems[expandedElId];
        this.setState({expandedEl, expandedElObj})
    }

    render() {
        return (
            <div className="bx--grid pattern-container">
                <Header
                    title="Catalog"
                    subtitle="Please add items to your favorite items to your catalog"
                />
                <div className="bx--row">
                    <div className="bx--col-xs-12">
                        <StructuredListWrapper selection border >
                            <StructuredListRow head >
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
                    <ExpandedViewModal 
                        expandedEl={this.state.expandedEl} 
                        expandedElObj={this.state.expandedElObj} 
                        closeExpandedView={()=>this.setState({expandedEl:'', expandedElObj:null})}
                    />
                </div>
            </div>
        );
    }
}

export default Catalog;
