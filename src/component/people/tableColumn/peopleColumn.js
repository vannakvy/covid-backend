import { Space, Popconfirm } from 'antd'
import {
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const peopleCol = ({handleDelete}) => {
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            render: (text, record, i) => (
                <Space size="middle">
                    {i += 1}
                </Space>
            ),
        },
        {
            title: 'អត្តសញ្ញាណប័ណ្ណ',
            dataIndex: 'idCard',
            key: 'idCard',
            width: 150,
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'ភេទ',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
        },
        {
            title: 'អាយុ',
            dataIndex: 'age',
            key: 'age',
            width: 100,
        },
        {
            title: 'សញ្ជាតិ',
            dataIndex: 'nationality',
            key: 'nationality',
            width: 100,
        },
        {
            title: 'អាស័យដ្ឋាន',
            dataIndex: 'address',
            key: 'address',
            width: 250,
            render: (text, record) => (
                <Space size="middle">
                    {record.village + "," + record.commune + "," + record.district + "," + record.province}
                </Space>
            ),
        },
        {
            title: 'មុខរបរ',
            dataIndex: 'job',
            key: 'job',
            width: 150,
        },
        {
            title: 'ទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
            width: 150,
        },
        {
            title: 'ចំណាំ',
            dataIndex: 'remark',
            key: 'remark',
            width: 150,
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"/subPeople/" + record.id}><EyeOutlined /></Link>
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