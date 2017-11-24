const config = {
    debug: true,
    db: {
        host: 'management-tool-rds.c6s85gxranj0.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
        user: 'jjubei0504',
        password: '2017manager^^*',
        database: 'management_tool',
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
            idle: 10000
        }
    }
};

module.exports = config;