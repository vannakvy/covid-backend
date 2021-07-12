import React, {useContext, useState,useEffect} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { quarantineCol } from '../component/quarantine/tableColumn/quarantineColumn'
import { QuarantineController } from '../context/quarantineContext'
import AddQuarantine from '../component/quarantine/modal/addQuarantine';

export default function Quarantine() {

    const {quarantineData, quarantineDataDispatch} = useContext(QuarantineController)

    const [openAdd, setOpenAdd] = useState(false)

    const handleDelete = (e) => {
        quarantineDataDispatch({type: "DELETE_CASE", payload: e})
    }

    return (
        <Row>
            <AddQuarantine open={openAdd} setOpen={setOpenAdd} />
            {/* <EditUser open={openEdit} setOpen={setOpenEdit} user={userEdit} /> */}
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលមណ្ឌលចត្តាឡីស័ក
                    <PlusOutlined />
                </Button>
            </Col>
            <Col
                xs={16}
                md={6}
            >
                <Input.Search
                    placeholder="ស្វែងរក..."
                />
            </Col>
            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Table
                // caseCol({handleDelete})
                    columns={quarantineCol({handleDelete})}
                    dataSource={quarantineData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
