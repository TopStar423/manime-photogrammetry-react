import React, { Component } from 'react';
import Box from '../Box';
import OrderReviewPicture from './OrderReviewPicture';
import {
    TableHeader,
    TableIndex,
    TableType,
    TableDescription,
    TablePictures,
    TableItem
} from '../styled/OrderReviewModal.styled';

export default class OrderReviewDetailsModal extends Component {
    constructor(props) {
        super(props);
    }

    onClick = e => {
        if (!this.modal.contains(e.target)) {
            this.props.onCloseModal();
        }
    };

    renderPicture = url => {

    };

    render() {
        const { data } = this.props;

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
                    width={700}
                    height={800}
                    p={10}
                    bg='#ffffff'
                    display='flex'
                    flexDirection='column'
                    overflow='auto'
                    zIndex={100}>
                    <div className="info">
                        <p className="user-id">User id: { data.userId }</p>
                        <p className="email">Email: { data.email }</p>
                        <p className="order-id">Order #: { data.shopifyOrderNumber }</p>
                    </div>
                    <div className="details-table">
                        <TableHeader>
                            <TableIndex></TableIndex>
                            <TableType>Type</TableType>
                            <TableDescription>Description</TableDescription>
                            <TablePictures>Pictures</TablePictures>
                        </TableHeader>
                        <TableItem>
                            <TableIndex>All</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? 'Na' : data.reviewAll }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? 'Na' : data.reviewAllDescription }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    'Na'
                                ) : (
                                    <React.Fragment>
                                        <OrderReviewPicture imageKey={data.picUri1} />
                                        <OrderReviewPicture imageKey={data.picUri2} />
                                        <OrderReviewPicture imageKey={data.picUri3} />
                                        <OrderReviewPicture imageKey={data.picUri3} />
                                        <OrderReviewPicture imageKey={data.picUri3} />
                                    </React.Fragment>
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F0 - Left pinky</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f0Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f0Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f0PicUri1) }
                                        { this.renderPicture(data.f0PicUri2) }
                                        { this.renderPicture(data.f0PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F1 - Left ring</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f1Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f1Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f1PicUri1) }
                                        { this.renderPicture(data.f1PicUri2) }
                                        { this.renderPicture(data.f1PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F2 - Left middle</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f2Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f2Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f2PicUri1) }
                                        { this.renderPicture(data.f2PicUri2) }
                                        { this.renderPicture(data.f2PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F3 - Left index</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f3Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f3Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f3PicUri1) }
                                        { this.renderPicture(data.f3PicUri2) }
                                        { this.renderPicture(data.f3PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F4 - Left thumb</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f4Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f4Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f4PicUri1) }
                                        { this.renderPicture(data.f4PicUri2) }
                                        { this.renderPicture(data.f4PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F5 - Right thumb</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f5Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f5Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f5PicUri1) }
                                        { this.renderPicture(data.f5PicUri2) }
                                        { this.renderPicture(data.f5PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F6 - Right index</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f6Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f6Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f6PicUri1) }
                                        { this.renderPicture(data.f6PicUri2) }
                                        { this.renderPicture(data.f6PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F7 - Right middle</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f7Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f7Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f7PicUri1) }
                                        { this.renderPicture(data.f7PicUri2) }
                                        { this.renderPicture(data.f7PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F8 - Right ring</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f8Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f8Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f8PicUri1) }
                                        { this.renderPicture(data.f8PicUri2) }
                                        { this.renderPicture(data.f8PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                        <TableItem>
                            <TableIndex>F9 - Right pinky</TableIndex>
                            <TableType>{ data.reviewSomeAll === 'Some' ? data.f9Q1Response : 'Na' }</TableType>
                            <TableDescription>{ data.reviewSomeAll === 'Some' ? data.f9Q3Response : 'Na' }</TableDescription>
                            <TablePictures>
                                {data.reviewSomeAll === 'Some' ? (
                                    <React.Fragment>
                                        { this.renderPicture(data.f9PicUri1) }
                                        { this.renderPicture(data.f9PicUri2) }
                                        { this.renderPicture(data.f9PicUri3) }
                                    </React.Fragment>
                                ) : (
                                    'Na'
                                )}
                            </TablePictures>
                        </TableItem>
                    </div>
                </Box>
            </Box>
        )
    }
}
