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

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: 0,
            items: props.catalogItems
        };
    }

    onRowClick = id => {
        this.setState({ selectedRow: id });
    };

    renderRow = (row, id) => {
        return (
            <StructuredListRow data-testid='catalog-list-item' key={id} onClick={() => this.onRowClick(id)}>
                <div>
                    <StructuredListInput
                        id={`row-${id}`}
                        value="row-0"
                        title="row-0"
                        name="row-0"
                        //defaultChecked={this.state.selectedRow === id}
                        //checked={this.state.selectedRow === id}
                    />
                    {/*Can used for later development */}
                    {/*<StructuredListCell>*/}
                    {/*    <Icon*/}
                    {/*        className="bx--structured-list-svg"*/}
                    {/*        icon={iconCheckmarkSolid}*/}
                    {/*    />*/}
                    {/*</StructuredListCell>*/}
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
        let data = this.state.items.sort((a, b)=>{
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
                                {data.map((row, i) => {
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
