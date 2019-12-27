import React, { useState } from 'react';
import { Drawer } from 'devextreme-react';
import Dialog from '../Popup';
import Edit from './editing';
import NavigationList from './navigation-list';

export default (props) => {
    const [subjectDialogVisible, setSubjectDialogVisible] = useState(false);

    const component = () => {
        return (
            <NavigationList
                showSubjectDialog={setSubjectDialogVisible.bind(this, true)}
                setSelectedSubject={props.setSelectedSubject}
                selectedSubject={props.selectedSubject}
                setOpenedCallBack={props.setOpenedCallBack} />
        )
    };

    const toogleDialog = () => {
        setSubjectDialogVisible(value => !value);
    };

    return (
        <React.Fragment>
            <Drawer
                opened={props.opened}
                openedStateMode={'overlap'}
                position={'left'}
                revealMode={'slide'}
                component={component}
                height={'100%'}>
                {props.children}
            </Drawer>
            <Dialog
                visible={subjectDialogVisible}
                onHiding={setSubjectDialogVisible.bind(this, false)}
                width={800}
                height={750}>
                <Edit toogleDialog={toogleDialog} visible={subjectDialogVisible} />
            </Dialog>
        </React.Fragment>
    );
};