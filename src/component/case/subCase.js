import { Col, Row, Typography, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { subCaseCol } from './tableColumn/subCaseColumn'
import { EditOutlined } from '@ant-design/icons';
import EditCase from './modal/editCase'
import { getRelated } from '../../function/fn'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PERSON_BY_CASE } from '../../graphql/case'
import { GET_CASE_BY_ID } from '../../graphql/case'

const { Title } = Typography

export default function SubCase() {

    let { id } = useParams();

    const [subCaseData, setSubCaseData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    // const [openAddSub, setOpenAddSub] = useState(false)
    // const [openEditSub, setOpenEditSub] = useState(false)
    const [caseData, setCaseData] = useState({})

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const { data, refetch } = useQuery(GET_PERSON_BY_CASE, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            caseId: id
        },
        onCompleted: ({ getPersonalInfoByCaseWithPagination }) => {
            setSubCaseData(getPersonalInfoByCaseWithPagination)
        },
        fetchPolicy: 'network-only'
    })

    useEffect(()=>{
        if(data){
            setSubCaseData(data?.getPersonalInfoByCaseWithPagination)
        }
    },[data])

    const { data: dataCase , refetch:refetchCase} = useQuery(GET_CASE_BY_ID, {
        variables: {
            id: id
        },
        onCompleted: ({ getCaseById }) => {
            setCaseData(getCaseById)
        }
    })

    useEffect(()=>{
        if(dataCase){
            setCaseData(dataCase?.getCaseById)
        }
    },[dataCase])

    useEffect(() => {
        refetch()
    }, [page, limit, keyword])

    // console.log(headerData)
    const handleDelete = (e) => {
        // subCaseDataDispatch({type: "DELETE_SUB_CASE", payload: e})
    }

    const handleEditSubCase = (e) => {
        // setUpdateSubData(e)
        // setOpenEditSub(true)
    }

    return (
        <Row>
            <EditCase open={openEdit} setOpen={setOpenEdit} data={caseData} caseId={id} setRetetch={refetchCase} />
            <Col
                xs={24}
            >

            </Col>
            <Col
                xs={24}
                md={11}
                className="subCase-card"
            >
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: 150 }}>
                                <Title level={5}>???????????????????????????
                                </Title>
                            </td>
                            <td style={{ width: '50%' }}>
                                <Title level={5}>??? {caseData?.caseName + " "}
                                    <EditOutlined className="link" onClick={() => setOpenEdit(true)} />
                                </Title>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '50%' }}><p>?????????????????????????????????</p></td>
                            <td style={{ width: '50%' }}><p>??? {moment(caseData?.date).format("????????????DD ??????MM ???????????????YYYY")}</p></td>
                        </tr>
                        <tr>
                            <td>???????????????????????????</td>
                            <td> <p>??? {" "}
                                {caseData?.village !== "??????????????????????????????" && caseData?.village + ","}
                                {caseData?.commune !== "??????????????????????????????" && caseData?.commune + ","}
                                {caseData?.district !== "??????????????????????????????" && caseData?.district + ","}
                                {caseData?.province}</p></td>
                        </tr>
                        <tr>
                            <td><p>??????????????????????????????????????????????????????????????????</p></td>
                            <td><p>??? {subCaseData?.personalInfos?.length}</p></td>
                        </tr>
                        <tr>
                            <td><p>??????????????????</p></td>
                            <td><p>??? {caseData?.other}</p></td>
                        </tr>
                    </tbody>
                </table>





            </Col>
            <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: '50%' }}><p>????????????????????????????????????????????????????????????????????????</p></td>
                            <td style={{ width: '50%' }}><p>??? {getRelated(subCaseData?.personalInfos, true)}????????????</p></td>
                        </tr>
                        <tr>
                            <td><p>????????????????????????????????????????????????????????????????????????</p></td>
                            <td><p>??? {getRelated(subCaseData?.personalInfos, false)}????????????</p></td>
                        </tr>
                    </tbody>
                </table>

                {/* <p>????????????????????????????????????????????????????????? {getRelated(subCaseData, "?????????????????????")}????????????</p>
                <p>???????????????????????????????????????????????? {getRelated(subCaseData, "??????????????????")}????????????</p> */}
            </Col>


            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Title level={5}>
                    ??????????????????????????????????????????
                    {/* <PlusCircleOutlined className="link" onClick={() => setOpenAddSub(true)}/> */}
                </Title>

            </Col>
            <Col
                xs={24}
                md={24}
            >
                <Table
                    columns={subCaseCol({ handleDelete, handleEditSubCase })}
                    dataSource={subCaseData?.personalInfos}
                    rowKey={record => record.id}
                    pagination={{
                        total: subCaseData?.paginator?.totalDocs,
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
