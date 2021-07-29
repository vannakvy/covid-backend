import { Col, Row } from 'antd'
import React, { Component } from 'react'

export default class PrintReport1 extends Component {
    render() {
        return (
            <div
                style={{
                    padding: 40
                }}
            >
                <table border="1" className="tbl-Report1">
                    <thead>
                        <tr>
                            <th rowSpan={2}></th>
                            <th colSpan={2}>
                                ការយកសំណាក
                            </th>
                            <th colSpan={2}>
                                ការសម្ភាសន៍
                            </th>
                            <th colSpan={2}>
                                រកឃើញការប៉ះពាល់
                            </th>
                            <th colSpan={2}>
                                ការបញ្ចូលអ្នកជំងឺ
                            </th>
                            <th colSpan={2}>
                                លើកទិសដៅយកសំណាក
                            </th>
                        </tr>
                        <tr>
                            <th>ចំនួនសំណាក់ម្សិលមិញ</th>
                            <th>លទ្ធផលវិជ្ជមាន (Lab Form ទទួលបាន)</th>
                            <th>សម្ភាសន៍បាន</th>
                            <th>ទំនាក់ទំនងមិនបាន/ផ្សេងៗ</th>
                            <th>អ្នកប៉ះពាល់</th>
                            <th>ទីតាំងប៉ះពាល់</th>
                            <th>ទៅមណ្ឌលព្យាបាល</th>
                            <th>អនុញ្ញាតនៅផ្ទះ</th>
                            <th>គោលដៅយកសំណាក</th>
                            <th>សម្រេចបាន(ស្មើចំនួន%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ភ្នំពេញ</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ខេត្ត</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                </table><br/>

                <table border="1" className="tbl-Report1">
                    <thead>
                        <tr>
                            <th rowSpan={2}></th>
                            <th colSpan={2}>
                                ស៊ើបបញ្ជាក់ទីតាំង
                            </th>
                            <th colSpan={2}>
                                វាយតម្លៃទីតាំង
                            </th>
                            <th colSpan={2}>
                                ការងារ ១១៥
                            </th>
                            <th colSpan={2}>
                                ទាញទិន្នន័យលេខទូរស័ព្ទ
                            </th>
                            <th colSpan={2}>
                                ស្រាវជ្រាវ-អនុវត្តនីតិវិធី
                            </th>
                        </tr>
                        <tr>
                            <th>គោលដៅបញ្ជាក់</th>
                            <th>រកឃើញ</th>
                            <th>បិទខ្ទប់</th>
                            <th>បញ្ចប់ការបិទខ្ទប់</th>
                            <th>ទទួលការហៅចូល</th>
                            <th>ហៅចេញ(តាមដានអ្នកប៉ះពាល់)</th>
                            <th>Lat-Long</th>
                            <th>Scan QR</th>
                            <th>បាត់ទំនាក់ទំនង</th>
                            <th>ល្មើសវិធានកាលសុខាភិបាល</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ភ្នំពេញ</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ខេត្ត</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                </table>
            </div>
        )
    }
}