import { Space } from "antd"
import { Popconfirm } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

export const roleColumn = [
    {
        title: 'តួនាទី',
        dataIndex: 'role',
        key: 'role',
        width: 20,
    },
    {
        dataIndex: 'action',
        key: 'action',
        width: 20,
        render:() => (
            <Space size="middle"
            >
                <Popconfirm
                        title="តើអ្នកពិតចង់លុបមែនឬទេ?"
                        // onConfirm={() => { handleDelete(record.id) }}
                        okText="ចង់"
                        cancelText="មិនចង់"
                    >
                        <span className="link" style={{ color: "red" }}><DeleteOutlined /></span>
                </Popconfirm>
            </Space>
        )
    }
]