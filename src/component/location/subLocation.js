import { Col, Row, Typography, Table } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CaseController } from '../../context/caseContext'
import moment from 'moment'
// import { subCaseCol } from './tableColumn/subCaseColumn'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
// import EditCase from './modal/editCase'
// import AddSubCase from './modal/addSubCase'
// import EditSubCase from './modal/editSubCase'
import { getRelated } from '../../function/fn'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PERSON_BY_CASE } from '../../graphql/case'
import { GET_CASE_BY_ID } from '../../graphql/case'

const { Title } = Typography

export default function SubLocation() {
    // const { subCaseData, subCaseDataDispatch } = useContext(CaseController)

    let { id } = useParams();

    const [headerData, setHeaderData] = useState()
    const [updateSubData, setUpdateSubData] = useState({})

    const [subCaseData, setSubCaseData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [openAddSub, setOpenAddSub] = useState(false)
    const [openEditSub, setOpenEditSub] = useState(false)
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
            console.log(getPersonalInfoByCaseWithPagination)
            setSubCaseData(getPersonalInfoByCaseWithPagination)
        }
    })

    const { data: dataCase } = useQuery(GET_CASE_BY_ID, {
        variables: {
            id: id
        },
        onCompleted: ({ getCaseById }) => {
            console.log(getCaseById)
            setCaseData(getCaseById)
        }
    })

    useEffect(() => {
        refetch()
    }, [page, limit, keyword])

    // console.log(headerData)
    const handleDelete = (e) => {
        // subCaseDataDispatch({type: "DELETE_SUB_CASE", payload: e})
    }

    const handleEditSubCase = (e) => {
        setUpdateSubData(e)
        setOpenEditSub(true)
    }

    return (
        <Row>
            {/* <EditCase open={openEdit} setOpen={setOpenEdit} data={caseData} caseId={id} />
            <AddSubCase open={openAddSub} setOpen={setOpenAddSub} caseId={id} />
            <EditSubCase open={openEditSub} setOpen={setOpenEditSub} data={updateSubData} setData={setUpdateSubData} /> */}
            <Col
                xs={24}
            >
                <Title level={5}>?????????????????????????????? {caseData?.caseName + " "}
                    <EditOutlined className="link" onClick={() => setOpenEdit(true)} />
                </Title>
            </Col>
            <Col
                xs={24}
                md={11}
                className="subCase-card"
            >
                <p>???????????????????????????????????? {moment(caseData?.date).format("????????????DD ??????MM ???????????????YYYY")}</p>

                <p>?????????????????????????????? {" "}
                    {caseData?.village !== "??????????????????????????????" && caseData?.village + ","}
                    {caseData?.commune !== "??????????????????????????????" && caseData?.commune + ","}
                    {caseData?.district !== "??????????????????????????????" && caseData?.district + ","}
                    {caseData?.province}</p>
                <p>????????????????????????????????????????????????????????????????????? {subCaseData?.personalInfos?.length}</p>
                <p>????????????????????? {caseData?.other}</p>
            </Col>
            <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <p>??????????????????????????????????????????????????????????????????????????? {getRelated(subCaseData?.personalInfos, true)}????????????</p>
                <p>??????????????????????????????????????????????????????????????????????????? {getRelated(subCaseData?.personalInfos, false)}????????????</p>
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
                {/* <Table
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
                /> */}
            </Col>
        </Row>


    )
}
