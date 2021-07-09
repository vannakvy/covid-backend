import React, { useState, useContext } from 'react'
import { Row, Col, Typography, DatePicker, Select, List } from 'antd'
import { DashboardController } from '../context/dashboardContext'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select;

export default function Dashboard() {
    const { dashBoardData, dashboardList } = useContext(DashboardController)

    const [dataTop, setDataTop] = useState(dashBoardData)
    const [dataTopRight, setDataTopRight] = useState(dashboardList)

    const dataTitle = ["ចាប់ពី", "រហូតដល់"]

    return (
        <Row>
            <Col
                xs={24}
                md={{ span: 12, offset: 12 }}
            // style={{display:'flex',justifyContent:'flex-end'}}
            >
                <Row>
                    <Col
                        xs={24}
                        md={12}
                        className="inCol"
                    >
                        <RangePicker placeholder={dataTitle} style={{width:"100%"}} />
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                        className="inCol"
                    >
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="ស្វែងរក..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col
                xs={24}
                md={18}
            >
                <Row>
                    {dataTop.map(load => {
                        return (
                            <Col
                                md={8}
                                xs={12}
                            >
                                <div className="dashboard-card">
                                    <Title level={4}>{load.title}</Title>
                                    <span
                                        className="dashboard-card-mid-text"
                                    >
                                        ថ្ងៃនេះ៖ {load.today}នាក់
                                    </span><br />
                                    <span
                                        className="dashboard-card-footer-text"
                                    >
                                        សរុប៖ {load.total}នាក់
                                    </span>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <Col
                        xs={24}
                    >
                        <p>Map</p>
                    </Col>
                </Row>
            </Col>
            <Col
                xs={24}
                md={6}
            >
                <Row>
                    <Col
                        xs={24}
                    >
                        <div className="inCol">
                            <List
                                header={
                                    <div>ករណីឆ្លងតាមស្រុក</div>
                                }
                                bordered
                                dataSource={dataTopRight}
                                renderItem={item => (
                                    <List.Item>
                                        <span>{item.title}</span>
                                        <span>{item.case}នាក់</span>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col
                        xs={24}
                    >
                        <p>Statistic</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
