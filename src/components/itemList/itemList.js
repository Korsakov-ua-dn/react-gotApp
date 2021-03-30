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
            const id = item.url.match(/\d/g).reduce((acc, cur) => acc + cur);
            // "url": "https://www.anapioficeandfire.com/api/characters/130" из url получаю массив чисел через запятую далее схлопываю.
            return (
                <li 
                    key={id} // не забыть обязательно присвоить уникальный ключ каждому новому элементу
                    onClick={() =>  this.props.onCharSelected(id)}
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

        console.log(items);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}