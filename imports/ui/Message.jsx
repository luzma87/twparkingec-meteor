import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : props.message !== null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible : nextProps.message !== null
        });
    }

    render() {
        const message = this.props.message;
        if (message === null || message.length === 0) {
            return <span/>;
        }
        return (
            <div className="ui negative message">
                {this.props.message}
            </div>
        );
    }
}

Message.propTypes = {
    message : PropTypes.string
};
