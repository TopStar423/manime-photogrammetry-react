import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import { StandardButton, StandardInput } from "../../../components/StyledComponents";
import { BoardBodyOptions } from "../../../components/styled/BoardBody";
import { tableName } from "../../../static/constants/reviewOrders";

export default class BoardBodyOptionsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { table, data, searchValue, getData, toggleRemoved, updateSearchBar } = this.props;
        const date = new Date();

        return (
            <BoardBodyOptions table={table}>
                <StandardButton
                    ml={3}
                    onClick={getData}
                >
                    Refresh
                </StandardButton>
                <StandardButton
                    ml={3}
                    onClick={toggleRemoved}
                >
                    Toggle Removed
                </StandardButton>
                <StandardButton ml={3} disabled>Save</StandardButton>
                <CSVLink data={data} filename={`${tableName}-${date.toString()}.csv`}>
                    <StandardButton ml={3} style={{ textDecoration: 'none' }}>Save CSV</StandardButton>
                </CSVLink>
                <StandardInput
                    ml={3}
                    value={searchValue}
                    onChange={(ev) => updateSearchBar(ev.target.value.toLowerCase())} />
            </BoardBodyOptions>
        )
    }
}
