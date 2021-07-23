import React, { useContext, useState } from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { PeopleController } from '../context/peopleContext';
import { interviewCol } from '../component/interview/tableColumn/interviewColumn';
import AddInterview from '../component/interview/modal/addInterview';
import EditInterview from '../component/interview/modal/editInterview';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PERSONALINFO_BY_ID, GET_ALL_PERSONINFO } from '../graphql/people';
import { DELETE_HOSPITALINFO_BY_ID } from '../graphql/hospital';
import {ListSelect} from '../static/own-comp'

export default function Interview() {

    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [editData, setEditData] = useState({})

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [intervieweData, setIntervieweData] = useState({
        interviewInfos: [
            {
                id: "0",
                idCard: "123123123",
                lastName: "lkasdl",
                firstName: "lkasdsssl",
                gender: "ប្រុស",
                age: 24,
                nationality: "ខ្មែរ",
                province: "សៀមរាប",
                district: "សៀមរាប",
                commune: "ស្វាយដង្គំ",
                village: "សាលាកន្សែង",
                occupation: "ថតរូប",
                tel: "85277116",
                other: "test",
                confirm: "បឋម"
            }
        ]
    })

    // const {data,loading,error} = useQuery(GET_ALL_PERSONINFO,{
    //     variables:{
    //         page:page,
    //         limit:limit,
    //         keyword:keyword,
    //     },
    //     onCompleted:({getPersonalInfoWithPagination})=>{
    //         //console.log(getPersonalInfoWithPagination)
    //         setPeopleData(getPersonalInfoWithPagination)
    //     }
    // })

    const [deletePersonalInfo, { loading: deleteLoading }] = useMutation(DELETE_PERSONALINFO_BY_ID, {
        onCompleted: () => {
            message.success("លុបទិន្នន័យជោគជ័យ")
        }
    })

    const handleDelete = (e) => {
        deletePersonalInfo({
            variables: {
                id: e
            }
        })
    }

    const handleEdit = (e) => {
        setEditData(e)
        setOpenEdit(true)
    }

    return (
        <Row>
            <AddInterview open={openAdd} setOpen={setOpenAdd} />
            <EditInterview open={openEdit} setOpen={setOpenEdit} editData={editData}/>
            <Col
                xs={12}
                md={13}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលប្រជាជន
                    <PlusOutlined />
                </Button>
            </Col>
            <Col
                xs={12}
                md={4}
            >
                <ListSelect type={0} data={[]} />
            </Col>
            <Col
                xs={24}
                md={{span:6, offset: 1}}
            >
                <Input.Search
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="ស្វែងរក..."
                />
            </Col>
            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Table
                    className="table-go-list"
                    columns={interviewCol({ handleDelete, limit, page, handleEdit })}
                    dataSource={intervieweData?.interviewInfos}
                    rowKey={record => record.id}
                    // pagination={{
                    //     total: intervieweData?.paginator?.totalDocs,
                    //     //pageSizeOptions:["10", "20"],
                    //     // showSizeChanger: true,
                    //     current: intervieweData?.paginator?.currentPage,
                    //     onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    // }}
                    scroll={{ x: 1000 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
