import { Col, Image, Row, Table, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CameraOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PeopleController } from '../../context/peopleContext'
import { statusCol } from './tableColumn/statusColumn'
import { testCol } from './tableColumn/testColumn'
import { relatedCol } from './tableColumn/relatedColumn'
import AddSubCase from '../case/modal/addSubCase'
import AddPeopleTest from './modal/addPeopleTest'
import AddPeopleHospital from './modal/addPeopleHospital'
import AddPeopleStatus from './modal/addPeopleStatus'
import AddPeopleQuarantine from './modal/addPeopleQuarantine'
import AddPeopleHistory from './modal/addPeopleHistory'
import UploadPic from './modal/uploadPic'

const { Title } = Typography

export default function SubPeople() {
    const { peopleData } = useContext(PeopleController)
    const { id } = useParams()

    const [personalData, setPersonalData] = useState({})
    const [openAddSubCase, setOpenAddSubCase] = useState(false)
    const [openAddPeopleTest, setOpenAddPeopleTest] = useState(false)
    const [openAddPeopleHospital, setOpenAddPeopleHospital] = useState(false)
    const [openAddPeopleStatus, setOpenAddPeopleStatus] = useState(false)
    const [openAddPeopleQuarantine, setOpenAddPeopleQuarantine] = useState(false)
    const [openAddPeopleHistory, setOpenAddPeopleHistory]= useState(false)
    const [openUploadPic, setOpenUploadPic] = useState(false)

    useEffect(() => {
        setPersonalData(peopleData[peopleData.findIndex(e => e.id === id)])
        console.log(peopleData)
    }, [peopleData])

    const handleDelete = () => {

    }

    return (
        <Row>
            <AddSubCase open={openAddSubCase} setOpen={setOpenAddSubCase} caseId={"1"} />
            <AddPeopleTest open={openAddPeopleTest} setOpen={setOpenAddPeopleTest} />
            <AddPeopleHospital open={openAddPeopleHospital} setOpen={setOpenAddPeopleHospital} />
            <AddPeopleStatus open={openAddPeopleStatus} setOpen={setOpenAddPeopleStatus} />
            <AddPeopleQuarantine open={openAddPeopleQuarantine} setOpen={setOpenAddPeopleQuarantine} />
            <AddPeopleHistory open={openAddPeopleHistory} setOpen={setOpenAddPeopleHistory} />
            <UploadPic open={openUploadPic} setOpen={setOpenUploadPic} />
            <Col
                xs={24} md={15}
            >
                <Row
                    style={{
                        border: "1px solid #d9d9d9",
                    }}
                >
                    <Col
                        xs={24} md={8}
                        style={{
                            position: "relative",
                            padding: 20,
                        }}
                    >
                        <Image
                            width={"100%"}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <span className="btnCamera" onClick={() =>setOpenUploadPic(true)}>
                            <CameraOutlined />
                        </span>
                    </Col>
                    <Col
                        xs={24} md={10}
                    >
                        <ul className="list">
                            <li>ឈ្មោះ៖ {personalData?.name}</li>
                            <li>ភេទ៖ {personalData?.gender}</li>
                            <li>សញ្ជាតិ៖ {personalData?.nationality}</li>
                            <li>លេខអត្តសញ្ញាណប័ណ្ឌ៖ {personalData?.idCard}</li>
                            <li>លេខទូរស័ព្ទ៖ {personalData?.tel}</li>
                            <li>មុខរបរ៖ {personalData?.job}</li>
                            <li>អាស័យដ្ឋាន៖ ភូមិ{personalData?.village}  ឃុំ{personalData?.commune}  ស្រុក{personalData?.district}  ខេត្ត{personalData?.province} </li>
                        </ul>
                    </Col>
                </Row>
            </Col>
            <Col
                xs={24} md={{ span: 8, offset: 1 }}
                style={{
                    border: "1px solid #d9d9d9",
                    padding: "20px 20px 20px 0",
                }}
            >
                <ul className="list">
                    <li><Title level={5}>ការធ្វើចត្តាឡីស័ក <span className="link" onClick={() => setOpenAddPeopleQuarantine(true)}><PlusCircleOutlined /></span></Title></li>
                    <li>ចាប់ផ្តើម៖ </li>
                    <li>ចេញ៖ </li>
                    <li>ទីតាំង៖ </li>
                    <li>អាស័យដ្ឋាន៖ ភូមិ{personalData?.village}  ឃុំ{personalData?.commune}  ស្រុក{personalData?.district}  ខេត្ត{personalData?.province} </li>
                </ul>
            </Col>
            <Col
                xs={24} md={{ span: 11 }}
                style={{ paddingTop: 14 }}
            >
                <Title level={5}>ស្ថានភាពបច្ចុប្បន្ន <span className="link" onClick={() => setOpenAddPeopleStatus(true)}><PlusCircleOutlined /></span></Title>
                <Table
                    columns={statusCol({ handleDelete })}
                    dataSource={[{ id: "1", date: "alsdjas", status: "laskldfj", remark: "laksdjald" }]}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 500, y: 300 }}
                    sticky
                />
            </Col>
            <Col
                xs={24} md={{ span: 12, offset: 1 }}
                style={{ paddingTop: 14 }}
            >
                <Title level={5}>ប្រវត្តិដំណើរករណី <span className="link" onClick={() => setOpenAddPeopleHistory(true)}><PlusCircleOutlined /></span></Title>
                <ul className="list">
                    <li>ឈ្មោះករណី៖ </li>
                    <li>ទីតាំង៖ ភូមិ{personalData?.village}  ឃុំ{personalData?.commune}  ស្រុក{personalData?.district}  ខេត្ត{personalData?.province} </li>
                    <li>ទំនាក់ទំនង៖ </li>
                </ul>
                <Title level={5}>មណ្ឌលព្យាបាល <span className="link" onClick={() => setOpenAddPeopleHospital(true)}><PlusCircleOutlined /></span></Title>
                <Row>
                    <Col
                        xs={12}
                    >
                        <ul className="list">
                            <li>ឈ្មោះករណី៖ </li>
                            <li>ទីតាំង៖</li>
                            <li>ទំនាក់ទំនង៖ </li>
                        </ul>
                    </Col>
                    <Col
                        xs={12}
                    >
                        <ul className="list">
                            <li>កាលបរិច្ឆេទចូល៖ </li>
                            <li>កាលបរិចេ្ឆទចេញ៖ </li>
                        </ul>
                    </Col>
                </Row>
            </Col>
            <Col
                xs={24} md={{ span: 11 }}
                style={{ paddingTop: 14 }}
            >
                <Title level={5}>ការធ្វើតេស្ត <span className="link" onClick={() => setOpenAddPeopleTest(true)} ><PlusCircleOutlined /></span></Title>
                <Table
                    columns={testCol({ handleDelete })}
                    dataSource={[{ id: "1", date: "alsdjas", status: "laskldfj", remark: "laksdjald" }]}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 800, y: 300 }}
                    sticky
                />
            </Col>
            <Col
                xs={24} md={{ span: 12, offset: 1 }}
                style={{ paddingTop: 14 }}
            >
                <Title level={5}>
                    អ្នកពាក់ព័ន្ធ <span className="link" onClick={() => setOpenAddSubCase(true)}>
                        <PlusCircleOutlined />
                    </span>
                </Title>
                <Table
                    columns={relatedCol({ handleDelete })}
                    dataSource={[{ id: "1", date: "alsdjas", status: "laskldfj", remark: "laksdjald" }]}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 1000, y: 300 }}
                    sticky
                />
            </Col>
        </Row>
    )
}
