import React from 'react'
import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'


export const hospitalCol = ({handleDelete}) => {
   
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
            title: 'ឈ្មោះមណ្ឌល',
            dataIndex: 'hospitalName',
            key: 'hospital',
            width: 150,
        },
        {
            title: 'ទីតាំង ',
            dataIndex: 'place',
            key: 'place',
            width: 100,
            
        },
        {
            title: 'អាសយដ្ឋាន  ',
            dataIndex: 'address',
            key: 'address',
            width: 100,
            render: (text, record) => (
                <Tooltip placement="top" title={record.village + "," + record.commune + "," + record.district + "," + record.province}>
                    <Space size="middle">
                        {record.village}
                    </Space>
                </Tooltip>
            ),
            
        },
        {
            title: 'អ្នកទទួលខុសត្រូវ',
            dataIndex: 'inCharge',
            key: 'inCharge',
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
                    <Link to={"/subHospital/"+record.id}><EditOutlined /></Link>
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