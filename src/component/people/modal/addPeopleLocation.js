import React, { useContext, useState } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Button, message } from 'antd'
import { CaseController } from '../../../context/caseContext'
import { provinceData, districtData, communeData, villageData, genderData } from '../../../context/headerContext'
import { ListSelect } from '../../../static/own-comp'
import { convertToCommune, convertToDistrict, convertToVillage } from '../../../function/fn'
import { setPeopleLocation } from '../../../function/set'
import { CREATE_NEW_LOCATION} from '../../../graphql/location'
import { GET_ALL_CASES_NO_LIMIT } from '../../../graphql/case'
import { GET_ALL_LOCATION} from '../../../graphql/location'
import { useMutation,useQuery } from '@apollo/client'
import AddLocation from '../../location/modal/addLocation'
import { CREATE_NEW_HISTORYLOCATION } from '../../../graphql/historylocation'
import moment from 'moment'

export default function AddPeopleLocation({ open, setOpen, setRefetch, caseId, peopleId }) {

    
    const [province, setProvince] = useState("")
    const [district, setDistrict] = useState("")
    const [commune, setCommune] = useState("")
    const [locationData, setLocationData] = useState([])
    const [locationId, setLocationId] = useState("")
    const [location, setLocation] = useState({})
    const [openModal, setOpenModal] = useState(false)

    //const { caseDataDispatch } = useContext(CaseController)
    const [createHistoryLocation, { loading:createLoading}] = useMutation(CREATE_NEW_HISTORYLOCATION, {
        onCompleted: ({ createCase }) => {
            setRefetch()
            message.success("បញ្ចូលទិន្នន័យជោគជ័យ")
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const {data, loading,error} = useQuery(GET_ALL_LOCATION,{
        onCompleted:({allAffectedLocations})=>{
        console.log(allAffectedLocations)
        setLocationData(allAffectedLocations)
    }})

    // console.log(locationData)

    let [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', {...values, case: caseId, personalInfo: peopleId});
        // console.log(location)

        if(locationId === 'new'){
            createHistoryLocation({
                variables:{...setPeopleLocation(values), case: caseId, personalInfo: peopleId, affectedLocationId: location.id}
            })
        }else {
            createHistoryLocation({
                variables:{...setPeopleLocation(values), case: caseId, personalInfo: peopleId, affectedLocationId:values.affectedLocationId}
            })
        }

        

        // createCase({
        //     variables: {
        //         caseName: values.caseName,
        //         village: values.village === undefined ? "ក្រៅសៀមរាប" : values.village,
        //         commune: values.commune === undefined ? "ក្រៅសៀមរាប" : values.commune,
        //         district: values.district === undefined ? "ក្រៅសៀមរាប" : values.district,
        //         province: values.province === undefined ? "ក្រៅសៀមរាប" : values.province,
        //         date: moment(values.date).format(),
        //         lat: parseFloat(values.lat),
        //         long: parseFloat(values.long),
        //         other: values.other,
        //     }
        // })

        setOpen(false)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const setToProviceFn = (e) => {
        form.setFieldsValue({
            province: e,
            district: null,
            commune: null,
            village: null,
        });

        setProvince(e)
        setDistrict("")
        setCommune("")
    };


    const setToDistrictFn = (e) => {
        form.setFieldsValue({
            district: e,
            commune: null,
            village: null,
        });

        setDistrict(e)
        setCommune("")
    };

    const setToCommuneFn = (e) => {
        form.setFieldsValue({
            commune: e,
            village: null,
        });

        setCommune(e)
    };

    const setToVillageFn = (e) => {
        form.setFieldsValue({
            village: e
        });
    };

    const setToCaseFn = (e) => {
        form.setFieldsValue({
            case: e
        });
    };

    const setToPeopleFn = (e) => {
        form.setFieldsValue({
            personalInfo: e
        });
    };

    const setLocationTypeFn = (e) => {
        form.setFieldsValue({
            type: e
        });
    };

    const setToLocationFn = (e) => {
        form.setFieldsValue({
            affectedLocationId: e
        });
        if (e === "new") {
            setOpenModal(true)
        }

        setLocationId(e)
    };

    const callbackLocation = (e) => {
        // console.log("test",e)
        if(e === ""){
            setLocationId(e)
            form.setFieldsValue({
                affectedLocationId: null
            })
        }else {
            setLocation(e)
            form.setFieldsValue({
                affectedLocationName: e.affectedLocationName
            })
        }
    }

    return (
        <Modal
            title="បញ្ចូលទីតាំង"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <AddLocation open={openModal} setOpen={setOpenModal} locationId={locationId} setLocationId={callbackLocation} />
            <Form
                form={form}
                name="addCase"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col xs={24} md={{span: 11, offset: 0}}>
                        <Form.Item
                            name="affectedLocationId"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {/* <Input placeholder="ទីតាំង" /> */}
                            <ListSelect type={5} data={locationData} title="ទីតាំង" setValue={setToLocationFn} disabled={locationId === "new" ? true : false} />
                        </Form.Item>
                    </Col>

                    {
                        locationId === "new" ? (
                            <Col xs={24} md={{ span: 11, offset: 2 }}>
                                <Form.Item
                                    name="affectedLocationName"
                                >
                                    <Input disabled={true} style={{backgroundColor: "white", color: "black"}} />
                                </Form.Item>
                            </Col>
                        ) : null
                    }
                    
                    <Col xs={24} md={locationId === "new" ? {span: 11, offset: 0} : {span: 11, offset: 2}}>
                        <Form.Item
                            name="type"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            {/* <Input placeholder="ទីតាំង" /> */}
                            <ListSelect type={1} data={[
                                {title: "ផ្ទាល់"},
                                {title: "ឆ្លងកាត់"}
                            ]} title="ប្រភេទ" setValue={setLocationTypeFn}/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={locationId === "new" ? {span: 11, offset: 2} : {span: 24}}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker placeholder="កាលបរិច្ឆេទចូល" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>


                    <Col xs={24}>
                        <Form.Item
                            name="other"
                        >
                            <Input placeholder="ចំណាំ" />
                        </Form.Item>
                    </Col>

                    

                    <Col xs={24}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ width: "100%" }}
                        >
                            បញ្ចូលទិន្នន័យ
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
