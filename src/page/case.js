import React, {useContext, useState,useEffect} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { caseCol } from '../component/case/tableColumn/caseColumn'
import { CaseController } from '../context/caseContext'
import AddCase from '../component/case/modal/addCase';
import { useQuery } from '@apollo/client';
import {GET_ALL_CASES} from '../graphql/case'

export default function Case() {
    //const {caseData, caseDataDispatch} = useContext(CaseController)
    const [caseData,setCaseData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const {data, loading,error, refetch} = useQuery(GET_ALL_CASES,{variables:{
        page:page,
        limit:limit,
        keyword:keyword,
    },onCompleted:({getCaseWithPagination})=>{
        console.log(getCaseWithPagination)
        setCaseData(getCaseWithPagination)
    }})

    useEffect(() => {
        refetch()
    }, [page,limit,keyword])

    const handleDelete = (e) => {
        //caseDataDispatch({type: "DELETE_CASE", payload: e})
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
                    onChange={(e)=> setKeyword(e.target.value)}
                    placeholder="ស្វែងរក..."
                />
            </Col>
            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Table
                    columns={caseCol({handleDelete, limit, page})}
                    dataSource={caseData?.cases}
                    rowKey={record => record.id}
                    pagination={{
                        total: caseData?.paginator?.totalDocs,
                        // showSizeChanger: true,
                        onChange:((page, pageSize) => {setPage(page);setLimit(pageSize)} )
                    }}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
