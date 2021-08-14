type TClientPaste = {
  expirationLength: number;
  hasPassword: boolean;
  password: string;
  title: string;
  pasteContent: string;
};

type TServerPaste = {
  password: string;
  paste_path: string;
  expiration_time: number;
  created_at: number;
  language: string;
  title: string;
  short_link: string;
  has_password: boolean;
  read_count: number;
  paste_content: string;
};
