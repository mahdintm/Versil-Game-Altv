const pInfo = {}

export function(id, data) {
    pInfo[id] = data[0];
}

export function getData(id, data) {
    return pInfo[0]["pName"]
}

export function setData(id, data, value) {

    pInfo[id][data] = value;

}