import React, {useContext, useState} from 'react'
import { Row, Col, Button, Input, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { PeopleController } from '../context/peopleContext';
import { peopleCol } from '../component/people/tableColumn/peopleColumn';
import AddPeople from '../component/people/modal/addPeople';

export default function People() {
    const {peopleData, peopleDataDispatch} = useContext(PeopleController)

    const [openAdd, setOpenAdd] = useState(false)

    const handleDelete = (e) => {
        peopleDataDispatch({type: "DELETE_PEOPLE", payload: e})
    }

    return (
        <Row>
            <AddPeople open={openAdd} setOpen={setOpenAdd} />
            <Col
                xs={8}
                md={18}
            >
                <Button
                    type="primary"
                    onClick={() => setOpenAdd(true)}
                >
                    បញ្ចូលករណី
                    <PlusOutlined />
                </Button>
            </Col>
            <Col
                xs={16}
                md={6}
            >
                <Input.Search
                    placeholder="ស្វែងរក..."
                />
            </Col>
            <Col
                xs={24}
                style={{ marginTop: 20 }}
            >
                <Table
                    columns={peopleCol({handleDelete})}
                    dataSource={peopleData}
                    rowKey={record => record.id}
                    pagination={true}
                    scroll={{ x: 1000 }} 
                    sticky 
                />
            </Col>
        </Row>
    )
}
