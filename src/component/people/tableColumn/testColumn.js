import { Space, Popconfirm } from 'antd'
import {
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const testCol = ({handleSampleTestDelete}) => {
    var array = [
        {
            title: 'ល.រ',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            render: (text, record, i) => (
                <Space size="middle">
                    {i += 1}
                </Space>
            ),
        },
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
            width: 80,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record.date).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}
                </Space>
            ),
        },
        {
            title: 'លើកទី',
            dataIndex: 'times',
            key: 'times',
            width: 40,
        },
        {
            title: 'ទីតាំង',
            dataIndex: 'location',
            key: 'location',
            width: 50,
        },
        {
            title: 'លទ្ធផល',
            dataIndex: 'sampleTest',
            key: 'sampleTest',
            width: 60,
            render:(text,record)=>(
                <Space size="middle">
                    { record?.result ? "វិជ្ជមាន":"អវិជ្ជមាន" }
                    {/* {console.log(record?.result )} */}
                </Space>
            )
        },
        {
            title: 'អាការ',
            dataIndex: 'symptom',
            key: 'symptom',
            width: 50,
        },
        {
            title: 'ផ្សេងៗ',
            dataIndex: 'other',
            key: 'other',
            width: 100,
        },
        {
            key: 'action',
            dataIndex: 'action',
            fixed: 'right',
            width: 30,
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="តើអ្នកពិតចង់លុបមែនឬទេ?"
                        onConfirm={() => { handleSampleTestDelete(record.id) }}
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