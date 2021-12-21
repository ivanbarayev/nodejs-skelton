SELECT 'CREATE DATABASE patika_nodejs_bootcamp'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'patika_nodejs_bootcamp')
\gexec

CREATE TABLE posts (
  name VARCHAR(50),
  post_date timestamp
);

INSERT INTO posts (name, post_date) values ('test', '2019-10-19 23:30:01'),('test2', '2019-10-19 23:32:01');
