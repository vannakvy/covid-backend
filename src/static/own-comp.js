import React from 'react'
import { Select } from 'antd'

const { Option } = Select;

export function ListSelect({ type, data, title, value, setValue, id, disabled }) {
    return (
        type === 0 ? (
            <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={title}
                value={value}
                onChange={e => setValue(e)}
                disabled={disabled}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.indexOf(input) >= 0
                }
                filterSort={(optionA, optionB) =>
                    optionA.children.localeCompare(optionB.children)
                }
            >
                {data.map(load => {
                    return <Option value={load.title} key={load.id}>{load.title}</Option>
                })}
            </Select>
        ) : (

            type === 1 ? (
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder={title}
                    value={value}
                    onChange={e => setValue(e)}
                    disabled={disabled}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.indexOf(input) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.localeCompare(optionB.children)
                    }
                >
                    {data.map(load => {
                        return <Option value={load.title} key={load.title}>{load.title}</Option>
                    })}
                </Select>
            ) : (

                type === 2 ? (
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder={title}
                        value={value}
                        onChange={e => setValue(e)}
                        disabled={disabled}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.indexOf(input) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.localeCompare(optionB.children)
                        }
                    >
                        {data.map(load => {
                            return <Option value={load.id} key={load.id}>{load.lastName} {load.firstName}</Option>
                        })}
                    </Select>
                ) : (

                    type === 3 ? (
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={title}
                            value={value}
                            onChange={e => setValue(e)}
                            disabled={disabled}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.indexOf(input) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.localeCompare(optionB.children)
                            }
                        >
                            {data.map(load => {
                                return <Option value={load.id} key={load.id}>{load.caseName}</Option>
                            })}
                        </Select>
                    ) :
                        type === 4 ? (
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder={title}
                                value={value}
                                onChange={e => setValue(e)}
                                disabled={disabled}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.indexOf(input) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.localeCompare(optionB.children)
                                }
                            >
                                <Option value="new" key="new">បញ្ចូលថ្មី</Option>
                                {data.map(load => {
                                    return <Option value={load.id} key={load.id}>{load.caseName}</Option>
                                })}
                            </Select>
                        ) : (
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder={title}
                                value={value}
                                onChange={e => setValue(e)}
                                disabled={disabled}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.indexOf(input) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.localeCompare(optionB.children)
                                }
                            >
                                <Option value="new" key="new">បញ្ចូលថ្មី</Option>
                                {data.map(load => {
                                    return <Option value={load.id} key={load.id}>{load.affectedLocationName}</Option>
                                })}
                            </Select>
                        )


                )
            )

        )

    )
}

export function ListUserSelect({ type, data, title, value, setValue, id, disabled }) {
    return (
        type === 0 ? (
            <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={title}
                value={value}
                disabled={disabled}
                optionFilterProp="children"
                onChange={(e) => setValue(e)}
                filterOption={(input, option) =>
                    option.children.indexOf(input) >= 0
                }
                filterSort={(optionA, optionB) =>
                    optionA.children.localeCompare(optionB.children)
                }
            >
                <Option key={0} value="New">បញ្ចូលថ្មី</Option>
                {data.map(load => {
                    return (
                        <Option value={load.id} key={load.id}>{load.idCard + " " + load.firstName + " " + load.lastName + " (" + load.gender + ") " + load.tel}</Option>
                    )
                })}
            </Select>
        ) : (
            <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={title}
                value={value}
                disabled={disabled}
                optionFilterProp="children"
                onChange={(e) => setValue(e)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >
                <Option key={0} value="New">New</Option>
                {data.map(load => {
                    return (
                        <Option value={load.id} key={load.id}>{load.id + " " + load.name + " (" + load.gender + ")"}</Option>
                    )
                })}
            </Select>
        )
    )
}