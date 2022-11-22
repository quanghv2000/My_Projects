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
        host: 'containers-us-west-72.railway.app',
        port: 6462,
        username: 'root',
        password: 'uQTuENuhlO7r8Q1bg6JD',
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
