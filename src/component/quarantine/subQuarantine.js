import { Col, Row, Typography, Table } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QuarantineController } from '../../context/quarantineContext'
import moment from 'moment'
import { subQuarantineCol } from './tableColumn/subQuarantineColumn'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditQuarantine from './modal/editQuarantine'
import AddSubQuarantine from './modal/addSubQuarantine'
import EditSubQuarantine from './modal/editSubQuarantine'

const {Title} = Typography

export default function SubQuarantine() {

    const { quarantineData, subQuarantineData, subQuarantineDataDispatch } = useContext(QuarantineController)

    let { id } = useParams();

    const [headerData, setHeaderData] = useState()
    const [updateSubData, setUpdateSubData] = useState({})

    const [openEdit, setOpenEdit] = useState(false)
    const [openAddSub, setOpenAddSub] = useState(false)
    const [openEditSub, setOpenEditSub] = useState(false)

    useEffect(() => {
        setHeaderData(quarantineData[quarantineData.findIndex(e => e.id === id)])
    }, [])

    // console.log(headerData)
    const handleDelete = (e) => {
        subQuarantineDataDispatch({type: "DELETE_SUB_QUARANTINE", payload: e})
    }

    const handleEditSubQuarantine = (e) => {
        setUpdateSubData(e)
        setOpenEditSub(true)
    }
    return (
        <Row>
            <EditQuarantine open={openEdit} setOpen={setOpenEdit} data={headerData} setData={setHeaderData} />
            <AddSubQuarantine open={openAddSub} setOpen={setOpenAddSub} quaratineId={id} />
            <EditSubQuarantine open={openEditSub} setOpen={setOpenEditSub} data={updateSubData} setData={setUpdateSubData}  />
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
                <p>ឈ្មោះមណ្ឌល៖ {headerData?.quarantineName} <EditOutlined className="link" onClick={() => setOpenEdit(true)}/></p>
                <p>ទីតាំង៖ {headerData?.place}</p>
                <p>អាសយដ្ឋាន៖ {headerData?.village},{headerData?.commune},{headerData?.district},{headerData?.province}</p>
                <p>អ្នកទទួលខុសត្រូវ៖ {headerData?.inCharge}</p>
                <p>លេខទូរស័ព្ទ៖ {headerData?.tel}</p>
            </Col>
            <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <p>មណ្ឌលព្យាបាល</p>
                <p>ឈ្មោះមណ្ឌល៖​ </p>
                <p>ទីតាំង៖ </p>
                <p>កាលបរិច្ឆេទ​ចូល៖ </p>
                <p>កាលបរិច្ឆេទចេញ៖ </p>
            </Col>


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
                    columns={subQuarantineCol({handleDelete, handleEditSubQuarantine})}
                    dataSource={subQuarantineData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 240 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
