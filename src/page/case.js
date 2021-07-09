import React, {useContext, useState} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { caseCol } from '../component/case/tableColumn/caseColumn'
import { CaseController } from '../context/caseContext'
import AddCase from '../component/case/modal/addCase';

export default function Case() {
    const {caseData, caseDataDispatch} = useContext(CaseController)

    const [openAdd, setOpenAdd] = useState(false)

    const handleDelete = (e) => {
        caseDataDispatch({type: "DELETE_CASE", payload: e})
    }

    return (
        <Row>
            <AddCase open={openAdd} setOpen={setOpenAdd} />
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលករណី
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
                    columns={caseCol({handleDelete})}
                    dataSource={caseData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
