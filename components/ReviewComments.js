import React, { Component } from 'react';
import { Edit } from '@material-ui/icons';
import { CommentsContainer } from './styled/ReviewComments.styled';
import { updateReviewColumn } from '../utils/lambdaFunctions';

export default class ReviewComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editComment: false,
            newComment: '',
            comments: ''
        };

        this.editCommentStyle = {
            direction: 'ltr',
            textAlign: 'left'
        };

        this.handleEditComment = this.handleEditComment.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
    }

    handleEditComment = () => {
        const { comments } = this.props;
        this.setState({ editComment: true });
    };

    handleChangeComment = e => {
        this.setState({ newComment: e.target.value });
    };

    handleSaveComment = () => {
        const { reviewId, columnName } = this.props;
        const { newComment } = this.state;
        updateReviewColumn(reviewId, columnName, newComment);
        this.setState({
            newComment: '',
            editComment: false,
            comments: newComment
        })
    };

    componentDidMount() {
        const { comments } = this.props;
        this.setState({ comments });
    }

    render() {
        const { editComment, comments } = this.state;

        return (
            <CommentsContainer>
                <div>{comments}</div>
                <Edit onClick={this.handleEditComment} />
                {editComment &&
                    <React.Fragment>
                        <input
                            type="text"
                            style={this.editCommentStyle}
                            onChange={this.handleChangeComment}
                        />
                        <button onClick={this.handleSaveComment}>Save</button>
                    </React.Fragment>
                }
            </CommentsContainer>
        )
    }
}
