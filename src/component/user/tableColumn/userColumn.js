import React from 'react'
import { Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    KeyOutlined
} from '@ant-design/icons';
import { getRoles } from '../../../function/fn';

export const userCol = ({ handleDelete, handleUserEdit,handleAccountEdit,handleUserRole, setRoleUserID , limit, page }) => {
    let l = limit >= 20 ? limit/page : limit
    let no = ((page-1) * l)

    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            render: (text, record) => (
                <Space size="middle">
                    {no+=1}
                </Space>
            ),
        },
        {
            title: 'ឈ្មោះសម្គាល់អ្នកប្រើប្រាស់',
            dataIndex: 'username',
            key: 'username',
            width: 100,
        },
        {
            title: 'គោត្តនាម',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 100,
        },
        {
            title: 'នាម',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 100,
        },
        {
            title: 'តួនាទី',
            dataIndex: 'roles',
            key: 'roles',
            width: 50,
            render: (text, record) => (
                <span onClick={()=> {handleUserRole(record.roles);setRoleUserID(record.id)}} className="link" size="middle">
                    {
                        getRoles(record.roles)
                    }
                </span>
            ),
        },
        {
            title: 'លេខទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
            width: 80,
        },
        {
            title: 'អ៊ីម៉ែល',
            dataIndex: 'email',
            key: 'email',
            width: 100,
        },

        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 50,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    
                    <span className="link" onClick={() => handleAccountEdit(record)}><KeyOutlined /></span>
                    <span className="link" onClick={() => handleUserEdit(record)}><EditOutlined /></span>
                    <Popconfirm
                        title="តើអ្នកពិតចង់លុបមែនឬទេ?"
                        onConfirm={() => { handleDelete(record.id) }}
                        okText="ចង់"
                        cancelText="មិនចង់"
                    >
                        <span className="link" style={{ color: "red" }}><DeleteOutlined /></span>
                    </Popconfirm>

                </Space>
            ),
        }
    ]
    return array
}