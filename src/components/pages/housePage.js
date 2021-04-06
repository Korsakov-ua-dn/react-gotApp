import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../error';
import gotService from '../../services/gotService'
import RowBlock from '../rowBlock';
import ItemDetails, {Field} from '../itemDetails';

export default class HousePage extends Component {

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
            getData={this.gotService.getAllHouses}
            renderItem={(item) => item.name} />
        )
        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getId={this.gotService.getHouse} >
                    <Field field='region' lable='Region' />
                    <Field field='words' lable='Words' />
                    <Field field='titles' lable='Titles' />
                    <Field field='overlord' lable='Overlord' />
                    <Field field='ancestralWeapons' lable='AncestralWeapons' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}