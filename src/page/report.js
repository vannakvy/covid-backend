import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print';
import DatePickerTwo from '../component/datepickertwo/datePickerTwo';
import PrintReport from '../component/print/report';

export default function Report() {
    const componentRef = useRef()
    const [openModal, setOpenModal] = useState(false)
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
        </div>
    )
}
