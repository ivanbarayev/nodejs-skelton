SELECT 'CREATE DATABASE patika_nodejs_bootcamp'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname = 'patika_nodejs_bootcamp')
\gexec

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    user_title VARCHAR(255) DEFAULT NULL,
    user_name VARCHAR(64) DEFAULT NULL,
    user_pass VARCHAR(64) DEFAULT NULL,
    email VARCHAR(50) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    last_login timestamp(0),
    created_at timestamp(0),
    is_active INT2 DEFAULT 0
);

DROP TABLE IF EXISTS schools CASCADE;
CREATE TABLE schools
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    school_name VARCHAR(255) NOT NULL,
    detail VARCHAR(255) DEFAULT NULL,
    city_id INT8 DEFAULT 0,
    total_class int4 NOT NULL DEFAULT 0,
    created_at timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    created_by INT8 NOT NULL,
    is_active BOOLEAN DEFAULT true
);
COMMENT ON COLUMN schools.total_class IS 'Toplam Sınıf Sayısı';

DROP TABLE IF EXISTS classes CASCADE;
CREATE TABLE classes
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    school_id INT8,
    floor_num INT4 DEFAULT 0,
    class_name VARCHAR(255) NOT NULL,
    detail VARCHAR(255) DEFAULT NULL,
    created_at timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    created_by INT8 NOT NULL,
    is_active BOOLEAN DEFAULT true
);
COMMENT ON COLUMN classes.floor_num IS 'Kat Numarası';

DROP TABLE IF EXISTS sensors CASCADE;
CREATE TABLE sensors
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    school_id INT8,
    class_id INT8,
    sensor_name VARCHAR(255) NOT NULL,
    detail VARCHAR(255) DEFAULT NULL,
    default_protocol VARCHAR(255) NOT NULL,
    default_ip VARCHAR(64) NOT NULL,
    default_port VARCHAR(6) NOT NULL,
    default_channel VARCHAR(6) NOT NULL,
    created_at timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    connected_at timestamp(0) DEFAULT NULL,
    created_by INT8 NOT NULL,
    is_online BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);
COMMENT ON COLUMN sensors.default_protocol IS 'ModBUS, 104';
COMMENT ON COLUMN sensors.is_online IS 'Cihaz Açık mı, Kapalı mı?';

DROP TABLE IF EXISTS log_temperature CASCADE;
CREATE TABLE log_temperature
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    school_id INT8 NOT NULL,
    class_id INT8 NOT NULL,
    sensor_id INT8 NOT NULL,
    sensor_data VARCHAR(10),
    read_at timestamp(0),
    created_at timestamp(0) DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN log_temperature.read_at IS 'Sensor Datasinin Okundugu Tarih';

DROP TABLE IF EXISTS log_air_quality CASCADE;
CREATE TABLE log_air_quality
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    school_id INT8 NOT NULL,
    class_id INT8 NOT NULL,
    sensor_id INT8 NOT NULL,
    sensor_data VARCHAR(10),
    read_at timestamp(0),
    created_at timestamp(0) DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN log_air_quality.read_at IS 'Sensor Datasinin Okundugu Tarih';

DROP TABLE IF EXISTS log_electricity_consumption CASCADE;
CREATE TABLE log_electricity_consumption
(
    id INT8 GENERATED ALWAYS AS IDENTITY,
    school_id INT8 NOT NULL,
    class_id INT8 NOT NULL,
    sensor_id INT8 NOT NULL,
    sensor_data VARCHAR(10),
    read_at timestamp(0),
    created_at timestamp(0) DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN log_electricity_consumption.read_at IS 'Sensor Datasinin Okundugu Tarih';
