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
    e.map(load => {
        if(load.relatedInfo === condition){
            i+=1
        }
        return null
    })

    return i
}