import React from 'react';
import { Toolbar } from "devextreme-react";
import './styles.css';

export default () => {
    const toolbarItems = [
        {
            location: 'before',
            widget: 'dxButton',
            options: {
                icon: 'menu',
                onClick: () => console.log(321)
            }
        },
        {
            location: 'before',
            text: 'Журнал'
        }
    ];
    
    return (
        <Toolbar
            className={'header-container'}
            items={toolbarItems}
        />
    );
};