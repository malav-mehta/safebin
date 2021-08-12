import { ddb, p } from "../aws";
import { Paste, TPaste } from "../models";

const createTable = () => {
  ddb.root.createTable(Paste.schema, (err, res) => {
    if (err && err.code !== "ResourceInUseException") {
      console.error(
        `Error creating table ${Paste.schema.TableName}:\n${p(err)}`
      );
    } else {
      console.log(`Table ${Paste.schema.TableName} successfully created.`);
    }
  });
};

const create = (paste: TPaste) => {
  ddb.client.put(Paste.create(paste), (err, res) => {
    if (err) {
      console.error(`Error creating paste:\n${p(err)}`);
      return { has_error: true, error: err };
    } else {
      console.log(`Created paste with link ${paste.short_link}`);
      return { has_error: false, short_link: paste.short_link };
    }
  });
};

const read = (short_link: string) => {
  ddb.client.get(Paste.read(short_link), (err, res) => {
    if (err) {
      console.error(`Error reading link ${short_link}:\n${p(err)}`);
      return { has_error: true, error: err };
    } else {
      console.log(`Reading paste with link ${short_link}`);
      return { has_error: false, paste: res };
    }
  });
};

export default {
  createTable,
  create,
  read,
};
