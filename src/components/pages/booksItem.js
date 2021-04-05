import React, {Component} from 'react';
import gotService from '../../services/gotService'
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new gotService();

    render() {
        return (
            <ItemDetails 
                itemId={this.props.bookId}
                getId={this.gotService.getBook} >
                    <Field field='numberOfPages' lable='NumberOfPages' />
                    <Field field='publisher' lable='Publisher' />
                    <Field field='released' lable='Released' />
            </ItemDetails>
        )
    }
}

