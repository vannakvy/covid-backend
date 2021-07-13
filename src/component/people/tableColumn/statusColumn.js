import { Space, Popconfirm } from 'antd'
import {
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const statusCol = ({handleDelete}) => {
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            render: (text, record, i) => (
                <Space size="middle">
                    {i += 1}
                </Space>
            ),
        },
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
            width: 80,
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 50,
        },
        {
            title: 'ផ្សេងៗ',
            dataIndex: 'remark',
            key: 'remark',
            width: 100,
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