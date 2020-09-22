import React from 'react';
import '../scss/Cell.scss'
const Cell = props => {
    const handleCell = () => {
        // console.log(props)
        props.selectCell(props.row, props.column)
    }

    return(
        <div 
            id={props.id}
            className={props.status}
            onClick={handleCell}
        />
    )
}

export default Cell;