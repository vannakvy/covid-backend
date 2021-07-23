import React, {useContext, useState,useEffect} from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { locationCol } from '../component/location/tableColumn/locationColumn'
import AddCase from '../component/case/modal/addCase';
import { useQuery ,useMutation} from '@apollo/client';
import {GET_ALL_CASES,DELETE_CASE_BY_ID} from '../graphql/case'
import { GET_ALL_LOCATION } from '../graphql/location';

export default function Location() {
    //const {caseData, caseDataDispatch} = useContext(CaseController)
    const [locationData,setLocationData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const {data, loading,error, refetch} = useQuery(GET_ALL_LOCATION,{
        onCompleted:({allAffectedLocations})=>{
        console.log(allAffectedLocations)
        setLocationData(allAffectedLocations)
    }})

    const [deleteCase,{loading:deleteLoading}]=useMutation(DELETE_CASE_BY_ID,{
        onCompleted:()=>{
            message.success("លុបទិន្នន័យជោគជ័យ")
        }
    })

    useEffect(() => {
        refetch()
    }, [page,limit,keyword])

    const handleDelete = (e) => {
        //caseDataDispatch({type: "DELETE_CASE", payload: e})
        deleteCase({variables:{
            id:e
        }})
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
                    បញ្ចូលទីតាំង
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
                    className="table-go-list"
                    columns={locationCol({handleDelete, limit, page})}
                    dataSource={locationData}
                    rowKey={record => record.id}
                    // pagination={{
                    //     total: caseData?.paginator?.totalDocs,
                    //     // showSizeChanger: true,
                    //     onChange:((page, pageSize) => {setPage(page);setLimit(pageSize)} )
                    // }}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
