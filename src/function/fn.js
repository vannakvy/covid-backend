export function convertToDistrict(data) {
    var item = []
    data.map(load => {
        return item.push({ id: load.district, title: load.district })
    })

    return item
}

export function convertToCommune(distict, data) {
    var item = []
    data.map(load => {
        if (distict === load.district) {
            return (item.push({ id: load.commune, title: load.commune }))
        }
        return null
    })

    return item
}

export function convertToVillage(commune, data) {
    var item = []
    data.map(load => {
        if (commune === load.commune) {
            item.push({ id: load.village, title: load.village })
        }
        return null
    })

    return item
}

export function getRelated(e, condition) {
    var i = 0
    if (e) {
        e.map(load => {
            if (load.direct === condition) {
                i += 1
            }
            return null
        })
    }

    return i
}

export function getRoles(e) {
    var txt = ""
    e.map(load => {
        txt += load.role + ", "
    })
    return txt
}

export function getFullNamePersonInCharge(e) {
    var txt = ""
    e.map(load => {
        txt += load.firstName + " " + load.lastName
    })
    return txt
}

export function convertEditData(e) {
    var array = []
    for (let [key, value] of Object.entries(e)) {
        array.push(
            {
                "name": [
                    key
                ],
                "value": value
            }
        )
    }
    return array
}

export function keyMenu(e){
    const myArr = e.split("/");
    let x = ""

    if(myArr[1] === 'people' || myArr[1] === 'subPeople'){
        x="/people"
    }

    else if(myArr[1] === 'case' || myArr[1] === 'subCase'){
        x="/case"
    }

    else if(myArr[1] === 'quarantine' || myArr[1] === 'subQuarantine'){
        x="/quarantine"
    }

    else if(myArr[1] === 'hospital' || myArr[1] === 'subHospital'){
        x="/hospital"
    }

    else if(myArr[1] === 'specifylocation' || myArr[1] === 'location'){
        x="/specifylocation"
    }

    else if(myArr[1] === 'interview' || myArr[1] === 'subInterview'){
        x="/interview"
    }

    else if(myArr[1] === 'user'){
        x="/user"
    }

    else if(myArr[1] === 'reportdaily'){
        x="/reportdaily"
    }

    else{
        x="/"
    }
    
    return x
}

