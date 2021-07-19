import React, {useContext, useState} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { PeopleController } from '../context/peopleContext';
import { peopleCol } from '../component/people/tableColumn/peopleColumn';
import AddPeople from '../component/people/modal/addPeople';
import { useQuery } from '@apollo/client';
import { GET_ALL_PERSONINFO } from '../graphql/people';

export default function People() {
    // const {peopleData, peopleDataDispatch} = useContext(PeopleController)

    const [openAdd, setOpenAdd] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [peopleData, setPeopleData] = useState([])

    const {data,loading,error} = useQuery(GET_ALL_PERSONINFO,{
        variables:{
            page:page,
            limit:limit,
            keyword:keyword,
        },
        onCompleted:({getPersonalInfoWithPagination})=>{
            console.log(getPersonalInfoWithPagination)
            setPeopleData(getPersonalInfoWithPagination)
        }
    })

    const handleDelete = (e) => {
        //peopleDataDispatch({type: "DELETE_PEOPLE", payload: e})
    }

    return (
        <Row>
            <AddPeople open={openAdd} setOpen={setOpenAdd} />
            <Col
                xs={8}
                md={18}
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
                xs={16}
                md={6}
            >
                <Input.Search
                    onChange={(e)=>setKeyword(e.target.value)}
                    placeholder="ស្វែងរក..."
                />
            </Col>
            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Table
                    columns={peopleCol({handleDelete,limit,page})}
                    dataSource={peopleData?.personalInfos}
                    rowKey={record => record.id}
                    pagination={{
                        total: peopleData?.paginator?.totalDocs,
                        //pageSizeOptions:["10", "20"],
                        // showSizeChanger: true,
                        current: peopleData?.paginator?.currentPage,
                        onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    }}
                    scroll={{ x: 1000 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
