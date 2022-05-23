## safebin

## About

A safer paste bin clone with client-side AES-256 encryption, password support, syntax highlighting and timed expiration for pastes.

## Running locally

First clone this repository:

```shell
$ git clone https://github.com/malav-mehta/safebin.git
$ cd safebin
```

Next, install the dependencies and build the application:

```shell
$ cd server && yarn && cd ../client && yarn && cd ..
```

Then, start the project by running:

```shell
$ yarn start
```

Finally, open your browser to [localhost:3000](http://localhost:3000) to view the website.

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [AWS (EC2, S3, DynamoDB)](https://aws.amazon.com/)
- [Create-Next-App](https://nextjs.org/docs/api-reference/create-next-app)
- [React-Markdown](https://github.com/remarkjs/react-markdown)

If you find any bugs or have any questions, email me: [malavhmehta@outlook.com](mailto:malavhmehta@outlook.com).
