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