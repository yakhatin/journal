import React from 'react';
import { Drawer } from 'devextreme-react';
import NavigationList from './navigation-list';

export default (props) => {
    return (
        <Drawer
            opened={props.opened}
            openedStateMode={'overlap'}
            position={'left'}
            revealMode={'slide'}
            component={NavigationList}
            height={'100%'}>
            {props.children}
        </Drawer>
    );
};