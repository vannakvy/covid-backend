import { Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export const subQuarantineCol = ({handleDelete, handleEditSubQuarantine}) => {
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
            width: 50,
        },
        {
            title: 'ភេទ',
            dataIndex: 'gender',
            key: 'gender',
            width: 20,
            // render: (text, record) => (
            //     <Space size="middle">
            //         {moment(record.date).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
            //     </Space>
            // ),
        },

        {
            title: 'អាស័យដ្ឋាន',
            dataIndex: 'address',
            key: 'address',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {record.village + "," + record.commune + "," + record.district + "," + record.province}
                </Space>
            ),
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 50,
        },
        {
            title: 'លក្ខណៈពាក់ព័ន្ធ',
            dataIndex: 'relatedInfo',
            key: 'relatedInfo',
            width: 50,
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 20,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <span className="link" onClick={() => handleEditSubQuarantine(record)}><EditOutlined /></span>
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