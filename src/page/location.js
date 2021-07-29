import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Button, Input, Table, message, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { locationCol } from '../component/location/tableColumn/locationColumn'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_CASES, DELETE_CASE_BY_ID } from '../graphql/case'
import { GET_AFFECTED_LOCATION_PAGINATION } from '../graphql/location';
import AddLocation from '../component/location/modal/addLocation';
import EditLocation from '../component/location/modal/editLocation';
import { DELETE_AFFECTEDLOCATION_BY_ID } from '../graphql/location';

const { Option } = Select

export default function Location() {
    //const {caseData, caseDataDispatch} = useContext(CaseController)
    // const [locationData, setLocationData] = useState([])
    const [dataEdit, setDataEdit] = useState({})

    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [keyword, setKeyword] = useState("")

    const { data, loading, error, refetch } = useQuery(GET_AFFECTED_LOCATION_PAGINATION, {
        variables: {
            page:page,
            limit:limit,
            keyword:keyword,
        },
        // onCompleted: ({ getAffectedLocationWithPagination }) => {
        //     console.log(getAffectedLocationWithPagination)
        //     setLocationData(getAffectedLocationWithPagination)

        // },
        fetchPolicy:'network-only'
    })

    const getAffectedLocationWithPagination = data?.getAffectedLocationWithPagination
    
    const [deleteAffectedLocation, { loading: deleteLoading }] = useMutation(DELETE_AFFECTEDLOCATION_BY_ID, {
        onCompleted: ({deleteAffectedLocation}) => {
            
            if(deleteAffectedLocation.success === true){
                refetch()
                message.success("លុបទិន្នន័យជោគជ័យ")
            }else{
                message.error("បរាជ័យ")
            }
            
        }
    })

    useEffect(() => {
        refetch()
    }, [page, limit, keyword])

    const callRefetch = ()=>{
        console.log("ref")
        
    }


    const handleDelete = (e) => {
        //caseDataDispatch({type: "DELETE_CASE", payload: e})
        deleteAffectedLocation({
            variables: {
                id: e
            }
        })
    }

    const handleEdit = (e) => {
        setOpenEdit(true)
        setDataEdit(e)
        // console.log(e)
    }

    
    return (
        <Row>
            <AddLocation open={openAdd} setRefetch={refetch} setOpen={setOpenAdd} />
            <EditLocation open={openEdit} setOpen={setOpenEdit} dataEdit={dataEdit} />
            <Col
                xs={8}
                md={13}
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
                xs={12}
                md={4}
            >
                <Select style={{ width: "100%" }}>
                    <Option value={true}>ទីតាំងដែលបានបិទ</Option>
                    <Option value={false}>ទីតាំងដែលបានបើក</Option>
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
                    columns={locationCol({ handleDelete, handleEdit, limit, page })}
                    dataSource={getAffectedLocationWithPagination?.affectedLocations}
                    rowKey={record => record.id}
                    // size="small"
                    pagination={{
                        total: getAffectedLocationWithPagination?.paginator?.totalDocs,
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
