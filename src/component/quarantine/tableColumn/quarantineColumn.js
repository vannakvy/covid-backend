import React from 'react'
import { Space, Tooltip, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { getFullNamePersonInCharge, getRoles } from '../../../function/fn';
import moment from 'moment';

export const quarantineCol = ({handleDelete,limit,page}) => {

    let no = ((page-1) * limit)

    let d = new Date().setHours(0,0,0,0)
    let m = moment(d).format("DD-MM-yyyy hh:mm:ss")

   
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
            title: 'ឈ្មោះមណ្ឌល',
            dataIndex: 'locationName',
            key: 'locationName',
            width: 100,
        },
       
        {
            title: 'អាសយដ្ឋាន  ',
            dataIndex: 'address',
            key: 'address',
            width: 100,
            render: (text, record) => (
                // <Tooltip placement="top" title={record.village + "," + record.commune + "," + record.district + "," + record.province}>
                    <Space size="middle">
                        {(record.village !== "ក្រៅសៀមរាប") && record.village}
                        {record.commune !== "ក្រៅសៀមរាប" && record.commune}
                        {record.district !== "ក្រៅសៀមរាប" && record.district}
                        {record.province && record.province}
                        
                    </Space>
                // </Tooltip>
            ),
            
        },
        {
            title: 'អ្នកទទួលខុសត្រូវ',
            dataIndex: 'personInCharge',
            key: 'personInCharge',
            width: 100,
            render: (text, record) => (
                <span size="middle">
                    {
                        // getFullNamePersonInCharge(record.personInCharge)
                        record.personInCharge.lastName+" "+record.personInCharge.firstName
                        // console.log(record.personInCharge)
                    }
                </span>
            ),
            
        },
        {
            title: 'លេខទូរស័ព្ទ',
            dataIndex: 'personInCharge',
            key: 'personInCharge',
            width: 100,
            render: (text, record) => (
                <span size="middle">
                    {
                        // getFullNamePersonInCharge(record.personInCharge)
                        record.personInCharge.tel
                        // console.log(record.personInCharge)
                    }
                </span>
            ),
        },
        {
            title: 'ចំណាំ',
            dataIndex: 'other',
            key: 'other',
            width: 100,
        },
    
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 50,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Link className="link" to={"/subQuarantine/"+record.id}><EditOutlined /></Link>
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