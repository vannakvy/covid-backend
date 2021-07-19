import React, {useContext, useState, useEffect} from 'react'
import { Row, Col, Button, Input, Table,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { hospitalCol } from '../component/hospital/tableColumn/hospitalColumn'
import { HospitalController } from '../context/hospitalContext'
import AddHospital from '../component/hospital/modal/addHospital';
import { useQuery,useMutation } from '@apollo/client';
import { GET_ALL_HOSPITAL } from '../graphql/hospital';
import { DELETE_HOSPITALINFO_BY_ID } from '../graphql/hospital';

export default function Hospital() {

    // const {hospitalData, hospitalDataDispatch} = useContext(HospitalController)
    const [hospitalData, setHospitalData] = useState([])

    const [openAdd, setOpenAdd] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const {data,loading,error,refetch} = useQuery(GET_ALL_HOSPITAL,{
        variables:{
            page: page,
            limit: limit,
            keyword: keyword,
        },
        onCompleted:({getHospitalInfoWithPagination})=>{
            console.log(getHospitalInfoWithPagination)
            setHospitalData(getHospitalInfoWithPagination)
        }
    })

    const [deleteHospitalInfo, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_HOSPITALINFO_BY_ID, {     
        onCompleted: () => {
            refetch()
            message.success("ទិន្នន័យត្រូវបានលុប")
        },
        // refetchQueries: [{ query: GET_ALL_QUARANTINEINFO, variables: { keyword: keyword, limit: limit, page: page } }],
        // awaitRefetchQueries: true,
    })

    useEffect(() => {
        refetch()
    }, [page, limit, keyword])


    const handleDelete = (e) => {
        //hospitalDataDispatch({type: "DELETE_HOSPITAL", payload: e})
        deleteHospitalInfo({variables:{
            id:e
        }})
    }

    return (
        <Row>
            <AddHospital open={openAdd} setOpen={setOpenAdd}/>
            {/* <EditUser open={openEdit} setOpen={setOpenEdit} user={userEdit} /> */}
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលមន្ទីរពេទ្យ
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
                // caseCol({handleDelete})
                    columns={hospitalCol({handleDelete,limit,page})}
                    dataSource={hospitalData?.hospitalInfos}
                    rowKey={record => record.id}
                    pagination={{
                        total: hospitalData?.paginator?.totalDocs,
                        //pageSizeOptions:["10", "20"],
                        // showSizeChanger: true,
                        current: hospitalData?.paginator?.currentPage,
                        onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    }}
                    scroll={{ x: 1500 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
