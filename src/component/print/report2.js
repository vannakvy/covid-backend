import { Col, Row } from 'antd'
import React, { Component } from 'react'

export default class PrintReport2 extends Component {
    render() {
        return (
            <div
                style={{
                    padding: 40
                }}
            >
                <table border="1" className="tbl-Report2">
                    <thead>
                        <tr>
                        <th colSpan={2}></th>
                        <th>២០កុម្ភៈ ៖ ១៧៧៨ (ស្រី ៩៧៩)</th>
                        <th>នាំចូល៖ ១១៤ (ស្រី ៥៦)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan="2">សញ្ជាតិ</td>
                            <td>ខ្មែរ</td>
                            <td>១៧៦០ (ស្រី៩៧៣)</td>
                            <td>១៣២ (ស្រី៦៣)</td>
                        </tr>
                        <tr>
                            <td>ខ្មែរ</td>
                            <td>១៧៦០ (ស្រី៩៧៣)</td>
                            <td>១៣២ (ស្រី៦៣)</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">រាជធានី</td>
                            <td>ភ្នំពេញ</td>
                            <td>១៧៦០ (ស្រី៩៧៣)</td>
                            <td>១៣២ (ស្រី៦៣)</td>
                        </tr>
                        <tr>
                            <td>ខ្មែរ</td>
                            <td>១៧៦០ (ស្រី៩៧៣)</td>
                            <td>១៣២ (ស្រី៦៣)</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        )
    }
}