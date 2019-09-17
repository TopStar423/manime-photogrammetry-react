import React, { Component } from 'react';
import Box from './Box';
import {
    Header,
    HeaderEnabledPermissions,
    HeaderAdminAccount,
    AdminList,
    AdminAccessItem,
    EnablePermission,
    AdminAccount,
    PermissonCheckbox
} from './styled/AdminAccessModal.styled';

import { addAttributeAdminDynamoDB, deleteAttributeAdminDynamoDB } from '../utils/lambdaFunctions';

export default class AdminAccessModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adminChecked: []
        };
        this.onClick = this.onClick.bind(this);
        this.handleEnablePermission = this.handleEnablePermission.bind(this);
    }

    componentDidMount() {
        const { adminList, clientId } = this.props;
        const { adminChecked } = this.state;

        adminList.map((admin, index) => {
            adminChecked[index] = Object.values(admin).indexOf(clientId) > -1;
        });
        this.setState({ adminChecked });
    }

    onClick = async e => {
        if (this.modal.contains(e.target)) {
            return;
        } else {
            const { adminList, clientId, onUpdateAdminAccess } = this.props;
            const { adminChecked } = this.state;

            const allPromise = adminChecked.map((checked, index) => {
                if (checked) {
                    return addAttributeAdminDynamoDB(adminList[index].userId, clientId);
                } else {
                    return deleteAttributeAdminDynamoDB(adminList[index].userId, clientId);
                }
            })

            Promise.all(allPromise).then(values => {
                const adminsGroup = adminList.filter((admin, index) => adminChecked[index] === true);
                onUpdateAdminAccess(adminsGroup.map(admin => admin.username).join(', '));
            })
        }
    };

    handleEnablePermission = async (index) => {
        const { adminChecked } = this.state;

        adminChecked[index] = !adminChecked[index];

        this.setState({ adminChecked });
    };

    render() {
        const { adminList } = this.props;
        const { adminChecked } = this.state;

        return (
            <Box
                position='absolute'
                width='100%'
                height='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                bg='rgba(0,0,0,0.7)'
                onClick={this.onClick}>
                <Box
                    ref={ref => (this.modal = ref)}
                    width={500}
                    p={30}
                    bg='#ffffff'
                    display='flex'
                    flexDirection='row'
                    flexWrap='wrap'
                    zIndex={100}>
                    <Header>
                        <HeaderEnabledPermissions>Enabled Permissions</HeaderEnabledPermissions>
                        <HeaderAdminAccount>Admin Account</HeaderAdminAccount>
                    </Header>
                    <AdminList>
                        {adminList.map((admin, index) =>
                            <AdminAccessItem>
                                <EnablePermission>
                                    <PermissonCheckbox
                                        type="checkbox"
                                        checked={adminChecked[index]}
                                        onChange={e => this.handleEnablePermission(index)}/>
                                </EnablePermission>
                                <AdminAccount>{admin.username}</AdminAccount>
                            </AdminAccessItem>
                        )}
                    </AdminList>
                </Box>
            </Box>
        )
    }
}
