import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { quarantineCol } from '../component/quarantine/tableColumn/quarantineColumn'
import { QuarantineController } from '../context/quarantineContext'
import AddQuarantine from '../component/quarantine/modal/addQuarantine';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_QUARANTINEINFO } from '../graphql/quarantine';
import { DELETE_QUARANTINE_BY_ID } from '../graphql/quarantine';
import query from 'esquery';
import { waitFor } from '@testing-library/dom';

export default function Quarantine() {

    // const { quarantineData, quarantineDataDispatch } = useContext(QuarantineController)

    const [openAdd, setOpenAdd] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [quarantineData, setQuarantineData] = useState([])

    const { data, loading, error, refetch } = useQuery(GET_ALL_QUARANTINEINFO, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
        },
        onCompleted: ({ getQuarantineInfoWithPagination }) => {
            console.log("test",getQuarantineInfoWithPagination?.quarantineInfos)
            setQuarantineData(getQuarantineInfoWithPagination)
            
        },
        fetchPolicy: 'network-only',
        
    })
    
    const [deleteQuarantineInfo, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_QUARANTINE_BY_ID, {     
        onCompleted: () => {
            refetch()
            message.success("ទិន្នន័យត្រូវបានលុប")
        },
        // refetchQueries: [{ query: GET_ALL_QUARANTINEINFO, variables: { keyword: keyword, limit: limit, page: page } }],
        // awaitRefetchQueries: true,
    })

    useEffect(() => {
        // refetch()
    }, [page, limit, keyword,quarantineData])


    const handleDelete = (e) => {
        //quarantineDataDispatch({ type: "DELETE_QUARANTINE", payload: e })
        deleteQuarantineInfo({
            variables: {
                id: e
            },
            
        })
    }

    return (
        <Row>
            <AddQuarantine open={openAdd} setOpen={setOpenAdd} />
            {/* <EditUser open={openEdit} setOpen={setOpenEdit} user={userEdit} /> */}
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលមណ្ឌលចត្តាឡីស័ក
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
                    // caseCol({handleDelete})
                    columns={quarantineCol({ handleDelete, limit, page })}
                    dataSource={quarantineData?.quarantineInfos}
                    rowKey={record => record.id}
                    pagination={{
                        total: quarantineData?.paginator?.totalDocs,
                        //pageSizeOptions:["10", "20"],
                        // showSizeChanger: true,
                        current: quarantineData?.paginator?.currentPage,
                        onChange: ((page, pageSize) => { setPage(page); setLimit(pageSize) })
                    }}
                    scroll={{ x: 1500 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
