import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { userCol } from '../component/user/tableColumn/userColumn'
import { UserController } from '../context/userContext'
import AddUser from '../component/user/modal/addUser';
import EditUser from '../component/user/modal/editUser';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_USERS } from '../graphql/auth'
import { DELETE_USER } from '../graphql/auth';
import AddRole from '../component/user/modal/addRole';
import EditAccount from '../component/user/modal/editAccount';

export default function User() {

    const [userData, setUserData] = useState([])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")
    
    const [dataRoles, setDataRoles] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [userEdit, setUserEdit] = useState({});
    const [openRole, setOpenRole] = useState(false)
    const [roleUserID, setRoleUserID] = useState("")
    const [openEditAccount, setOpenEditAccount] = useState(false)

    //query all user
    const { data, loading, error,refetch } = useQuery(GET_ALL_USERS, {
        variables: {
            page:page,
            limit: limit,
            keyword: keyword,
        }, onCompleted: ({ getUserWithPagination }) => {
            console.log(getUserWithPagination)
            setUserData(getUserWithPagination)
        }
    })

    //delete user on ID
    const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER, {
        onCompleted: ({ deleteUser }) => {
            refetch()
            message.success("លុបបានជោគជ័យ")
        }
    })

    useEffect(() => {
        refetch()
    }, [page,limit,keyword])

    const handleUserRole = (e) => {
        setOpenRole(true)
        setDataRoles(e)
    }

    const handleUserEdit = (e) => {
        setUserEdit(e)
        setOpenEdit(true)
    }

    const handleAccountEdit = (e) => {
        setUserEdit(e)
        setOpenEditAccount(true)
    }

    const handleDelete = (e) => {
        //userDataDispatch({ type: "DELETE_USER", payload: e })
        console.log(e)
        deleteUser({variables:{
            userId:e
        }})
    }

    return (
        <Row>
            <AddUser open={openAdd} setOpen={setOpenAdd} />
            <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />
            <AddRole open={openRole} setOpen={setOpenRole} userID={roleUserID} dataRoles={dataRoles} />
            <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} data={userEdit} />
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
                    onChange={(e)=> setKeyword(e.target.value)}
                    placeholder="ស្វែងរក..."
                />
            </Col>
            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Table
                    // caseCol({handleDelete})
                    columns={userCol({ handleDelete, handleUserEdit,handleAccountEdit, handleUserRole,setRoleUserID,limit, page })}
                    dataSource={userData.users}
                    rowKey={record => record.id}
                    pagination={{
                        total: userData?.paginator?.totalDocs,
                        //pageSizeOptions:["10", "20"],
                        // showSizeChanger: true,
                        current:userData?.paginator?.currentPage,
                        onChange:((page, pageSize) => {setPage(page);setLimit(pageSize)} )
                    }}
                    scroll={{ x: 400 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
