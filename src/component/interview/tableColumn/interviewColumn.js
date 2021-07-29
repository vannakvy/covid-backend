import { Space } from 'antd'
import {
    EyeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const interviewCol = ({ handleDelete, limit, page, handleEdit }) => {
    let no = ((page - 1) * limit)
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            render: (text, record, i) => (
                <Space size="middle">
                    {no += 1}
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
            title: 'លេខកូដអ្នកជំងឺ',
            dataIndex: 'patientId',
            key: 'patientId',
            width: 150,
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'personalInfos',
            key: 'personalInfos',
            width: 200,
            render: (text, record) => (
                <span size="middle">
                    {
                        record.lastName + " " + record.firstName
                    }
                </span>
            ),
        },
        {
            title: 'ភេទ',
            dataIndex: 'gender',
            key: 'gender',
            width: 60,
        },
        {
            title: 'អាយុ',
            dataIndex: 'age',
            key: 'age',
            width: 60,
        },
        {
            title: 'សញ្ជាតិ',
            dataIndex: 'nationality',
            key: 'nationality',
            width: 70,
        },
        {
            title: 'អាស័យដ្ឋាន',
            dataIndex: 'address',
            key: 'address',
            width: 250,
            render: (text, record) => (
                <span>
                    {(record.village !== "ក្រៅសៀមរាប") && record.village + ", "}
                    {record.commune !== "ក្រៅសៀមរាប" && record.commune + ", "}
                    {record.district !== "ក្រៅសៀមរាប" && record.district + ", "}
                    {record.province && record.province}
                </span>
            ),
        },
        {
            title: 'ទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
            width: 150,
        },
        {
            title: 'ចំណាំ',
            dataIndex: 'other',
            key: 'other',
            width: 150,
        },
        {
            title: 'សម្ភាស',
            dataIndex: 'interviewed',
            key: 'interviewed',
            width: 150,
            render: (text, record) => (
                <span>
                    {record.interviewed ? "រួចរាល់" : "មិនទាន់រួចរាល់"}
                </span>
            )
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Link className="link" to={"/subPeople/" + record.id}><EyeOutlined /></Link>
                </Space>
            ),
        }
    ]
    return array
}