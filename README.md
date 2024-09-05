# WebApp-Contacts

#### Getting started

##### Here are the recommended steps, to start the project on your local machine:

- Clone this repository to your local machine;

- Install the database MariaDB on your local machine;

- Install all dependencies:

  ```
  npm install && cd frontend/ && npm install
  ```

- Create the `.env.development.local` file in the root folder with the following keys and values:

  ```
  HOST=0.0.0.0
  PORT=3000

  DB_HOST=localhost
  DB_PORT=3306
  DB_USER_NAME=root
  DB_USER_PASSWORD=root
  DB_NAME=contactsdatabase
  MARIADB_ROOT_PASSWORD=root
  MARIADB_DATABASE=contactsdatabase
  ```

- Create the `.env.development.local` file in the `frontend` folder with the following keys and values:

  ```
  VITE_API_URL=http://localhost:3000
  ```

- Run the both parts of the project locally in development mode:

  ```
  npm run start:dev
  npm run dev
  ```

- The database will be created automatic with name `contactsdatabase`;

##### Here are the recommended steps, to create and start the project in a docker container on your local machine:

- Clone this repository to your local machine;

- Create the `.env.production` file in the root folder with the following keys and values:

  ```
  HOST=0.0.0.0
  PORT=4000

  DB_HOST=database
  DB_PORT=3306
  DB_USER_NAME=root
  DB_USER_PASSWORD=root
  DB_NAME=contactsdatabase
  MARIADB_ROOT_PASSWORD=root
  MARIADB_DATABASE=contactsdatabase
  ```

- Create the `.env.production` file in the `frontend` folder with the following keys and values:

  ```
  VITE_API_URL=http://localhost:4000
  ```

- Run this command in the root folder of the project:

  ```
  docker compose up --build -d
  ```

- It will be created three docker images with database, backend and frontend parts in the container with name `webapp-contacts`.

---

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://docs.nestjs.com/)
- [MariaDB](https://mariadb.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)
- [React](https://react.dev/)
- [React router](https://reactrouter.com/en/main)
- [React hook form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tanstack Query](https://tanstack.com/)
- [Tanstack Table](https://tanstack.com/table/latest)
- [Lucide Icons](https://lucide.dev/)
- [Docker](https://www.docker.com/)

---

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)
