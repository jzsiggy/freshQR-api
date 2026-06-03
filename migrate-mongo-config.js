require('dotenv').config();

// migrate-mongo reads the same connection string the app uses (src/assets/db.js).
const config = {
    mongodb: {
        url: process.env.DB_CONNECTIONSTRING,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
    useFileHash: false,
    moduleSystem: 'commonjs',
};

module.exports = config;
