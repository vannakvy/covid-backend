export function convertToDistrict(data) {
    var item = []
    data.map(load => {
        item.push({ id: load.district, title: load.district })
    })

    return item
}

export function convertToCommune(distict, data) {
    var item = []
    data.map(load => {
        if (distict === load.district) {
            item.push({ id: load.commune, title: load.commune })
        }
    })

    return item
}

export function convertToVillage(commune, data) {
    var item = []
    data.map(load => {
        if (commune === load.commune) {
            item.push({ id: load.village, title: load.village })
        }
    })

    return item
}