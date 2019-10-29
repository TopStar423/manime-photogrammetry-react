import React, { Component } from 'react';
import Box from '../Box';

export default class OrderReviewFDataModal extends Component {
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
        const fDatakey = [
            ['F0', 'f0Q1', 'f0Q1Response', 'f0Q2', 'f0Q2Response', 'f0Q3', 'f0Q3Response', 'f0PicUri1', 'f0PicUri2', 'f0PicUri3'],
            ['F1', 'f1Q1', 'f1Q1Response', 'f1Q2', 'f1Q2Response', 'f1Q3', 'f1Q3Response', 'f1PicUri1', 'f1PicUri2', 'f1PicUri3'],
            ['F2', 'f2Q1', 'f2Q1Response', 'f2Q2', 'f2Q2Response', 'f2Q3', 'f2Q3Response', 'f2PicUri1', 'f2PicUri2', 'f2PicUri3'],
            ['F3', 'f3Q1', 'f3Q1Response', 'f3Q2', 'f3Q2Response', 'f3Q3', 'f3Q3Response', 'f3PicUri1', 'f3PicUri2', 'f3PicUri3'],
            ['F4', 'f4Q1', 'f4Q1Response', 'f4Q2', 'f4Q2Response', 'f4Q3', 'f4Q3Response', 'f4PicUri1', 'f4PicUri2', 'f4PicUri3'],
            ['F5', 'f5Q1', 'f5Q1Response', 'f5Q2', 'f5Q2Response', 'f5Q3', 'f5Q3Response', 'f5PicUri1', 'f5PicUri2', 'f5PicUri3'],
            ['F6', 'f6Q1', 'f6Q1Response', 'f6Q2', 'f6Q2Response', 'f6Q3', 'f6Q3Response', 'f6PicUri1', 'f6PicUri2', 'f6PicUri3'],
            ['F7', 'f7Q1', 'f7Q1Response', 'f7Q2', 'f7Q2Response', 'f7Q3', 'f7Q3Response', 'f7PicUri1', 'f7PicUri2', 'f7PicUri3'],
            ['F8', 'f8Q1', 'f8Q1Response', 'f8Q2', 'f8Q2Response', 'f8Q3', 'f8Q3Response', 'f8PicUri1', 'f8PicUri2', 'f8PicUri3'],
            ['F9', 'f9Q1', 'f9Q1Response', 'f9Q2', 'f9Q2Response', 'f9Q3', 'f9Q3Response', 'f9PicUri1', 'f9PicUri2', 'f9PicUri3']
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
                    {fDatakey.map(keys => (
                        <div style={{borderBottom: '1px solid #ddd', margin: '5px 0'}}>
                            <h2>{keys[0]}</h2>
                            <p>Q1: {data[keys[1]]}</p>
                            <p>Q1 Response: {data[keys[2]]}</p>
                            <p>Q2: {data[keys[3]]}</p>
                            <p>Q2 Response: {data[keys[4]]}</p>
                            <p>Q3: {data[keys[5]]}</p>
                            <p>Q3 Response: {data[keys[6]]}</p>
                            <p>PicUri 1: {data[keys[7]]}</p>
                            <p>PicUri 2: {data[keys[8]]}</p>
                            <p>PicUri 3: {data[keys[9]]}</p>
                        </div>
                    ))}
                </Box>
            </Box>
        )
    }
}
