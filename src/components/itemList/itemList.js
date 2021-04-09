import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';

function ItemList({renderItem, onItemSelected, getData}) {

    const [itemList, updateList] = useState([]);
    
    useEffect(() => {
        getData()
            .then( (data) => {
                updateList(data);
            })
    }, []); // пустой массив говорит хуку что эффект необходимо выполнить только при появлении компонента и его исчезновении

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const lable = renderItem(item);
            return (
                <li 
                    key={id} // не забыть обязательно присвоить уникальный ключ каждому новому элементу
                    onClick={() => onItemSelected(id)}
                    className="list-group-item">
                    {lable}
                </li>
            )
        })
    }

    const items = renderItems(itemList);

    if (!itemList) {
        return <Spinner/> 
    }
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

// ItemList.defaultProps = {
//     onItemSelected: () => {}
// }

export default ItemList;