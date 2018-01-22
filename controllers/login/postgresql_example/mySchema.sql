DROP DATABASE IF EXISTS baggage_db;
CREATE DATABASE baggage_db;
USE baggage_db;

CREATE TABLE oauth_tokens (
    id INT NOT NULL,
    access_token VARCHAR(254) NOT NULL,
    access_token_expires_on timestamp NOT NULL,
    client_id VARCHAR(254) NOT NULL,
    refresh_token VARCHAR(254) NOT NULL,
    refresh_token_expires_on timestamp NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- Name: oauth_clients; Type: TABLE; Schema: public; Owner: -; Tablespace:
CREATE TABLE oauth_clients (
    client_id VARCHAR(254) NOT NULL,
    client_secret VARCHAR(254) NOT NULL,
    redirect_uri VARCHAR(254) NOT NULL,
    PRIMARY KEY (client_id, client_secret)
);

-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace:
CREATE TABLE users (
    id INT NOT NULL,
    username VARCHAR(254) NOT NULL,
    password VARCHAR(254) NOT NULL,
    PRIMARY KEY (id)
);


-- Name: users_username_password; Type: INDEX; Schema: public; Owner: -; Tablespace:
-- CREATE INDEX users_username_password ON users USING btree (username, password);

