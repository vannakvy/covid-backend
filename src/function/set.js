import moment from "moment"

export function setCase(values, length) {
    var array = {
        id: values.id === undefined ? length+=1 : values.id,
        caseTitle: values.caseTitle,
        date: new Date(values.date),
        place: values.place,
        related: values.related === undefined ? 0 : values.related,
        province: values.province === undefined ? "" : values.province,
        district: values.district === undefined ? "" : values.district,
        commune: values.commune === undefined ? "" : values.commune,
        village: values.village === undefined ? "" : values.village,
        remark: values.remark,
    }

    return array
}

export function setEditCase(values) {
    var array = {
        id: values.id,
        caseTitle: values.caseTitle,
        date: moment(values.date),
        place: values.place,
        related: values.related === undefined ? 0 : values.related,
        province: values.province === undefined ? "" : values.province,
        district: values.district === undefined ? "" : values.district,
        commune: values.commune === undefined ? "" : values.commune,
        village: values.village === undefined ? "" : values.village,
        remark: values.remark,
    }

    return array
}

export function setSubCase(values, length) {
    var array = {
        id: values.id === undefined ? length+=1 : values.id,
        caseId: values.caseId === undefined ? "" : values.caseId,
        name: values.name === undefined ? "" : values.name,
        gender: values.gender === undefined ? "" : values.gender,
        province: values.province === undefined ? "" : values.province,
        district: values.district === undefined ? "" : values.district,
        commune: values.commune === undefined ? "" : values.commune,
        village: values.village === undefined ? "" : values.village,
        status: values.status === undefined ? "" : values.status,
        relatedInfo: values.relatedInfo === undefined ? "" : values.relatedInfo,
    }

    return array
}

export function setEditSubCase(values) {
    var array = {
        id: values.id,
        caseId: values.caseId === undefined ? "" : values.caseId,
        name: values.name === undefined ? "" : values.name,
        gender: values.gender === undefined ? "" : values.gender,
        province: values.province === undefined ? "" : values.province,
        district: values.district === undefined ? "" : values.district,
        commune: values.commune === undefined ? "" : values.commune,
        village: values.village === undefined ? "" : values.village,
        status: values.status === undefined ? "" : values.status,
        relatedInfo: values.relatedInfo === undefined ? "" : values.relatedInfo,
    }

    return array
}

export function setUser(values, length) {
    var array = {
        id: values.id === undefined ? length+=1 : values.id,
        username: values.username,
        role: values.role,
        tel: values.tel,
        note: values.note,
       
    }

    return array
}