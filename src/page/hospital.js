import React, {useContext, useState} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { hospitalCol } from '../component/hospital/tableColumn/hospitalColumn'
import { HospitalController } from '../context/hospitalContext'
import AddHospital from '../component/hospital/modal/addHospital';

export default function Hospital() {

    const {hospitalData, hospitalDataDispatch} = useContext(HospitalController)

    const [openAdd, setOpenAdd] = useState(false)

    const handleDelete = (e) => {
        hospitalDataDispatch({type: "DELETE_HOSPITAL", payload: e})
    }

    return (
        <Row>
            <AddHospital open={openAdd} setOpen={setOpenAdd}/>
            {/* <EditUser open={openEdit} setOpen={setOpenEdit} user={userEdit} /> */}
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលមន្ទីរពេទ្យ
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
                    columns={hospitalCol({handleDelete})}
                    dataSource={hospitalData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
