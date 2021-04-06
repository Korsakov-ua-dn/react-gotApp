import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import PropTypes from 'prop-types';

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props
        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const lable = this.props.renderItem(item);
            return (
                <li 
                    key={id} // не забыть обязательно присвоить уникальный ключ каждому новому элементу
                    onClick={() =>  this.props.onItemSelected(id)}
                    className="list-group-item">
                    {lable}
                </li>
            )
        })
    }
    render() {
        const {itemList} = this.state
        if (!itemList) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}