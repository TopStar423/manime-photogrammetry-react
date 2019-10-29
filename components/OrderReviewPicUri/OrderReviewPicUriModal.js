import React, { Component } from 'react';
import Box from '../Box';

export default class OrderReviewPicUriModal extends Component {
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
        const picUrikey = [
            ['PicUri1', 'picuri1'],
            ['PicUri2', 'picuri2'],
            ['PicUri3', 'picuri3'],
            ['PicUri4', 'picuri4'],
            ['PicUri5', 'picuri5']
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
                    {picUrikey.map(keys => (
                        <div style={{borderBottom: '1px solid #ddd', margin: '5px 0'}}>
                            <p>{keys[0]}: {data[keys[1]]}</p>
                        </div>
                    ))}
                </Box>
            </Box>
        )
    }
}
