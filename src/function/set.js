import moment from "moment"

export function setCase(values, length) {
    var array = {
        id: values.id === undefined ? length += 1 + "" : values.id,
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
        id: values.id + "",
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
        id: values.id === undefined ? length += 1 + "" : values.id,
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
        id: values.id + "",
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

export function setPeople(values, length) {
    var array = {
        id: values.id === undefined ? length += 1 + "" : values.id,
        idCard: values.idCard === undefined ? "": values.idCard,
        name: values.name === undefined ? "" : values.name,
        gender: values.gender === undefined ? "" : values.gender,
        age: values.age === undefined ? "" : values.age,
        tel: values.tel === undefined ? "" : values.tel,
        job: values.job === undefined ? "" : values.job,
        nationality: values.nationality === undefined ? "" : values.nationality,
        province: values.province === undefined ? "" : values.province,
        district: values.district === undefined ? "" : values.district,
        commune: values.commune === undefined ? "" : values.commune,
        village: values.village === undefined ? "" : values.village,
        remark: values.remark === undefined ? "" : values.remark,
    }

    return array
}

export function setUser(values, length) {
    var array = {
        id: values.id === undefined ? length += 1 + "" : values.id,
        username: values.username,
        role: values.role,
        tel: values.tel,
        note: values.note,
    }

    return array
}

export function setEditUser(values) {
    var array = {
        id: values.id + "",
        username: values.username === undefined ? "" : values.username,
        role: values.role === undefined ? "" : values.role,
        tel: values.tel === undefined ? "" : values.tel,
        note: values.note === undefined ? "" : values.note,
    }
    return array
}

export function setQuarantine(values, length) {
    var array = {
        id: values.id + "",
        quarantineName: values.quarantineName === undefined ? "" : values.quarantineName,
        place: values.place === undefined ? "" : values.place,
        village: values.village === undefined ? "" : values.village,
        commune: values.commune === undefined ? "" : values.commune,
        district: values.district === undefined ? "" : values.district,
        province: values.province === undefined ? "" : values.province,
        inCharge: values.inCharge === undefined ? "" : values.inCharge,
        tel: values.tel === undefined ? "" : values.tel,
        note: values.note === undefined ? "" : values.note,
    }

    return array
}

export function setEditQuarantine(values, length) {
    var array = {
        id: values.id + "",
        quarantineName: values.quarantineName === undefined ? "" : values.quarantineName,
        place: values.place === undefined ? "" : values.place,
        village: values.village === undefined ? "" : values.village,
        commune: values.commune === undefined ? "" : values.commune,
        district: values.district === undefined ? "" : values.district,
        province: values.province === undefined ? "" : values.province,
        inCharge: values.inCharge === undefined ? "" : values.inCharge,
        tel: values.tel === undefined ? "" : values.tel,
        note: values.note === undefined ? "" : values.note,
    }

    return array
}

export function setSubQuarantine(values, length) {
    var array = {
        id: values.id === undefined ? length += 1 + "" : values.id,
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

export function setEditSubQuarantine(values) {
    var array = {
        id: values.id + "",
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

export function setSubHospital(values, length) {
    var array = {
        id: values.id === undefined ? length += 1 + "" : values.id,
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

export function setEditSubHospital(values) {
    var array = {
        id: values.id + "",
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

export function setHospital(values, length) {
    var array = {
        id: values.id + "",
        hospitalName: values.hospitalName === undefined ? "" : values.hospitalName,
        place: values.place === undefined ? "" : values.place,
        village: values.village === undefined ? "" : values.village,
        commune: values.commune === undefined ? "" : values.commune,
        district: values.district === undefined ? "" : values.district,
        province: values.province === undefined ? "" : values.province,
        inCharge: values.inCharge === undefined ? "" : values.inCharge,
        tel: values.tel === undefined ? "" : values.tel,
        note: values.note === undefined ? "" : values.note,
    }

    return array
}

export function setEditHospital(values, length) {
    var array = {
        id: values.id + "",
        hospitalName: values.hospitalName === undefined ? "" : values.hospitalName,
        place: values.place === undefined ? "" : values.place,
        village: values.village === undefined ? "" : values.village,
        commune: values.commune === undefined ? "" : values.commune,
        district: values.district === undefined ? "" : values.district,
        province: values.province === undefined ? "" : values.province,
        inCharge: values.inCharge === undefined ? "" : values.inCharge,
        tel: values.tel === undefined ? "" : values.tel,
        note: values.note === undefined ? "" : values.note,
    }

    return array
}