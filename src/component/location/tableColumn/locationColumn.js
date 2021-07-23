import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { Link } from 'react-router-dom'

export const locationCol = ({ handleDelete, limit, page }) => {
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
            title: 'ទីតាំង',
            dataIndex: 'affectedLocationName',
            key: 'affectedLocationName',
            width: 150,
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
            title: 'ករណី',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    {record?.case?.caseName}
                </Space>
            ),
        },
        {
            title: 'កាលបរិច្ឆេទបើក',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {/* {record.date} */}
                    {record.open ===null ? "មិនទាន់មានសកម្មភាព" : moment(record.openAt).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                    {console.log(record)}
                </Space>
            ),
        },
        {
            title: 'សកម្មភាព',
            dataIndex: 'open',
            key: 'open',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {record.open ===null ? "មិនទាន់មានសកម្មភាព" :record.open ? "បើក":"បិទ"}
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