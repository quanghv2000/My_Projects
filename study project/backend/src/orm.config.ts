import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: true,
    };

    // let ormconfig: TypeOrmModuleOptions = {
    //     name: 'default',
    //     type: 'mysql',
    //     database: 'noi_that',
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: '123456789',
    //     logging: false,
    //     synchronize: true,
    //     entities: commonConf.ENTITIES,
    //     migrations: commonConf.MIGRATIONS,
    //     cli: commonConf.CLI,
    //     migrationsRun: commonConf.MIGRATIONS_RUN,
    // };

    let ormconfig: TypeOrmModuleOptions = {
        name: 'default',
        type: 'mysql',
        database: 'railway',
        host: 'containers-us-west-34.railway.app',
        port: 7179,
        username: 'root',
        password: 'VcSTokMJcFCPYLT4xwk1',
        logging: false,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };

    return ormconfig;
}

export { ormConfig };
