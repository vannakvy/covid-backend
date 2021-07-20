import { Col, Row, Typography, Table, message } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QuarantineController } from '../../context/quarantineContext'
import moment from 'moment'
import { subQuarantineCol } from './tableColumn/subQuarantineColumn'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditQuarantine from './modal/editQuarantine'
import AddSubQuarantine from './modal/addSubQuarantine'
import EditSubQuarantine from './modal/editSubQuarantine'
import { useQuery } from '@apollo/client'
import { GET_ALL_PERSONINFO_NO_LIMIT} from '../../graphql/people'
import { GET_PERSON_BY_QUARANTINE } from '../../graphql/quarantine'
import { GET_QUARANTINE_BY_ID } from '../../graphql/quarantine'

const {Title} = Typography

export default function SubQuarantine() {

    //const { quarantineData, subQuarantineData, subQuarantineDataDispatch } = useContext(QuarantineController)

    let { id } = useParams();

    const [peopleData, setPeopleData] = useState([])
    const [headerData, setHeaderData] = useState()
    const [updateSubData, setUpdateSubData] = useState({})

    const [openEdit, setOpenEdit] = useState(false)
    const [openAddSub, setOpenAddSub] = useState(false)
    const [openEditSub, setOpenEditSub] = useState(false)
    const [subQuarantineData, setSubQuarantineData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [quarantineData,setQuarantineData] = useState({})

    const {data} = useQuery(GET_ALL_PERSONINFO_NO_LIMIT,{
        onCompleted:({allPersonalInfos})=>{
            // console.log(allPersonalInfos)
            setPeopleData(allPersonalInfos)
        }
    })

    const {data:quarantine,loading} = useQuery(GET_QUARANTINE_BY_ID,{
        variables:{
            id:id
        },
        onCompleted:({getQuarantineInfoById})=>{
            console.log(getQuarantineInfoById)
            setQuarantineData(getQuarantineInfoById)
        }
    })

    const {data:subQuarantine} = useQuery(GET_PERSON_BY_QUARANTINE,{
        variables:{
            page:page,
            limit:limit,
            keyword:keyword,
            quarantineInfoId:id
        },
        onCompleted:({getQuarantineByQurantineIdWithPagination})=>{
            console.log(getQuarantineByQurantineIdWithPagination)
            setSubQuarantineData(getQuarantineByQurantineIdWithPagination)
        },
        onError:({error})=>{
            console.log(error)
        }
    })

    useEffect(() => {
        console.log(updateSubData)
    }, [updateSubData])

    // console.log(headerData)
    const handleDelete = (e) => {
        //subQuarantineDataDispatch({type: "DELETE_SUB_QUARANTINE", payload: e})
    }

    const handleEditSubQuarantine = (e) => {
        
        setUpdateSubData(e)
        
        setOpenEditSub(true)
    }

    const key = 'updatable';
    const openMessage = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
          message.success({ content: 'Loaded!', key, duration: 2 });
        }, 1000);
      };

    return (
        <>
        {/* { loading ? message.loading("test"): */}
        <Row>
            <EditQuarantine open={openEdit} setOpen={setOpenEdit} data={quarantineData} quarantineId={id}/>
            <AddSubQuarantine open={openAddSub} setOpen={setOpenAddSub} quarantineId={id} peopleData={peopleData} />
            <EditSubQuarantine open={openEditSub} setOpen={setOpenEditSub} data={updateSubData} quarantineId={id} peopleData={peopleData} />
            <Col
                xs={24}
            >
                {/* <Title level={5}>ឈ្មោះករណី៖ 
                    <EditOutlined className="link" onClick={() => setOpenEdit(true)}/>
                </Title> */}
            </Col>
            <Col
                xs={24}
                md={11}
                className="subCase-card"
            >
                <p>ឈ្មោះមណ្ឌល៖ {quarantineData?.locationName} <EditOutlined className="link" onClick={() => setOpenEdit(true)}/></p>
                {/* <p>ទីតាំង៖ {quarantineData?.place}</p> */}
                <p>អាចផ្ទុក៖ {quarantineData?.capacity}</p>
                <p>អាសយដ្ឋាន៖ {quarantineData?.village},{quarantineData?.commune},{quarantineData?.district},{quarantineData?.province}</p>
                <p>អ្នកទទួលខុសត្រូវ៖ {quarantineData?.personInCharge?.lastName} {quarantineData?.personInCharge?.firstName}</p>
                <p>លេខទូរស័ព្ទ៖ {quarantineData?.personInCharge?.tel}</p>
                <p>ចំណាំ៖ {quarantineData?.other}</p>
            </Col>
            {/* <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <p>មណ្ឌលព្យាបាល៖ </p>
                <EditOutlined className="link" onClick={() => setOpenEdit(true)}/>
                <p>ឈ្មោះមណ្ឌល៖​ </p>
                <p>ទីតាំង៖ </p>
                <p>កាលបរិច្ឆេទ​ចូល៖ </p>
                <p>កាលបរិច្ឆេទចេញ៖ </p>
            </Col> */}


            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Title level={5}>
                    អ្នកធ្វើចត្តាឡីស័ក៖ 

                    <PlusCircleOutlined className="link" onClick={() => setOpenAddSub(true)}/>
                </Title>

            </Col>
            <Col
                xs={24}
                md={24}
            >
                <Table
                    columns={subQuarantineCol({handleDelete, handleEditSubQuarantine,limit,page})}
                    dataSource={subQuarantineData?.quarantines}
                    rowKey={id}
                    pagination={{
                        total: subQuarantineData?.paginator?.totalDocs,
                        // showSizeChanger: true,
                        onChange:((page, pageSize) => {setPage(page);setLimit(pageSize)} )
                    }}
                    scroll={{ x: 240 }}
                    sticky
                />
            </Col>
        </Row>
        {/* } */}
        </>
    )
}
