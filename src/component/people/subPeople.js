import { Col, Image, message, Row, Table, Typography, Timeline } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CameraOutlined, PlusCircleOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { PeopleController } from '../../context/peopleContext'
import { statusCol } from './tableColumn/statusColumn'
import { testCol } from './tableColumn/testColumn'
import { relatedCol } from './tableColumn/relatedColumn'
import AddPeopleRelated from './modal/addPeopleRelated'
import AddPeopleTest from './modal/addPeopleTest'
import AddPeopleHospital from './modal/addPeopleHospital'
import AddPeopleStatus from './modal/addPeopleStatus'
import AddPeopleQuarantine from './modal/addPeopleQuarantine'
import AddPeopleHistory from './modal/addPeopleHistory'
import AddPeopleLocation from './modal/addPeopleLocation'
import EditPeople from './modal/editPeople'
import UploadPic from './modal/uploadPic'
import { useMutation, useQuery } from '@apollo/client';
import { GET_PERSONALINFO_BY_ID } from '../../graphql/people';
import { GET_HOSPITAL_QUARANTINE_BY_PERSON } from '../../graphql/people';
import { GET_PERSON_BY_CASE } from '../../graphql/case';
import { GET_HISTORYLOCATION_BY_PERSON } from '../../graphql/historylocation';
import { DELETE_SAMPLETEST } from '../../graphql/people';
import { DELETE_PERSONALINFO_BY_ID } from '../../graphql/people';
import moment from 'moment';
import EditCurrentState from './modal/editCurrentState';

const { Title } = Typography

