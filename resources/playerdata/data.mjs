import * as alt from 'alt';
import SQL from '../db/database.mjs';
import { Account } from '../db/entities/data.mjs';
const security = new SQL('mysql', '127.0.0.1', 3306, 'Mahdi', 'Waezakmi2new3mahdi', 'alt', [Account]);
const pInfo = {}


alt.on('anyResourceStart', (name) => {
    if (name == "playerdata") {
        alt.setTimeout(() => {
            for (var i = 0; i < 1000; i++) {
                pInfo[i]["pName"] = undefined;
            }
        }, 2000);
    }
})



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

export function findbyname(player, value) {
    for (var i = 0; i < 1000; i++) {
        console.log(player.id);
        console.log(i)
        console.log(getData(i, "pName"));
        // if (a == value) {
        //     console.log(pInfo[i]["pName"]);
        // }
        // if (pInfo[i]["pName"].toLowerCase() == value.toLowerCase()) {
        //     return alt.Player.getByID(i);;
        // }
    }
}


export default { getData, setData, loginData, findbyname };