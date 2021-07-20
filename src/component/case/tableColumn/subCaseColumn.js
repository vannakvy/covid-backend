import { Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const subCaseCol = ({handleDelete, handleEditSubCase}) => {
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
            dataIndex: 'personalInfos',
            key: 'personalInfos',
            width: 50,
            render: (text, record) => (
                <span size="middle">
                    {
                        record.lastName+" "+record.firstName
                    }
                </span>
            ),
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
            title: 'អាសយដ្ឋាន',
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
            dataIndex: 'personalInfos',
            key: 'personalInfos',
            width: 50,
            render: (text, record) => (
                <span size="middle">
                    {
                        // console.log(record.currentState.confirm)
                        record.currentState.confirm ? "វិជ្ជមាន" : "អវិជ្ជមាន"
                    }
                </span>
            ),
        },
        {
            title: 'លក្ខណៈពាក់ព័ន្ធ',
            dataIndex: 'direct',
            key: 'direct',
            width: 50,
            render: (text, record) => (
                <span size="middle">
                    {
                        // console.log(record.currentState.confirm)
                        record ? "ផ្ទាល់" : "ប្រយោល"
                    }
                </span>
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
                    {/* <span className="link" onClick={() => handleEditSubCase(record)}><EditOutlined /></span> */}
                    <Link className="link" to={"/subPeople/" + record.id}><EyeOutlined /></Link>
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