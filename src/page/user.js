import React, { useContext, useState } from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { userCol } from '../component/user/tableColumn/userColumn'
import { UserController } from '../context/userContext'
import AddUser from '../component/user/modal/addUser';
import EditUser from '../component/user/modal/editUser';

export default function User() {

    const { userData, userDataDispatch } = useContext(UserController)

    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [userEdit, setUserEdit] = useState({});

    const handleUserEdit = (e) => {
        setUserEdit(e)
        setOpenEdit(true)
    }

    const handleDelete = (e) => {
        userDataDispatch({ type: "DELETE_USER", payload: e })
        
        message.success("លុបបានជោគជ័យ")
    }

    return (
        <Row>
            <AddUser open={openAdd} setOpen={setOpenAdd} />
            <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលអ្នកប្រើប្រាស់
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
                    columns={userCol({ handleDelete, handleUserEdit })}
                    dataSource={userData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 400 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
