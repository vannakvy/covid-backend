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

export function getRelated(e, condition){
    var i = 0
    if(e){
        e.map(load => {
            if(load.direct === condition){
                i+=1
            }
            return null
        })
    }

    return i
}

export function getRoles(e){
    var txt = ""
    e.map(load => {
        txt+=load.role+", "
    })
    return txt
}

export function getFullNamePersonInCharge(e){
    var txt = ""
    e.map(load => {
        txt+=load.firstName+" "+load.lastName
    })
    return txt
}