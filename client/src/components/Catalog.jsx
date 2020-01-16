import React, { Component } from "react";
import {
    StructuredListWrapper,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    StructuredListInput,
    Toggle,
    Button
} from "carbon-components-react";
import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";
import { Popover, Table, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { getCatalogItems } from "../util/api";
import * as _ from 'lodash';

function ExpandedViewModal(props){
    const {expandedEl, expandedElObj,closeExpandedView} = props;

    return <Popover 
            open={!!expandedEl}
            onClose={closeExpandedView}
            anchorEl={expandedEl}
            >
          <div 
            id="simple-modal-description" 
            style={{width:'400px', 
                height:'400px',     
                display:'flex', 
                flexDirection:'column',
                justifyContent:'space-between', 
                alignItems:'center'}}

            data-testid='catalog-item-expanded-view'
          >
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
            <Button onClick = { closeExpandedView} style = {{width: '100%', height: '50px', maxWidth:'none'}}>
                Close
            </Button>
          </div>

    </Popover>
}

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catalogItems: [],
            expandedEl: '',
            expandedElObj:null
        }
    }

    async componentDidMount(){
       const unsortedCatalogItems = await getCatalogItems();
        let catalogItems = _.sortBy(unsortedCatalogItems, obj=>obj.name.toLowerCase());
       this.setState({catalogItems});
    }

    onAddItemToggle = (id , e)=> {
        let catalogItem = this.state.catalogItems[id];
        let newCatalogItems = this.state.catalogItems;
        newCatalogItems[id] = {...catalogItem, outOfStock: !catalogItem.outOfStock};
        this.setState({catalogItems: newCatalogItems});
        console.log('Added to shopping list')
    };

    deleteButtonClick = (name) => {
    
        name = name.toLowerCase()
        
        let catalogItems = this.state.catalogItems.filter((item)=>{
          
            return item.name.toLowerCase() !== name
        })

        let shoppingListItems = this.props.shoppingListItems.filter((item)=>{
            
            return item.name.toLowerCase() !== name
        })

            
        this.props.parentState({
            catalogItems: catalogItems,
            shoppingListItems:shoppingListItems
        })

            this.setState({
                catalogItems: catalogItems
            })
    }


    openExpandedItem = (e, expandedElId)=>{
        const expandedEl = e.target;
        const expandedElObj = this.state.catalogItems[expandedElId];
        this.setState({expandedEl, expandedElObj})
    }

    renderRow = (row, id) => {
        return (
            <StructuredListRow 
                data-testid='catalog-list-item'
                id="catalog-list-item"
                key={row.id} 
                onClick={(e)=>{
                    if([e.target.parentElement.id, e.target.id].includes("catalog-list-item")){    
                        this.openExpandedItem(e, id)
                    }
                  }
                }
                >
                <div>
                    <StructuredListInput
                        id={`row-${row.id}`}
                        value="row-0"
                        title="row-0"
                        name="row-0"
                        //defaultChecked={this.state.selectedRow === id}
                        checked={row.outOfStock}
                    />
                    <StructuredListCell
                    >
                        <Toggle 
                          data-testid='catalog-list-item-out' 
                          toggled={row.outOfStock} 
                          onChange={(e) => {
                              this.onAddItemToggle(id,e);
                            }}
                          labelA=""
                          labelB=""
                        />
                    </StructuredListCell>
                </div>
                <StructuredListCell className="simple-list-row" >
                    {row.name}
                </StructuredListCell>
                <StructuredListCell className="simple-list-row" >
                    {row.comment}
                </StructuredListCell>
                <StructuredListCell className="simple-list-row" >
                    {row['size/weight']}
                </StructuredListCell>
                <StructuredListCell className="simple-list-row">
                    <Button data-testid="remove-catalog-item" kind="danger" onClick={()=>this.deleteButtonClick(row.name)} > Remove </Button>
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
