const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "yasin",
  password: "Yeeain404",
  database: "languages",
});

export function connectDB() {
  db.connect((err: Error) => {
    if (err) throw err;
    console.log("DB Connected");
  });
}

export async function addTranslation(
  src: string,
  dest: string,
  srcText: string,
  destText: string
) {
  const createIfNotExists = `CREATE TABLE IF NOT EXISTS ${dest} (id int AUTO_INCREMENT, origin TEXT NOT NULL, source TEXT NOT NULL, translation TEXT NOT NULL, PRIMARY KEY (id))`;
  const insertData = `INSERT INTO ${dest} (origin, source, translation) VALUES ("${src}", "${srcText}","${destText}")`;

  await db.query(createIfNotExists, (err: Error) => {
    if (err) throw err;
  });
  await db.query(insertData, (err: Error) => {
    if (err) throw err;
    return true;
  });
}

export async function getTranslation(dest: string, srcText: string) {
  const getText = `SELECT translation FROM ${dest} WHERE source = "${srcText}";`;
  let result = "";

  await db.query(getText, (err: Error, res: any) => {
    if (err) throw err;
    const data = res[0].translation;
    result = data;
  });
  console.log(result);

  // return result;
}
