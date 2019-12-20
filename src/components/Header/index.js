import React, { useEffect } from 'react';
import { Toolbar } from "devextreme-react";
import './styles.css';

export default (props) => {
    const toolbarItems = [
        {
            location: 'before',
            widget: 'dxButton',
            options: {
                icon: 'menu',
                onClick: props.setOpenedCallBack
            }
        },
        {
            location: 'before',
            text: 'Журнал'
        }
    ];

    useEffect(() => {
        props.setHeaderRendered(true);
    }, []);

    return (
        <Toolbar
            className={'header-container'}
            items={toolbarItems}
        />
    );
};