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
        caseName: values.caseName,
        date: moment(values.date),
        related: values.related === undefined ? 0 : values.related,
        province: values.province === undefined ? "" : values.province,
        district: values.district === undefined ? "" : values.district,
        commune: values.commune === undefined ? "" : values.commune,
        village: values.village === undefined ? "" : values.village,
        other: values.other,
        long: values.long === undefined ? "" : values.long,
        lat: values.lat === undefined ? "" : values.lat,
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
        idCard: values.idCard === undefined ? "" : values.idCard,
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
        firstName: values.firstName === undefined ? "" : values.firstName,
        lastName: values.lastName === undefined ? "" : values.lastName,
        role: values.roles.role,
        tel: values.tel,
        email: values.email,
    }

    return array
}

export function setEditUser(values) {
    const data = values.roles

    console.log(data)

    var array = {
        id: values.id + "",
        username: values.username === undefined ? "" : values.username,
        firstName: values.firstName === undefined ? "" : values.firstName,
        lastName: values.lastName === undefined ? "" : values.lastName,
        role: values.role === undefined ? "" : values.role,
        tel: values.tel === undefined ? "" : values.tel,
        email: values.email === undefined ? "" : values.email,
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

// export function setEditQuarantine(values, length) {
//     var array = {
//         id: values.id + "",
//         quarantineName: values.quarantineName === undefined ? "" : values.quarantineName,
//         place: values.place === undefined ? "" : values.place,
//         village: values.village === undefined ? "" : values.village,
//         commune: values.commune === undefined ? "" : values.commune,
//         district: values.district === undefined ? "" : values.district,
//         province: values.province === undefined ? "" : values.province,
//         inCharge: values.inCharge === undefined ? "" : values.inCharge,
//         tel: values.tel === undefined ? "" : values.tel,
//         note: values.note === undefined ? "" : values.note,
//     }

//     return array
// }

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
    console.log(values)
    var array = {
        date_in: moment(values.date_in),
        date_out: moment(values.date_out),
        in: values.in,
        others: values.others,
        personalInfo: values?.personalInfo?.id,
        personalType:values.personalType
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

export function setAddQuarantine(values) {
    var array = {
        locationName: values.locationName,
        village: values.village,
        commune: values.commune,
        district: values.district,
        province: values.province,
        long: parseFloat(values.long),
        lat: parseFloat(values.lat),
        other: values.other,
        firstName: values.firstName,
        lastName: values.lastName,
        position: values.position,
        tel: values.tel,
        others: values.others,
    }
    return array
}

export function setAddHospital(values) {
    var array = {
        hospitalName: values.hospitalName,
        village: values.village,
        commune: values.commune,
        district: values.district,
        province: values.province,
        long: parseFloat(values.long),
        lat: parseFloat(values.lat),
        other: values.other,
        firstName: values.firstName,
        lastName: values.lastName,
        position: values.position,
        others: values.otehrs,
        tel: values.tel,

    }
    return array
}

export function setAddPeople(values) {
    var array = {
        firstName:values.firstName,
        lastName:values.lastName,
        age:parseInt(values.age),
        gender:values.gender,
        tel:values.tel,
        nationality:values.nationality,
        occupation:values.occupation,
        idCard:values.idCard,
        village: values.village === undefined ? "" : values.village,
        commune: values.commune === undefined ? "" : values.commune,
        district: values.district === undefined ? "" : values.district,
        province: values.province === undefined ? "" : values.province,
        case:values.case,
        direct:values.direct,
        other:values.other,
        vaccinated:parseInt(values.vaccinated),
    }
    return array
}

export function setAddSubQuarantine(values){
    var array= {
        date_in: moment(values.date_in).format(),
        date_out: moment(values.date_out).format(),
        in: values.in,
        others: values.others,
        personalInfo: values.personalInfo,
        personalType:values.personalType
    }
    return array;
}

export function setEditQuarantine(values){
    var array ={
        lat: values.lat,
        capacity: values.capacity,
        createdAt: values.createdAt,
        locationName:values.locationName,
        long:values.long,
        other:values.other,
        tel:values?.personInCharge?.tel,
        firstName:values?.personInCharge?.firstName, 
        lastName:values?.personInCharge?.lastName, 
        position:values?.personInCharge?.position, 
        others:values?.personInCharge?.others,
        village: values.village === undefined ? "" : values.village,
        commune: values.commune === undefined ? "" : values.commune,
        district: values.district === undefined ? "" : values.district,
        province: values.province === undefined ? "" : values.province,
    }

    return array;
}
