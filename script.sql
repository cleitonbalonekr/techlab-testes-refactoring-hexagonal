CREATE
DATABASE IF NOT EXISTS app;
USE
app;
CREATE TABLE account
(
    account_id   CHAR(36) PRIMARY KEY,
    name         TEXT    NOT NULL,
    email        TEXT    NOT NULL,
    cpf          TEXT    NOT NULL,
    car_plate    TEXT NULL,
    is_passenger BOOLEAN NOT NULL DEFAULT FALSE,
    is_driver    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE ride
(
    ride_id      CHAR(36),
    passenger_id CHAR(36),
    driver_id    CHAR(36),
    status       TEXT,
    fare         DECIMAL(10, 2),
    distance     DECIMAL(10, 2),
    from_lat     DECIMAL(10, 6),
    from_long    DECIMAL(10, 6),
    to_lat       DECIMAL(10, 6),
    to_long      DECIMAL(10, 6),
    date         TIMESTAMP
);

