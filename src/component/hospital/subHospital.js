import { Col, Row, Typography, Table } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HospitalController } from '../../context/hospitalContext'
import moment from 'moment'
import { subHospitalCol } from './tableColumn/subHospitalColumn'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditHospital from './modal/editHospital'
import AddSubHospital from './modal/addSubHospital'
import EditSubHospital from './modal/editSubHospital'

const {Title} = Typography

export default function SubHospital() {

    const { hospitalData, subHospitalData, subHospitalDataDispatch } = useContext(HospitalController)

    let { id } = useParams();

    const [headerData, setHeaderData] = useState()
    const [updateSubData, setUpdateSubData] = useState({})

    const [openEdit, setOpenEdit] = useState(false)
    const [openAddSub, setOpenAddSub] = useState(false)
    const [openEditSub, setOpenEditSub] = useState(false)

    useEffect(() => {
        setHeaderData(hospitalData[hospitalData.findIndex(e => e.id === id)])
    }, [])

    // console.log(headerData)
    const handleDelete = (e) => {
        subHospitalDataDispatch({type: "DELETE_SUB_HOSPITAL", payload: e})
    }

    const handleEditSubHospital = (e) => {
        setUpdateSubData(e)
        setOpenEditSub(true)
    }
    return (
        <Row>
            <EditHospital open={openEdit} setOpen={setOpenEdit} data={headerData} setData={setHeaderData} />
            <AddSubHospital open={openAddSub} setOpen={setOpenAddSub} hospitalId={id} />
            <EditSubHospital open={openEditSub} setOpen={setOpenEditSub} data={updateSubData} setData={setUpdateSubData}  />
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
                <p>ឈ្មោះមណ្ឌល៖ {headerData?.hospitalName} <EditOutlined className="link" onClick={() => setOpenEdit(true)}/></p>
                <p>ទីតាំង៖ {headerData?.place}</p>
                <p>អាចផ្ទុក៖ {headerData?.capacity}</p>
                <p>អាសយដ្ឋាន៖ {headerData?.village},{headerData?.commune},{headerData?.district},{headerData?.province}</p>
                <p>អ្នកទទួលខុសត្រូវ៖ {headerData?.inCharge}</p>
                <p>លេខទូរស័ព្ទ៖ {headerData?.tel}</p>
                <p>ចំណាំ៖ {headerData?.note}</p>
            </Col>
            {/* <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <p>មណ្ឌលព្យាបាល៖ </p>

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
                    អ្នកជំងឺ៖ 

                    <PlusCircleOutlined className="link" onClick={() => setOpenAddSub(true)}/>
                </Title>

            </Col>
            <Col
                xs={24}
                md={24}
            >
                <Table
                    columns={subHospitalCol({handleDelete, handleEditSubHospital})}
                    dataSource={subHospitalData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 240 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
