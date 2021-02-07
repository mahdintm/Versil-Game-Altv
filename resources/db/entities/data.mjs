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
        pStaff: {
            type: 'int',
            default: '0',
        }

    }
});