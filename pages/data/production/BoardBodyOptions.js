import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import { StandardButton, StandardInput } from "../../../components/StyledComponents";
import { BoardBodyOptions } from "../../../components/styled/BoardBody";
import { tableName } from "../../../static/constants/production";

export default class BoardBodyOptionsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { table, data, getData, updateSearchBar, searchValue } = this.props;
        const date = new Date();

        return (
            <BoardBodyOptions table={table}>
                <StandardButton ml={3} onClick={getData}>Refresh</StandardButton>
                <CSVLink data={data} filename={`${tableName}-${date.toString()}.csv`} style={{ textDecoration:  'none' }}>
                    <StandardButton ml={3}>Save CSV</StandardButton>
                </CSVLink>
                <StandardInput ml={3} value={searchValue} onChange={(ev) => updateSearchBar(ev.target.value.toLowerCase())} />
            </BoardBodyOptions>
        )
    }
}
