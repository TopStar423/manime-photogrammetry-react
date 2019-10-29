import React, { Component } from 'react';
import Box from '../Box';

export default class OrderReviewQDataModal extends Component {
    constructor(props) {
        super(props);
    }

    onClick = e => {
        if (!this.modal.contains(e.target)) {
            this.props.onCloseModal();
        }
    };

    render() {
        const { data } = this.props;
        const qDatakey = [
            ['Q1', 'q1', 'Q1 Response', 'q1Response'],
            ['Q2', 'q2', 'Q2 Response', 'q2Response'],
            ['Q3', 'q3', 'Q3 Response', 'q3Response']
        ];

        return (
            <Box
                position='absolute'
                width='100%'
                height='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                bg='rgba(0,0,0,0.7)'
                onClick={this.onClick}>
                <Box
                    ref={ref => (this.modal = ref)}
                    width={500}
                    height={500}
                    p={50}
                    bg='#ffffff'
                    display='flex'
                    flexDirection='column'
                    overflow='auto'
                    zIndex={100}>
                    {qDatakey.map(keys => (
                        <div style={{borderBottom: '1px solid #ddd', margin: '5px 0'}}>
                            <p>{keys[0]}: {data[keys[1]]}</p>
                            <p>{keys[2]}: {data[keys[3]]}</p>
                        </div>
                    ))}
                </Box>
            </Box>
        )
    }
}
