import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print';
import DatePickerTwo from '../component/datepickertwo/datePickerTwo';
import PrintReport from '../component/print/report';
import PrintReport1 from '../component/print/report1';
import PrintReport2 from '../component/print/report2';

export default function Report() {
    const componentRef = useRef()
    const componentRef1 = useRef()
    const componentRef2 = useRef()
    const [openModal, setOpenModal] = useState(false)
    const [openModal1, setOpenModal1] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)
    const [ranges, setRanges] = useState({
        startDate: "",
        endDate: "",
    })

    return (
        <div>
            <div>
                <Button
                    onClick={() => setOpenModal(true)}
                >
                    Print
                </Button><Button
                    onClick={() => setOpenModal1(true)}
                >
                    Print
                </Button>
                <Button
                    onClick={() => setOpenModal2(true)}
                >
                    Print
                </Button><br />
                <DatePickerTwo ranges={ranges} setRange={setRanges} />
            </div>
            <Modal
                width={1000}
                visible={openModal}
                footer={[
                    <ReactToPrint
                        trigger={() => <Button type="primary" >Print this out!</Button>}
                        content={() => componentRef.current}
                    />
                ]}
                onCancel={() => setOpenModal(false)}
            >
                <PrintReport ref={componentRef} />
            </Modal>

            <Modal
                width={1100}
                visible={openModal1}
                footer={[
                    <ReactToPrint
                        trigger={() => <Button type="primary" >Print this out!</Button>}
                        content={() => componentRef1.current}
                    />
                ]}
                onCancel={() => setOpenModal1(false)}
            >
                <PrintReport1 ref={componentRef1} />
            </Modal>

            <Modal
                width={1100}
                visible={openModal2}
                footer={[
                    <ReactToPrint
                        trigger={() => <Button type="primary" >Print this out!</Button>}
                        content={() => componentRef2.current}
                    />
                ]}
                onCancel={() => setOpenModal2(false)}
            >
                <PrintReport2 ref={componentRef2} />
            </Modal>
        </div>
    )
}
