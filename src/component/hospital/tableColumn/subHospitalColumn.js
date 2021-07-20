import { Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined

} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const subHospitalCol = ({handleDelete, handleEditSubHospital}) => {
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
            title: 'ឈ្មោះ',
            dataIndex: 'name',
            key: 'name',
            width: 40,
            render: (text, record) => (
                <Space size="middle">
                    {record?.personalInfo?.lastName} {record?.personalInfo?.firstName}
                </Space>
            ),
        },

        {
            title: 'កាលបរិច្ឆេទចូល',
            dataIndex: 'date_in',
            key: 'date_in',
            width: 30,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.date_in).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                </Space>
            ),
        },

        {
            title: 'កាលបរិច្ឆេទចេញ',
            dataIndex: 'date_out',
            key: 'date_out',
            width: 30,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.date_out).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                </Space>
            ),
        },
      
        {
            title: 'អាសយដ្ឋាន',
            dataIndex: 'address',
            key: 'address',
            width: 70,
            render: (text, record) => (
                <Space size="middle">
                    {record?.personalInfo?.village + "," + record?.personalInfo?.commune + "," + record?.personalInfo?.district + "," + record?.personalInfo?.province}
                </Space>
            ),
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 30,
            render: (text, record) => (
                <Space size="middle">
                    {record?.personalInfo?.currentState?.confirm ? "វិជ្ជមាន" : "អវិជ្ជមាន"}
                </Space>
            ),
        },
        {
            title: 'លក្ខណៈពាក់ព័ន្ធ',
            dataIndex: 'relatedInfo',
            key: 'relatedInfo',
            width: 30,
            render: (text, record) => (
                <Space size="middle">
                    {record?.personalInfo?.direct ? "ផ្ទាល់":"ប្រយោល"}
                </Space>
            ),
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 30,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Link className="link" to={"/subPeople/" + record?.personalInfo?.id}><EyeOutlined /></Link>
                    <span className="link" onClick={() => handleEditSubHospital(record)}><EditOutlined /></span>
                    <Popconfirm
                        title="តើអ្នកពិតចង់លុបមែនឬទេ?"
                        onConfirm={() => {handleDelete(record.id) }}
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