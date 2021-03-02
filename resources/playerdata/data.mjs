import * as alt from 'alt';
import SQL from '../db/database.mjs';
import { Account } from '../db/entities/data.mjs';
const security = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
const pInfo = {}

export function loginData(id, data, pname) {
    pInfo[id] = data[0];
    pInfo[id]["pName"] = pname;
}

export function getData(id, data) {
    return pInfo[id][data];
}

export function setData(id, data, value) {
    pInfo[id][data] = value;
    mysqlupdate(id, data, value)
}

function mysqlupdate(id, data, value) {
    if (data == "pName") {
        security.updatePartialData(getData(id, "id"), { pName: value }, Account, res => {})
    } else if (data == "pPassword") {
        security.updatePartialData(getData(id, "id"), { pPassword: value }, Account, res => {})
    } else if (data == "pSkin") {
        security.updatePartialData(getData(id, "id"), { pSkin: value }, Account, res => {})
    } else if (data == "pHouse") {
        security.updatePartialData(getData(id, "id"), { pHouse: value }, Account, res => {})
    } else if (data == "pAdmin") {
        security.updatePartialData(getData(id, "id"), { pAdmin: value }, Account, res => {})
    } else if (data == "pLeader") {
        security.updatePartialData(getData(id, "id"), { pLeader: value }, Account, res => {})
    }
}

export function findbyname(value) {
    for (var i = 0; i < 1000; i++) {
        if (pInfo[i] != undefined) {
            if (pInfo[i]["pName"].toLowerCase() == value.toLowerCase()) {
                return alt.Player.getByID(i);
            }
        }
    }
}

export function getplayername(playerid) {
    return pInfo[playerid]["pName"];
}

export function cleardata(playerid) {
    pInfo[playerid] = undefined;
}

export function getpinfo(playerid) {
    return pInfo[playerid];
}

export default { getData, setData, loginData, findbyname, getplayername, cleardata, getpinfo };