import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { Link } from 'react-router-dom'

export const locationCol = ({ handleDelete, handleEdit, limit, page }) => {
    let no = ((page - 1) * limit)
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            render: (text, record, i) => (
                <Space size="middle">
                {console.log(page)}
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
            title: 'កាលបរិច្ឆេទបិទ',
            dataIndex: 'closeAt',
            key: 'closeAt',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {record.closeAt === null? "មិនទាន់មានសកម្មភាព" : moment(record.closeAt).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                </Space>
            ),
        },
        {
            title: 'កាលបរិច្ឆេទបើក',
            dataIndex: 'openAt',
            key: 'openAt',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {record.openAt === null? "មិនទាន់មានសកម្មភាព" : moment(record.openAt).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
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
                    {/* <Link className="link" to={"/subSpecifylocation/" + record.id}><EditOutlined /></Link> */}
                    <span className="link" onClick={() => handleEdit(record)}><EditOutlined /></span>
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