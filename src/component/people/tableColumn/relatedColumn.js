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
            width: 20,
            render: (text, record, i) => (
                <span size="middle">
                    {i += 1}
                </span>
            ),
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'name',
            key: 'name',
            width: 80,
            render: (text, record) => (
                <span size="middle">
                    {record?.lastName+" " +record?.firstName}
                </span>
            ),
        },
        {
            title: 'ភេទ',
            dataIndex: 'gender',
            key: 'gender',
            width: 30,
        },
        {
            title: 'អាស័យដ្ឆាន',
            dataIndex: 'address',
            key: 'address',
            width:100,
            render: (text, record) => (
            <span>
                    {(record.village !== "ក្រៅសៀមរាប") && record.village+", "}
                    {record.commune !== "ក្រៅសៀមរាប" && record.commune+", "}
                    {record.district !== "ក្រៅសៀមរាប" && record.district+", "}
                    {record.province && record.province}
                </span>
            )
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 50,
            render: (text, record) => (
                <Space size="middle">
                    {record?.currentState.confirm ? "វិជ្ជមាន" : "អវិជ្ជមាន"}
                </Space>
            ),
        },
        {
            title: 'លក្ខណៈពាក់ព័ន្ធ',
            dataIndex: 'direct',
            key: 'direct',
            width:50,
            render: (text, record) => (
                <Space size="middle">
                    {record?.direct? "វិជ្ជមាន" : "អវិជ្ជមាន"}
                </Space>
            ),
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 20,
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