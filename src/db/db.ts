const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./cache.db3",
  },
  useNullAsDefault: true,
});

export const createTableIfNotExists = (dest: string) => {
  db.schema
    .createTableIfNotExists(dest, function (t: any) {
      t.string("origin", 32);
      t.string("source", 32);
      t.string("translation", 32);
    })
    .then((res: any) => {});
};

export const addTranslation = (
  src: string,
  dest: string,
  srcText: string,
  destText: string
) => {
  db(dest)
    .insert({
      origin: src,
      source: srcText,
      translation: destText,
    })
    .then((res: any) => {});
};

export const getTranslation = (dest: string, srcText: string) => {
  let result;
  result = db(dest).select("translation").where("source", srcText);
  return result;
};
