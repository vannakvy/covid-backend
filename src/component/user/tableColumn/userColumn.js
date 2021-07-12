import React,{useState} from 'react'
import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { Link } from 'react-router-dom'
import {EditUser} from '../modal/editUser'
// import {EditUser}

export const userCol = ({handleDelete,openEdit, setOpenEdit,setUserID}) => {
    // const [openEdit, setOpenEdit] = useState(false)
    const handleEditClick =(id)=>{
        setOpenEdit(true)
        setUserID(id)
    }
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 50,
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
            width: 150,
        },
        {
            title: 'តួនាទី',
            dataIndex: 'role',
            key: 'role',
            width: 100,
            
        },
        {
            title: 'លេខទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
            width: 100,
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
                    <a onClick={()=>handleEditClick(record.id)}><EditOutlined /></a>
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