// Adds the folders feature to an existing database:
//  - backfills `folder: null` on every QR code (idempotent)
//  - creates the indexes the new query paths rely on
//  - hardens the public-redirect alias lookup with a unique index (guarded)
//
// Reversible and safe to re-run. Codes are never deleted.

async function dropIndexIfExists(collection, indexName) {
    try {
        await collection.dropIndex(indexName);
    } catch (err) {
        // IndexNotFound (code 27) — already gone, ignore.
        if (err.code !== 27 && !/index not found/i.test(err.message)) throw err;
    }
}

module.exports = {
    async up(db) {
        const qrcodes = db.collection('qrcodes');
        const folders = db.collection('folders');

        // 1. Backfill the new field so it exists on every document.
        await qrcodes.updateMany(
            { folder: { $exists: false } },
            { $set: { folder: null } }
        );

        // 2. Indexes for the dashboard query paths.
        await qrcodes.createIndex({ owner: 1, folder: 1 });
        await folders.createIndex({ owner: 1 });

        // 3. Unique alias for the public redirect — but only if data is clean.
        const duplicates = await qrcodes.aggregate([
            { $group: { _id: '$alias', n: { $sum: 1 } } },
            { $match: { n: { $gt: 1 } } },
        ]).toArray();

        if (duplicates.length) {
            throw new Error(
                'Cannot create unique alias index — duplicate aliases exist: ' +
                duplicates.map(d => `${d._id} (x${d.n})`).join(', ') +
                '. Resolve duplicates and re-run.'
            );
        }

        await qrcodes.createIndex({ alias: 1 }, { unique: true });
    },

    async down(db) {
        const qrcodes = db.collection('qrcodes');
        const folders = db.collection('folders');

        await dropIndexIfExists(qrcodes, 'alias_1');
        await dropIndexIfExists(qrcodes, 'owner_1_folder_1');
        await dropIndexIfExists(folders, 'owner_1');

        await qrcodes.updateMany({}, { $unset: { folder: '' } });
    },
};
