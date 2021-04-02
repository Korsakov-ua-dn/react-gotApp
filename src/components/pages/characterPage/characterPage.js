import React, {Component} from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../error';
import gotService from '../../../services/gotService'
import RowBlock from '../../rowBlock';
import ItemDetails, {Field} from '../../itemDetails';

export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedItem: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={(item) => item.name} />
        )
        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getId={this.gotService.getCharacter} >
                    <Field field='gender' lable='Gender' />
                    <Field field='born' lable='Born' />
                    <Field field='died' lable='Died' />
                    <Field field='culture' lable='Culture' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}