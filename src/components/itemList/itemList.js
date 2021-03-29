import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItem(arr) {
        return arr.map((item) => {
            return (
                <li 
                    key={item.url} // не забыть обязательно присвоить уникальный ключ каждому новому элементу
                    className="list-group-item">
                    {item.name}
                </li>
            )
        })
    }
    //.match(/\d/g)
    render() {
        const {charList} = this.state
        if (!charList) {
            return <Spinner/>
        }
        const items = this.renderItem(charList);

        // console.log(items);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}