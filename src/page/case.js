import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { caseCol } from '../component/case/tableColumn/caseColumn'
import { CaseController } from '../context/caseContext'
import AddCase from '../component/case/modal/addCase';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_CASES, DELETE_CASE_BY_ID } from '../graphql/case'

export default function Case() {
    //const {caseData, caseDataDispatch} = useContext(CaseController)
    const [caseData, setCaseData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(15)
    const [keyword, setKeyword] = useState("")

    const { data, loading, error, refetch} = useQuery(GET_ALL_CASES, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
        }, onCompleted: ({ getCaseWithPagination }) => {
            // console.log("casePage",getCaseWithPagination)
            setCaseData(getCaseWithPagination)
        },
        fetchPolicy:"network-only"
    })

    const [deleteCase, { loading: deleteLoading }] = useMutation(DELETE_CASE_BY_ID, {
        onCompleted: () => {
            if(loading){
                message.loading("កំពុងលុបទិន្នន័យ...")
            }else{
                refetch()
            message.success("លុបទិន្នន័យជោគជ័យ")
            }
            
        }
    })

    useEffect(()=>{
        if(data){
            if(loading){
                message.loading("កំពុងទាញ...")
            }else{
                setCaseData(data?.getCaseWithPagination)
            }
            
        }
    },[data])

    useEffect(() => {
        refetch()
    }, [page, limit, keyword])

    const callRefetch = ()=>{
        console.log("ref")
        refetch()
    }

    const handleDelete = (e) => {
        //caseDataDispatch({type: "DELETE_CASE", payload: e})
        
        deleteCase({
            variables: {
                id: e
            }
        })
    }

    return (
        <Row>
            <AddCase open={openAdd} refetch={refetch} setOpen={setOpenAdd} />
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលករណី
                    <PlusOutlined />
                </Button>
            </Col>
            <Col
                xs={16}
                md={6}
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
                    columns={caseCol({ handleDelete, limit, page })}
                    dataSource={caseData?.cases}
                    rowKey={record => record.id}
                    pagination={{
                        total: caseData?.paginator?.totalDocs,
                        // showSizeChanger: true,
                        onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    }}
                    scroll={{ x: 1500 }}
                    sticky
                />
            </Col>
            {
                // console.log(caseData?.cases?.length,caseData?.paginator?.totalDocs)
            }
        </Row>
    )
}
