CREATE DATABASE IF NOT EXISTS app;
USE app;
CREATE TABLE account
(
    account_id   CHAR(36) PRIMARY KEY,
    name         TEXT    NOT NULL,
    email        TEXT    NOT NULL,
    cpf          TEXT    NOT NULL,
    car_plate    TEXT    NULL,
    is_passenger BOOLEAN NOT NULL DEFAULT FALSE,
    is_driver    BOOLEAN NOT NULL DEFAULT FALSE
);