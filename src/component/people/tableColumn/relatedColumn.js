import { Space, Popconfirm } from 'antd'
import {
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const relatedCol = ({handleDelete}) => {
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
            title: 'ឈ្មោះ',
            dataIndex: 'date',
            key: 'date',
            width: 80,
        },
        {
            title: 'ភេទ',
            dataIndex: 'status',
            key: 'status',
            width: 80,
        },
        {
            title: 'អាស័យដ្ឆាន',
            dataIndex: 'status',
            key: 'status',
            width: 200,
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 80,
        },
        {
            title: 'លក្ខណៈពាក់ព័ន្ធ',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 30,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
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