import React, {useContext, useState,useEffect} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { userCol } from '../component/user/tableColumn/userColumn'
import { UserController } from '../context/userContext'
import AddUser from '../component/user/modal/addUser';
import EditUser from '../component/user/modal/editUser';

export default function User() {

    const {userData, userDataDispatch} = useContext(UserController)

    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [userID,setUserID] = useState(-1);
    const [userEdit, setUserEdit] = useState({});

    useEffect(() => {
        handleUserEdit(userID)
    }, [userID])

    const handleUserEdit =(id)=>{
        let index = userData.findIndex(e => e.id === id)
        setUserEdit(userData[index])
    }

    const handleDelete = (e) => {
        userDataDispatch({type: "DELETE_CASE", payload: e})
    }

    return (
        <Row>
            <AddUser open={openAdd} setOpen={setOpenAdd} />
            <EditUser open={openEdit} setOpen={setOpenEdit} user={userEdit} />
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
                    columns={userCol({handleDelete,openEdit,setOpenEdit,setUserID})}
                    dataSource={userData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
