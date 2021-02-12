import orm from 'typeorm';

export const Account = new orm.EntitySchema({
    name: 'Account',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        pName: {
            type: 'varchar',
            length: 20
        },
        pPassword: {
            type: 'varchar',
            length: 100
        },
        pEmail: {
            type: 'varchar',
        },
        pAdmin: {
            type: 'int',
            default: '0'
        },
        pLeader: {
            type: 'int',
            default: '0',
        },
        pHouse: {
            type: 'int',
            default: '0',
        },
        pSkin: {
            type: 'varchar',
            default: 'mp_m_freemode_01',
        }

    }
});

export const Vehicles = new orm.EntitySchema({
    name: 'Vehicles',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        model: {
            type: 'varchar',
            length: 20
        },
        type: {
            type: 'varchar',
            length: 20
        },
        factionid: {
            type: 'int',
            default: 0
        },
        x: {
            type: 'double'
        },
        y: {
            type: 'double'
        },
        z: {
            type: 'double'
        },
        rx: {
            type: 'double'
        },
        ry: {
            type: 'double'
        },
        rz: {
            type: 'double'
        }

    }
});