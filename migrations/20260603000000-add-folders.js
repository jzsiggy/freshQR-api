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

        // NOTE: the unique { alias } index is intentionally NOT created here.
        // Production has duplicate aliases that must be resolved first; that
        // hardening ships separately once the data is clean (see the
        // "unique-alias" follow-up migration).
    },

    async down(db) {
        const qrcodes = db.collection('qrcodes');
        const folders = db.collection('folders');

        await dropIndexIfExists(qrcodes, 'owner_1_folder_1');
        await dropIndexIfExists(folders, 'owner_1');

        await qrcodes.updateMany({}, { $unset: { folder: '' } });
    },
};
