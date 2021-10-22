"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTranslation = void 0;
const knex = require("knex");
const db = knex({
    client: "sqlite3",
    connection: {
        filename: "../../cache.sqlite3",
    },
});
function addTranslation(src, dest, translation) {
    db.schema.createTableIfNotExists(src, (table) => {
        table.increments("id");
        table.string("origin");
        table.string("translation");
    });
    db(src).insert({
        origin: dest,
        translation: translation,
    });
}
exports.addTranslation = addTranslation;
