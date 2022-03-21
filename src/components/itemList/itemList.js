import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';


function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect (() => {
        getData()
            .then((data)=>{
                updateList(data)
            })
    }, []);


    function renderItems(arr){
        return arr.map((item)=>{
            const {id} = item;
            const label = renderItem(item);
            return (
                <li 
                    className="list-group-item"
                    key={item.id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li> 
            )
        })
    }



    if(!itemList){
        return <Spinner/>
    }
    const items = renderItems(itemList)

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );

}

export default ItemList;