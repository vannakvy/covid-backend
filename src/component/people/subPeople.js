import { Col, Image, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PeopleController } from '../../context/peopleContext'

export default function SubPeople() {
    const { peopleData } = useContext(PeopleController)
    const { id } = useParams()

    const [personalData, setPersonalData] = useState({})

    useEffect(() => {
        setPersonalData(peopleData[peopleData.findIndex(e => e.id === id)])
        console.log(peopleData)
    }, [peopleData])

    return (
        <Row>
            <Col
                xs={24} md={15}
            >
                <Row
                    style={{
                        border: "1px solid #d9d9d9",
                        padding: 20,
                    }}
                >
                    <Col
                        xs={24} md={8}
                    >
                        <Image
                            width={"100%"}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
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
                    <li>ការធ្វើចត្តាឡីស័ក</li>
                    <li>ចាប់ផ្តើម៖ </li>
                    <li>ចេញ៖ </li>
                    <li>ទីតាំង៖ </li>
                    <li>អាស័យដ្ឋាន៖ ភូមិ{personalData?.village}  ឃុំ{personalData?.commune}  ស្រុក{personalData?.district}  ខេត្ត{personalData?.province} </li>
                </ul>
            </Col>
        </Row>
    )
}
