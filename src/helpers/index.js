export const actionCreator = type => {
    return payload => {
        return {
            type,
            payload,
        }
    }
}

export const getData = async url => {
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error()
    }
    const data = await response.json()
    return data
} 

export const copyOneEl = (n, item) => {
    const newArr = []
    for (let i = 0; i < n; i++) {
        newArr.push(item)
    }
    return newArr
}

export const getRandomIndex = max => {
    let rand = 0 - 0.5 + Math.random() * (max + 1);
    return Math.round(rand);
  }

export const getFormatedDate = (mls = new Date()) => {
    const date = new Date(mls)

    let dd = date.getDate()
    if (dd < 10) dd = '0' + dd

    let mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm

    let yy = date.getFullYear() % 100
    if (yy < 10) yy = '0' + yy

    let hh = date.getHours()
    if (hh < 10) hh = '0' + hh

    let min = date.getHours()
    if (min < 10) min = '0' + min

    return `${hh}:${min} ${dd}.${mm}.${yy}`

}