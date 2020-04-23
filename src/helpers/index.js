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