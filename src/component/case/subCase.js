import { Col, Row, Typography, Table } from 'antd'
import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CaseController } from '../../context/caseContext'
import moment from 'moment'
import { subCaseCol } from './tableColumn/subCaseColumn'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import EditCase from './modal/editCase'
import AddSubCase from './modal/addSubCase'

const { Title } = Typography

export default function SubCase() {
    const { caseData, subCaseData } = useContext(CaseController)

    let { id } = useParams();

    const [headerData, setHeaderData] = useState(caseData[caseData.findIndex(e => e.id === id)])
    const [openEdit, setOpenEdit] = useState(false)
    const [openAddSub, setOpenAddSub] = useState(false)

    // console.log(headerData)

    return (
        <Row>
            <EditCase open={openEdit} setOpen={setOpenEdit} data={headerData} setData={setHeaderData} />
            <AddSubCase open={openAddSub} setOpen={setOpenAddSub} />
            <Col
                xs={24}
            >
                <Title level={5}>ឈ្មោះករណី៖ {headerData?.caseTitle} 
                    <EditOutlined className="link" onClick={() => setOpenEdit(true)}/>
                </Title>
            </Col>
            <Col
                xs={24}
                md={11}
                className="subCase-card"
            >
                <p>កាលបរិច្ឆេទ៖ {moment(headerData?.date).format("ថ្ងែDD ខែMM ឆ្នាំYYYY")}</p>
                <p>ទីតាំង៖ {headerData.place}</p>
                <p>អាសយដ្ឋាន៖ {headerData.village},{headerData.commune},{headerData.district},{headerData.province}</p>
                <p>ចំនួនអ្នកពាក់ព័ន្ធករណី៖</p>
            </Col>
            <Col
                xs={24}
                md={{ span: 11, offset: 2 }}
                className="subCase-card"
            >
                <p>ចំនួនអ្នកពាក់ព័ន្ធផ្ទាល់៖</p>
                <p>ចំនួនអ្នកពាក់ព័ន្ធប្រយោល៖</p>
                <p>ចំនួនអ្នកជាសះស្បើយ៖</p>
                <p>ចំនួនអ្នកស្លាប់៖</p>
            </Col>


            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Title level={5}>
                    អ្នកពាក់ព័ន្ធ៖ 

                    <PlusCircleOutlined className="link" onClick={() => setOpenAddSub(true)}/>
                </Title>

            </Col>
            <Col
                xs={24}
                md={24}
            >
                <Table
                    columns={subCaseCol()}
                    dataSource={subCaseData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 240 }}
                    sticky
                />
            </Col>
        </Row>


    )
}
