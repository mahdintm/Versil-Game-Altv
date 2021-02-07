import SQL from '../db/database.mjs';
import { Account } from '../db/entities/data.mjs';
const security = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
const pInfo = {}

export function loginData(id, data) {
    pInfo[id] = data[0];
}

export function getData(id, data) {
    return pInfo[0]["pName"]
}

export function setData(id, data, value) {
    pInfo[id][data] = value;
    mysqlupdate(id, data, value)
}

function mysqlupdate(id, data, value) {
    if (data == "pName") {
        security.updatePartialData(vg.getplayerid(id), { pName: value }, Account, res => {})
    } else if (data == "pPassword") {
        security.updatePartialData(vg.getplayerid(id), { pPassword: value }, Account, res => {})
    } else if (data == "pSkin") {
        security.updatePartialData(vg.getplayerid(id), { pSkin: value }, Account, res => {})
    } else if (data == "pHouse") {
        security.updatePartialData(vg.getplayerid(id), { pHouse: value }, Account, res => {})
    } else if (data == "pAdmin") {
        security.updatePartialData(vg.getplayerid(id), { pAdmin: value }, Account, res => {})
    } else if (data == "pLeader") {
        security.updatePartialData(vg.getplayerid(id), { pLeader: value }, Account, res => {})
    }
}

export default { getData, setData, loginData };