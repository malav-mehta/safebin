export type TPaste = {
  short_link: string;
  created_at: number;
  expiration_time: number;
  has_password: boolean;
  password: string;
  read_count: number;
  title: string;
  language: string;
  paste_path: string;
};

const schema = {
  TableName: "Pastes",
  KeySchema: [
    {
      AttributeName: "short_link",
      KeyType: "HASH",
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: "short_link",
      AttributeType: "S",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

const create = (paste: TPaste) => {
  return {
    TableName: schema.TableName,
    Item: paste,
  };
};

const read = (short_link: string) => {
  return {
    TableName: schema.TableName,
    Key: {
      short_link,
    },
  };
};

const update = ({
  short_link,
  updateExpression,
  expressionAttributes,
}: {
  short_link: string;
  updateExpression: string;
  expressionAttributes: any;
}) => {
  return {
    TableName: schema.TableName,
    Key: {
      short_link,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributes,
    ReturnValues: "UPDATED_NEW",
  };
};

const del = (short_link: string) => {
  return {
    TableName: schema.TableName,
    Key: {
      short_link,
    },
  };
};

export default {
  schema,
  create,
  read,
  update,
  del,
};
