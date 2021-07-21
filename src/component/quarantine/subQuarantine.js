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
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_PERSONINFO_NO_LIMIT} from '../../graphql/people'
import { GET_PERSON_BY_QUARANTINE } from '../../graphql/quarantine'
import { GET_QUARANTINE_BY_ID } from '../../graphql/quarantine'
import { DELETE_PERSON_BY_QUARANTINE } from '../../graphql/quarantine'

const {Title} = Typography

export default function SubQuarantine() {

    //const { quarantineData, subQuarantineData, subQuarantineDataDispatch } = useContext(QuarantineController)

    const districtLatLong = [
        {
            district:"ស្រុកក្រឡាញ់",
            lat:13.60472222544493,
            long:103.45245485053685,
        },
        {
            district:"ស្រុកវ៉ារិន",
            lat:13.867238663711532,
            long:103.87715707241854,
        },
        {
            district:"ស្រុកស្រិស្នំ",
            lat:13.852238272312373,
            long: 103.53639730433542,
        },
        {
            district:"ស្រុកអង្គរជុំ",
            lat:13.713723851088394,
            long:103.67219336284299,
        },
        {
            district:"ស្រុកបន្ទាយស្រី",
            lat:13.605041870228655,
            long:103.97859822744759,
        },
        {
            district:"ស្រុកសូទ្រនិគម",
            lat:13.414442053292065,
            long:104.10460200711728,
        },
        {
            district:"ស្រុកបាគង",
            lat:13.303005227138778,
            long:103.9796463766434,
        },
        {
            district:"ស្រុកពួក",
            lat:13.440442720250852,
            long:103.71973510206098,
        },
        {
            district:"ស្រុកជីក្រែង",
            lat:13.232399982258997,
            long:104.33684532302983,
        },
        {
            district:"ស្រុកស្វាយលើ",
            lat:13.698615549661712,
            long:104.21744370698126,
        },
        {
            district:"ស្រុកអង្គរធំ",
            lat:13.483410469370508,
            long:103.87412317588966,
        },
        {
            district:"ស្រុកសៀមរាប",
            lat:13.332155324410378,
            long:103.81891026025993,
        },
        
    ]

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
            // console.log(getQuarantineInfoById)
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
            // console.log(getQuarantineByQurantineIdWithPagination)
            setSubQuarantineData(getQuarantineByQurantineIdWithPagination)
        },
        onError:({error})=>{
            console.log(error)
        }
    })

    const [deleteQuarantine,{loading:deleteLoading}] = useMutation(DELETE_PERSON_BY_QUARANTINE,{
        onCompleted:()=>{
            message.success("លុបទិន្នន័យជោគជ័យ")
        }
    })

    useEffect(() => {
        // console.log(updateSubData)
    }, [])

    // console.log(headerData)
    const handleDelete = (e) => {
        //subQuarantineDataDispatch({type: "DELETE_SUB_QUARANTINE", payload: e})
        deleteQuarantine({
            variables:{
                id:e
            }
        })
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
                <p>អាសយដ្ឋាន៖ 
                    {quarantineData?.village !== "ក្រៅសៀមរាប" && quarantineData?.village + ","}
                    {quarantineData?.commune !== "ក្រៅសៀមរាប" && quarantineData?.commune + ","}
                    {quarantineData?.district !== "ក្រៅសៀមរាប" && quarantineData?.district + ","}
                    {quarantineData?.province}
                </p>
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
                    rowKey={(record) => record.id}
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
