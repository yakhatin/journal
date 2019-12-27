import React from 'react';
import { Popup } from 'devextreme-react/popup';

export default (props) => {
    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            closeOnOutsideClick={true}
            showTitle={true}
            title={props.title}
            width={props.width}
            height={props.height}>
            {props.children}
        </Popup>
    )
}