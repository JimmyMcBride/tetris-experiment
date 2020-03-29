
-- command to run the script in terminal
-- 🔻 use this command if your terminal is already in the devTools directory
-- 'psql -U postgres -a -f remakeDatabase.sql' or 'yarn remake'

DROP DATABASE IF EXISTS tetris_ts;
DROP ROLE IF EXISTS type_user;

CREATE ROLE type_user
WITH 
  LOGIN
  PASSWORD 'password'
  CREATEDB 
  NOSUPERUSER
  NOCREATEROLE
;

CREATE DATABASE tetris_ts
  WITH 
  OWNER = type_user
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;