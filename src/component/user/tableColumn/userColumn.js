import React from 'react'
import { Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export const userCol = ({ handleDelete, handleUserEdit }) => {
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 20,
            render: (text, record, i) => (
                <Space size="middle">
                    {i += 1}
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
            title: 'តួនាទី',
            dataIndex: 'role',
            key: 'role',
            width: 50,

        },
        {
            title: 'លេខទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
            width: 80,
        },
        {
            title: 'ចំណាំ',
            dataIndex: 'note',
            key: 'note',
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