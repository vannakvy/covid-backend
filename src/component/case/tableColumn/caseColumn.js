import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { Link } from 'react-router-dom'

export const caseCol = ({handleDelete}) => {
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
            title: 'ឈ្មោះករណី',
            dataIndex: 'caseTitle',
            key: 'caseTitle',
            width: 150,
        },
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record.date).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                </Space>
            ),
        },
        {
            title: 'ទីតាំង',
            dataIndex: 'place',
            key: 'place',
            width: 100,
        },
        {
            title: 'ចំនួនអ្នកពាក់ព័ន្ធ',
            dataIndex: 'related',
            key: 'related',
            width: 100,
        },
        {
            title: 'អាស័យដ្ឋាន',
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
            title: 'ចំណាំ',
            dataIndex: 'tel',
            key: 'tel',
            width: 150,
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 50,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"/subCase/" + record.id}><EditOutlined /></Link>
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