export default function SubPeople() {
    //const { peopleData } = useContext(PeopleController)
    const { id } = useParams()

    const [personalData, setPersonalData] = useState({})
    const [openAddPeopleRelated, setOpenAddPeopleRelated] = useState(false)
    const [openAddPeopleTest, setOpenAddPeopleTest] = useState(false)
    const [openAddPeopleHospital, setOpenAddPeopleHospital] = useState(false)
    const [openAddPeopleStatus, setOpenAddPeopleStatus] = useState(false)
    const [openAddPeopleQuarantine, setOpenAddPeopleQuarantine] = useState(false)
    const [openAddPeopleHistory, setOpenAddPeopleHistory] = useState(false)
    const [openAddPeopleLocation, setOpenAddPeopleLocation] = useState(false)
    const [openUploadPic, setOpenUploadPic] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [subCaseData, setSubCaseData] = useState([])
    const [subCasePagination, setSubCasePagination] = useState({})
    const [openEditCurrentState,setOpenEditCurrentState] = useState(false)

    const [quarantineData, setQuarantineData] = useState({})
    const [hospitalData, setHospitalData] = useState({})

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(100)
    const [keyword, setKeyword] = useState("")

    const { data, refetch: refetchPerson } = useQuery(GET_PERSONALINFO_BY_ID, {
        variables: {
            id: id
        },
        onCompleted: ({ getPersonalInfoById }) => {
            // console.log(getPersonalInfoById)
            // setPersonalData(getPersonalInfoById)
        }
    })

    const getPersonalInfoById = data?.getPersonalInfoById

    const { data: hospital_quarantine, refetch: refetchHospital } = useQuery(GET_HOSPITAL_QUARANTINE_BY_PERSON, {
        variables: {
            personalId: id
        },
        onCompleted: ({ getHospitalizationByPersonalInfo }) => {
            console.log(getHospitalizationByPersonalInfo)
            setQuarantineData(getHospitalizationByPersonalInfo?.quarantineInfo)
            setHospitalData(getHospitalizationByPersonalInfo?.hospitalInfo)
        },
        fetchPolicy: 'network-only'
    })

    const getHospitalizationByPersonalInfo = hospital_quarantine?.getHospitalizationByPersonalInfo

    const { data: caseData, refetch } = useQuery(GET_PERSON_BY_CASE, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            caseId: getPersonalInfoById?.case?.id
        },
        onCompleted: ({ getPersonalInfoByCaseWithPagination }) => {

            // console.log(getPersonalInfoByCaseWithPagination, "dataCase")


        },
        fetchPolicy: 'network-only'
    })

    const getPersonalInfoByCaseWithPagination = caseData?.getPersonalInfoByCaseWithPagination

    useEffect(() => {

        if (caseData) {
            let item = [...getPersonalInfoByCaseWithPagination?.personalInfos]
            let index = item.findIndex(e => e.id === id)
            item.splice(index, 1)
            setSubCaseData(item)
            setSubCasePagination(getPersonalInfoByCaseWithPagination?.paginator)
        }

    }, [caseData])


    const { data: historylocation, refetch: refetchHistoryLocation } = useQuery(GET_HISTORYLOCATION_BY_PERSON, {
        variables: {
            personalId: id
        },
        onCompleted: ({ getHistoryLocationByPersonalInfoId }) => {
            console.log(getHistoryLocationByPersonalInfoId)
            // setQuarantineData(getHospitalizationByPersonalInfo?.quarantineInfo)
            // setHospitalData(getHospitalizationByPersonalInfo?.hospitalInfo)
        },
        fetchPolicy: 'network-only'
    })

    const getHistoryLocationByPersonalInfoId = historylocation?.getHistoryLocationByPersonalInfoId

    const [deleteSampleTest, { loading: deleteLoading }] = useMutation(DELETE_SAMPLETEST, {
        onCompleted: () => {
            refetchPerson()
            message.success("លុបទិន្នន័យជោគជ័យ")
        }
    })

    const [deletePersonalInfo, { loading: deleteRelated }] = useMutation(DELETE_PERSONALINFO_BY_ID, {
        onCompleted: () => {
            refetch()
            message.success("លុបទិន្នន័យជោគជ័យ")
        }
    })

    const handleRelatedDelete = (e) => {

        deletePersonalInfo({
            variables: {
                id: e
            }
        })
    }

    const handleSampleTestDelete = (e) => {

        deleteSampleTest({
            variables: {
                sampleTestId: e,
                personalInfoId: id
            }
        })
    }

    return (
        <Row>
            <AddPeopleRelated open={openAddPeopleRelated} setOpen={setOpenAddPeopleRelated} caseId={getPersonalInfoById?.case?.id} setRefetch={refetch} />
            <AddPeopleTest open={openAddPeopleTest} setOpen={setOpenAddPeopleTest} peopleID={id} />
            <AddPeopleHospital open={openAddPeopleHospital} setOpen={setOpenAddPeopleHospital} peopleId={id} />
            <AddPeopleStatus open={openAddPeopleStatus} setOpen={setOpenAddPeopleStatus} />
            <AddPeopleQuarantine open={openAddPeopleQuarantine} setOpen={setOpenAddPeopleQuarantine} peopleId={id} />
            <AddPeopleHistory open={openAddPeopleHistory} setOpen={setOpenAddPeopleHistory} />
            <AddPeopleLocation open={openAddPeopleLocation} setOpen={setOpenAddPeopleLocation} setRefetch={refetchHistoryLocation} caseId={getPersonalInfoById?.case?.id} peopleId={id} />
            <UploadPic open={openUploadPic} setOpen={setOpenUploadPic} />
            <EditPeople open={openEdit} setOpen={setOpenEdit} personId={id} setRefetch={refetchPerson} personalData={getPersonalInfoById} />
            <EditCurrentState open={openEditCurrentState} setOpen={setOpenEditCurrentState} peopleId={id} setRefetch={refetchPerson} currentStateData={getPersonalInfoById?.currentState} />
            <Col
                xs={24} md={24}
                className="subPeople-card"
            >
                <Row
                    style={{
                        border: "1px solid #d9d9d9",
                        padding: "20px 20px 20px 20px",

                    }}
                >
                    <Col
                        xs={24} md={4}
                        style={{
                            position: "relative",
                            // padding: 20,
                        }}

                    >
                        <Image
                            width={"100%"}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <span className="btnCamera" onClick={() => setOpenUploadPic(true)}>
                            <CameraOutlined style={{ color: '#FFFF' }} />
                        </span>
                    </Col>
                    <Col
                        xs={24} md={10}
                    >

                        <table style={{ marginLeft: 30 }} className="tbl-subPeople">
                            <tr>
                                <td width="150"><Title level={5}>ឈ្មោះ</Title></td>
                                <td><Title level={5}>៖&emsp;</Title></td>
                                <td><Title level={5}>{getPersonalInfoById?.lastName} {getPersonalInfoById?.firstName} <EditOutlined className="link" onClick={() => setOpenEdit(true)} /></Title></td>
                            </tr>

                            <tr>
                                <td>ឈ្មោះជាភាសាឡាតាំង</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.englishName}</td>
                            </tr>

                            <tr>
                                <td>អត្តលេខអ្នកជំងឺ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.patientId}</td>
                            </tr>

                            <tr>
                                <td>ភេទ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.gender}</td>
                            </tr>

                            <tr>
                                <td>សញ្ជាតិ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.nationality}</td>
                            </tr>

                            <tr>
                                <td>លេខអត្តសញ្ញាណប័ណ្ឌ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.idCard}</td>
                            </tr>

                            <tr>
                                <td>លេខទូរស័ព្ទ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.tel}</td>
                            </tr>

                            <tr>
                                <td>មុខរបរ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.occupation}</td>
                            </tr>

                            <tr>
                                <td>អាស័យដ្ឋាន</td>
                                <td> ៖&emsp;</td>
                                <td> {getPersonalInfoById?.village !== "ក្រៅសៀមរាប" && "ភូមិ" + getPersonalInfoById?.village + ","}
                                    {getPersonalInfoById?.commune !== "ក្រៅសៀមរាប" && "ឃុំ" + getPersonalInfoById?.commune + ","}
                                    {getPersonalInfoById?.district !== "ក្រៅសៀមរាប" && "ស្រុក" + getPersonalInfoById?.district + ","}
                                    {"ខេត្ត" + getPersonalInfoById?.province}</td>
                            </tr>

                            <tr>
                                <td>ចំនួនចាក់វ៉ាក់សាំង</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.vaccinated} លើក</td>
                            </tr>

                            <tr>
                                <td>ការសម្ភាស</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.interviewed ? "រួចរាល់" : "មិនទាន់រូចរាល់"}</td>
                            </tr>

                            <tr>
                                <td>ត្រូវជា</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.relation}</td>
                            </tr>

                            <tr>
                                <td>ជំងឺប្រចាំកាយ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.illness}</td>
                            </tr>

                            <tr>
                                <td>ស្ថានភាពបច្ចុប្បន្ន</td>
                                <td> ៖&emsp;</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>ចំណាំ</td>
                                <td> ៖&emsp;</td>
                                <td>{getPersonalInfoById?.other}</td>
                            </tr>
                        </table>
                    </Col>
                    <Col
                        xs={24} md={{ span: 6 }}

                    >
                        <Row>
                            <Col xs={24}
                                style={{ paddingBottom: 20 }}
                            >

                                <table style={{ marginLeft: 30 }} className="tbl-subPeople">
                                    <tr>
                                        <td width="150"><Title level={5}>
                                            ការធ្វើចត្តាឡីស័ក
                                            <span className="link" onClick={() => setOpenAddPeopleQuarantine(true)}> <PlusCircleOutlined /></span>
                                        </Title></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td>កាលបរិច្ឆេទចាប់ផ្ដើម</td>
                                        <td> ៖&emsp;</td>
                                        <td>{hospitalData?.date_in !== undefined && moment(hospitalData?.date_in).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    </tr>

                                    <tr>
                                        <td>កាលបរិច្ឆេទចេញ</td>
                                        <td> ៖&emsp;</td>
                                        <td>{hospitalData?.date_out !== null && moment(hospitalData?.date_out).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    </tr>

                                    <tr>
                                        <td>ទីតាំង</td>
                                        <td> ៖&emsp;</td>
                                        <td>{quarantineData?.quarantineInfo?.locationName}</td>
                                    </tr>

                                    <tr>
                                        <td>អាស័យដ្ឋាន</td>
                                        <td> ៖&emsp;</td>
                                        <td>
                                            {(quarantineData?.quarantineInfo?.village !== "ក្រៅសៀមរាប" && quarantineData?.quarantineInfo?.village !== undefined) && "ភូមិ" + quarantineData?.quarantineInfo?.village + ","}
                                            {(quarantineData?.quarantineInfo?.commune !== "ក្រៅសៀមរាប" && quarantineData?.quarantineInfo?.commune !== undefined) && "ឃុំ" + quarantineData?.quarantineInfo?.commune + ","}
                                            {(quarantineData?.quarantineInfo?.district !== "ក្រៅសៀមរាប" && quarantineData?.quarantineInfo?.district !== undefined) && "ស្រុក" + quarantineData?.quarantineInfo?.district + ","}
                                            {quarantineData?.quarantineInfo?.province !== undefined && quarantineData?.quarantineInfo?.province}
                                        </td>
                                    </tr>
                                </table>
                            </Col>
                            <Col xs={24}>

                                <table style={{ marginLeft: 30 }} className="tbl-subPeople">
                                    <tr>
                                        <td width="150"><Title level={5}>
                                            ស្ថានភាពបច្ចុប្បន្ន
                                            <span className="link" onClick={() => setOpenEditCurrentState(true)}> <PlusCircleOutlined /></span>
                                        </Title></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td>អវិជ្ជមាន</td>
                                        <td> ៖&emsp;</td>
                                        <td> &emsp;</td>
                                        <td>{getPersonalInfoById?.createdAt !== undefined && moment(getPersonalInfoById?.createdAt).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    </tr>

                                    <tr>
                                        <td>វិជ្ជមាន</td>
                                        <td> ៖&emsp;</td>
                                        <td> {getPersonalInfoById?.currentState?.confirm ? "វិជ្ជមាន":""}&emsp;</td>
                                        <td>{getPersonalInfoById?.currentState?.confirmedAt !== null && moment(getPersonalInfoById?.currentState?.confirmedAt).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    </tr>

                                    <tr>
                                        <td>ជាសះស្បើយ</td>
                                        <td> ៖&emsp;</td>
                                        <td> {getPersonalInfoById?.currentState?.recovered ? "ជាសះស្បើយ":""}&emsp;</td>
                                        <td>{getPersonalInfoById?.currentState?.recoveredAt !== null && moment(getPersonalInfoById?.currentState?.recoveredAt).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    </tr>

                                    <tr>
                                        <td>ស្លាប់</td>
                                        <td> ៖&emsp;</td>
                                        <td> {getPersonalInfoById?.currentState?.death ? "ស្លាប់":""}&emsp;</td>
                                        <td>{getPersonalInfoById?.currentState?.deathAt !== null && moment(getPersonalInfoById?.currentState?.deathAt).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    </tr>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>

            {/* <Col
                xs={24} md={{ span: 7 }}
                style={{
                    border: "1px solid #d9d9d9",
                    padding: "20px 60px 20px 60px",
                    marginTop: 20
                }}
                className="subPeople-card"
            >

                <Row>
                    <Col
                        xs={24}
                        style={{ paddingBottom: 20 }}
                    >
                        <table className="tbl-subPeople1">
                            <thead>
                                <tr>
                                    <th colSpan={2}><Title level={5}>ស្ថានភាពបច្ចុប្បន្ន <span className="link" onClick={() => setOpenAddPeopleStatus(true)}><PlusCircleOutlined /></span></Title></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >{moment().format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    <td>អវិជ្ជមាន</td>
                                    <td>
                                        <span style={{ border: "1px solid green", padding: ""}}>
                                        {personalData?.currentState?.confirm ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td > {personalData?.currentState?.confirm ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />} វិជ្ជមាន</td>
                                    <td>{moment().format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                    <td>{moment().format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                </tr>
                                <tr>
                                    <td> {personalData?.currentState?.recovered ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />} ជាសះស្បើយ</td>
                                    <td>{moment().format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                </tr>
                                <tr>
                                    <td> {personalData?.currentState?.death ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />} ស្លាប់</td>
                                    <td>{moment().format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Col> */}
            <Col
                xs={24} md={{ span: 11, offset: 0 }}
                style={{
                    border: "1px solid #d9d9d9",
                    padding: "20px 60px 20px 60px",
                    marginTop: 20,
                }}
                className="subPeople-card"
            >
                <Row>
                    <Col
                        xs={24}
                        style={{ paddingBottom: 20 }}
                    >
                        <table className="tbl-subPeople">
                            <thead>
                                <tr>
                                    <th colSpan={3}><Title level={5}>ប្រវត្តិដំណើរករណី</Title></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="150">ឈ្មោះករណី</td>
                                    <td> ៖&emsp;</td>
                                    <td>{getPersonalInfoById?.case?.caseName !== undefined && getPersonalInfoById?.case?.caseName}</td>
                                </tr>
                                <tr>
                                    <td width="150">ទីតាំងករណី</td>
                                    <td> ៖&emsp;</td>
                                    <td>
                                        {(getPersonalInfoById?.case?.village !== "ក្រៅសៀមរាប" && getPersonalInfoById?.case?.village !== undefined) && "ភូមិ" + getPersonalInfoById?.case?.village + ","}
                                        {(getPersonalInfoById?.case?.commune !== "ក្រៅសៀមរាប" && getPersonalInfoById?.case?.commune !== undefined) && "ឃុំ" + getPersonalInfoById?.case?.commune + ","}
                                        {(getPersonalInfoById?.case?.district !== "ក្រៅសៀមរាប" && getPersonalInfoById?.case?.district !== undefined) && "ស្រុក" + getPersonalInfoById?.case?.district + ","}
                                        {getPersonalInfoById?.case?.province !== undefined && "ខេត្ត" + getPersonalInfoById?.case?.province}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="150">ទំនាក់ទំនង</td>
                                    <td> ៖&emsp;</td>
                                    <td>{getPersonalInfoById?.direct ? "ផ្ទាល់" : "ប្រយោល"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col
                        xs={24}
                    >
                        <table className="tbl-subPeople">
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        <Title level={5}>
                                            មណ្ឌលព្យាបាល
                                            <span className="link" onClick={() => setOpenAddPeopleHospital(true)}> <PlusCircleOutlined /></span>
                                        </Title>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td width="150">ឈ្មោះមណ្ឌល</td>
                                    <td> ៖&emsp;{getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.hospitalName}</td>
                                </tr>
                                <tr>
                                    <td width="150">អាស័យដ្ឋាន</td>
                                    <td> ៖&emsp;
                                        {(getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.village !== "ក្រៅសៀមរាប" && getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.village !== undefined) && "ភូមិ" + getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.village + ","}
                                        {(getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.commune !== "ក្រៅសៀមរាប" && getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.commune !== undefined) && "ឃុំ" + getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.commune + ","}
                                        {(getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.district !== "ក្រៅសៀមរាប" && getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.district !== undefined) && "ស្រុក" + getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.district + ","}
                                        {getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.province !== undefined && "ខេត្ត" + getHospitalizationByPersonalInfo?.hospitalInfo?.hospitalInfo?.province}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="150">កាលបរិច្ឆេទចូល</td>
                                    <td> ៖&emsp;{getHospitalizationByPersonalInfo?.hospitalInfo?.date_in !== null && moment(hospitalData?.date_in).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                </tr>
                                <tr>
                                    <td width="150">កាលបរិចេ្ឆទចេញ</td>
                                    <td> ៖&emsp;{getHospitalizationByPersonalInfo?.hospitalInfo?.date_out !== null && moment(hospitalData?.date_out).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Col>
            <Col
                xs={24} md={{ span: 12, offset: 1 }}
                style={{
                    border: "1px solid #d9d9d9",
                    padding: "20px 60px 20px 60px",
                    marginTop: 20,
                }}
                className="subPeople-card"
            >
                <Title level={5} style={{ marginBottom: 20 }}>
                    ទីតាំង <span className="link" onClick={() => setOpenAddPeopleLocation(true)}><PlusCircleOutlined /></span>
                </Title>
                <Timeline mode="right">
                    {getHistoryLocationByPersonalInfoId?.map(location => (
                        <Timeline.Item label={moment(location.date).format("ថ្ងៃDD ខែMM ឆ្នាំYYYY")} color={location.type === "ផ្ទាល់" ? "red" : "green"}>{location.affectedLocationId.affectedLocationName}</Timeline.Item>
                    ))}

                    {/* <Timeline.Item label="2015-09-01 09:12:11" color="green">Solve initial network problems</Timeline.Item>
                    <Timeline.Item color="green">Technical testing</Timeline.Item>
                    <Timeline.Item label="2015-09-01 09:12:11" color="green">Network problems being solved</Timeline.Item> */}
                </Timeline>
            </Col>
            <Col
                xs={24} md={{ span: 11 }}
                style={{ paddingTop: 14, marginTop: 20 }}
            >
                <Title level={5}>ការធ្វើតេស្ត <span className="link" onClick={() => setOpenAddPeopleTest(true)} ><PlusCircleOutlined /></span></Title>
                <Table
                    className="table-personal"
                    columns={testCol({ handleSampleTestDelete })}
                    dataSource={getPersonalInfoById?.sampleTest}
                    rowKey={record => record.id}
                    pagination={false}
                    scroll={{ x: 800, y: 300 }}
                    sticky
                />
            </Col>
            <Col
                xs={24} md={{ span: 12, offset: 1 }}
                style={{ paddingTop: 14, marginTop: 20 }}
            >
                <Title level={5}>
                    អ្នកពាក់ព័ន្ធ <span className="link" onClick={() => setOpenAddPeopleRelated(true)}><PlusCircleOutlined /></span>
                </Title>
                <Table
                    className="table-personal"
                    columns={relatedCol({ handleRelatedDelete })}
                    dataSource={subCaseData}
                    rowKey={record => record.id}
                    pagination={false}
                    // pagination={{
                    //     total: subCasePagination?.totalDocs,
                    //     // showSizeChanger: true,
                    //     onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    // }}
                    scroll={{ x: 1000, y: 300 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
