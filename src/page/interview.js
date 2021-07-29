import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Button, Input, Table, message, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { PeopleController } from '../context/peopleContext';
import { interviewCol } from '../component/interview/tableColumn/interviewColumn';
import AddInterview from '../component/interview/modal/addInterview';
import EditInterview from '../component/interview/modal/editInterview';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_PERSONALINFO_BY_ID, GET_INTERVIEW } from '../graphql/people';
import { DELETE_HOSPITALINFO_BY_ID } from '../graphql/hospital';
import { ListSelect } from '../static/own-comp'

const {Option} = Select

export default function Interview() {

    const [interviewType, setInterviewType] = useState(false)

    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [editData, setEditData] = useState({})

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [interviewedData, setInterviewedData] = useState([])

    const { data, loading, error } = useQuery(GET_INTERVIEW, {
        variables: {
            interview: interviewType,
            page: page,
            limit: limit,
            keyword: keyword,
        },
        onCompleted: ({ getConfirmedPersonalInfoByInterviewWithPagination }) => {
            console.log(getConfirmedPersonalInfoByInterviewWithPagination)
            setInterviewedData(getConfirmedPersonalInfoByInterviewWithPagination)
        }
    })
    // const getPersonalInfoWithPagination 
    useEffect(() => {
        if (data) {
            setInterviewedData(data?.getConfirmedPersonalInfoByInterviewWithPagination)
        }
    }, [data])

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
            {/* <AddInterview open={openAdd} setOpen={setOpenAdd} />
            <EditInterview open={openEdit} setOpen={setOpenEdit} editData={editData}/> */}
            <Col
                xs={12}
                md={13}
            >
                {/* <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលប្រជាជន
                    <PlusOutlined />
                </Button> */}
            </Col>
            <Col
                xs={12}
                md={4}
            >
                <Select defaultValue={interviewType} style={{ width: "100%" }} onChange={(e) => setInterviewType(e) }>
                    <Option value={true}>អ្នកសម្ភាសរួចរាល់</Option>
                    <Option value={false}>អ្នកមិនទាន់សម្ភាស</Option>
                </Select>
            </Col>
            <Col
                xs={24}
                md={{ span: 6, offset: 1 }}
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
                    dataSource={interviewedData?.personalInfos}
                    rowKey={record => record.id}
                    pagination={{
                        total: interviewedData?.paginator?.totalDocs,
                        //pageSizeOptions:["10", "20"],
                        // showSizeChanger: true,
                        current: interviewedData?.paginator?.currentPage,
                        onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    }}
                    scroll={{ x: 1000 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
