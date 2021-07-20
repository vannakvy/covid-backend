import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { Link } from 'react-router-dom'

export const caseCol = ({ handleDelete, limit, page }) => {
    let no = ((page - 1) * limit)
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            render: (text, record, i) => (
                <Space size="middle">
                    {no += 1}
                </Space>
            ),
        },
        {
            title: 'ឈ្មោះករណី',
            dataIndex: 'caseName',
            key: 'caseName',
            width: 150,
        },
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {/* {record.date} */}
                    {moment(record.date).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                </Space>
            ),
        },

        {
            title: 'ចំនួនអ្នកពាក់ព័ន្ធ',
            dataIndex: 'related',
            key: 'related',
            width: 100,
        },
        {
            title: 'អាសយដ្ឋាន',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    {(record.village !== "ក្រៅសៀមរាប") && record.village}
                    {record.commune !== "ក្រៅសៀមរាប" && record.commune}
                    {record.district !== "ក្រៅសៀមរាប" && record.district}
                    {record.province && record.province}
                </Space>
            ),
        },
        {
            title: 'ចំណាំ',
            dataIndex: 'other',
            key: 'other',
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
                    <Link className="link" to={"/subCase/" + record.id}><EditOutlined /></Link>
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