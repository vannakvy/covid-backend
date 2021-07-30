import { Col, Row, Typography, Table, message,List,Avatar } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HospitalController } from '../../context/hospitalContext'
import moment from 'moment'
import { subHospitalCol } from './tableColumn/subHospitalColumn'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditHospital from './modal/editHospital'
import AddSubHospital from './modal/addSubHospital'
import EditSubHospital from './modal/editSubHospital'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_PERSONINFO_NO_LIMIT } from '../../graphql/people'
import { GET_PERSON_BY_HOSPITALINFO } from '../../graphql/hospital'
import { GET_HOSPITALINFO_BY_ID } from '../../graphql/hospital'
import { DELETE_PERSON_BY_HOSPITAL } from '../../graphql/hospital'

const { Title } = Typography
export default function SubHospital() {

    //const { hospitalData, subHospitalData, subHospitalDataDispatch } = useContext(HospitalController)

    let { id } = useParams();

    const [headerData, setHeaderData] = useState()
    const [updateSubData, setUpdateSubData] = useState({})
    const [peopleData, setPeopleData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [openAddSub, setOpenAddSub] = useState(false)
    const [openEditSub, setOpenEditSub] = useState(false)
    const [subHospitalData, setSubHospitalData] = useState([])
    const [hospitalData, setHospitalData] = useState({})

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const { data: hospital } = useQuery(GET_HOSPITALINFO_BY_ID, {
        variables: {
            id: id
        },
        onCompleted: ({ getHospitalInfoById }) => {
            // console.log(getHospitalInfoById)
            setHospitalData(getHospitalInfoById)
        }
    })

    const { data } = useQuery(GET_ALL_PERSONINFO_NO_LIMIT, {
        onCompleted: ({ allPersonalInfos }) => {
            // console.log(allPersonalInfos)
            setPeopleData(allPersonalInfos)
        }
    })

    

    const { data: hospitalSub } = useQuery(GET_PERSON_BY_HOSPITALINFO, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            hospitalId: id
        },
        onCompleted: ({ getQuarantineByHospitalIdIdWithPagination }) => {
            console.log(getQuarantineByHospitalIdIdWithPagination)
            setSubHospitalData(getQuarantineByHospitalIdIdWithPagination)
        }
    })

    const [deleteHospitalization, { loading }] = useMutation(DELETE_PERSON_BY_HOSPITAL, {
        onCompleted: () => {
            message.success("លុបទិន្នន័យជោគជ័យ")
        }
    })



    useEffect(() => {
        //setHeaderData(hospitalData[hospitalData.findIndex(e => e.id === id)])
    }, [])

    // console.log(headerData)
    const handleDelete = (e) => {
        //subHospitalDataDispatch({type: "DELETE_SUB_HOSPITAL", payload: e})
        deleteHospitalization({
            variables: {
                id: e
            }
        })
    }

    const handleEditSubHospital = (e) => {
        setUpdateSubData(e)
        setOpenEditSub(true)
    }
    return (
        <Row>
            <EditHospital open={openEdit} setOpen={setOpenEdit} data={hospitalData} hospitalId={id} />
            <AddSubHospital open={openAddSub} setOpen={setOpenAddSub} hospitalId={id} peopleData={peopleData} />
            <EditSubHospital open={openEditSub} setOpen={setOpenEditSub} data={updateSubData} hospitalId={id} peopleData={peopleData} />
            <Col
                xs={24}
            >
                {/* <Title level={5}>ឈ្មោះករណី៖ 
                    <EditOutlined className="link" onClick={() => setOpenEdit(true)}/>
                </Title> */}
            </Col>
            <Col
                xs={24}
                md={11}
                className="subCase-card"
            >
                {/* <p>ឈ្មោះមណ្ឌល៖ {hospitalData?.hospitalName} <EditOutlined className="link" onClick={() => setOpenEdit(true)} /></p>
                <p>អាសយដ្ឋាន៖ {" "}
                    {hospitalData?.village !== "ក្រៅសៀមរាប" && hospitalData?.village + ","}
                    {hospitalData?.commune !== "ក្រៅសៀមរាប" && hospitalData?.commune + ","}
                    {hospitalData?.district !== "ក្រៅសៀមរាប" && hospitalData?.district + ","}
                    {hospitalData?.province}
                </p>
                <p>អ្នកទទួលខុសត្រូវ៖ {hospitalData?.personInCharge?.lastName} {hospitalData?.personInCharge?.firstName}</p>
                <p>លេខទូរស័ព្ទ៖ {hospitalData?.personInCharge?.tel}</p>
                <p>ចំណាំ៖ {hospitalData?.other}</p> */}

                <table>
                    <tr >
                        <td style={{width:'40%'}}><p>ឈ្មោះមណ្ឌល</p></td>
                        <td style={{width:'60%'}}><p>៖ {hospitalData?.hospitalName} <EditOutlined className="link" onClick={() => setOpenEdit(true)} /></p></td>
                    </tr>
                    <tr>
                        <td><p>អាសយដ្ឋាន</p></td>
                        <td><p>៖ {hospitalData?.village !== "ក្រៅសៀមរាប" && hospitalData?.village + ","}
                            {hospitalData?.commune !== "ក្រៅសៀមរាប" && hospitalData?.commune + ","}
                            {hospitalData?.district !== "ក្រៅសៀមរាប" && hospitalData?.district + ","}
                            {hospitalData?.province}</p></td>
                    </tr>
                    <tr>
                        <td><p>អ្នកទទួលខុសត្រូវ</p></td>
                        <td><p>៖ {hospitalData?.personInCharge?.lastName}</p></td>
                    </tr>
                    <tr>
                        <td><p>លេខទូរស័ព្ទ</p></td>
                        <td><p>៖ {hospitalData?.personInCharge?.tel}</p></td>
                    </tr>
                    <tr>
                        <td><p>ចំណាំ</p></td>
                        <td><p>៖ {hospitalData?.other}</p></td>
                    </tr>
                
                    <tr>
                        
                    </tr>
                </table>
            </Col>

            {/* <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <p>មណ្ឌលព្យាបាល៖ </p>

                <p>ឈ្មោះមណ្ឌល៖​ </p>
                <p>ទីតាំង៖ </p>
                <p>កាលបរិច្ឆេទ​ចូល៖ </p>
                <p>កាលបរិច្ឆេទចេញ៖ </p>
            </Col> */}


            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Title level={5}>
                    អ្នកជំងឺ៖ {" "}

                    <PlusCircleOutlined className="link" onClick={() => setOpenAddSub(true)} />
                </Title>

            </Col>
            <Col
                xs={24}
                md={24}
            >
                <Table
                    columns={subHospitalCol({ handleDelete, handleEditSubHospital, limit, page })}
                    dataSource={subHospitalData?.hospitalizations}
                    rowKey={record => record.id}
                    pagination={{
                        total: subHospitalData?.paginator?.totalDocs,
                        // showSizeChanger: true,
                        onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    }}
                    scroll={{ x: 240 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
