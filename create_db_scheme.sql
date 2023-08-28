CREATE DATABASE miarkui;

USE miarkui;

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

INSERT INTO role (name) VALUE ("ADMIN");
INSERT INTO role (name) VALUE ("USER");

CREATE TABLE userRouter (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(512) NOT NULL,

    UNIQUE(username),
    UNIQUE(email)
);

CREATE TABLE user_role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES userRouter(id),

    FOREIGN KEY (role_id)
        REFERENCES role(id)
);

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

INSERT INTO category (name) VALUE ("MOVIE");
INSERT INTO category (name) VALUE ("BOOK");
INSERT INTO category (name) VALUE ("GAME");

CREATE TABLE subject (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,

    FOREIGN KEY (category_id)
        REFERENCES category(id)
);

CREATE TABLE rating (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rating SMALLINT NOT NULL,
    subject_id INT NOT NULL,
    user_id INT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES userRouter(id),

    FOREIGN KEY (subject_id)
        REFERENCES subject(id)
);

CREATE TABLE review (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    subject_id INT NOT NULL,
    user_id INT NOT NULL,
    text TEXT NOT  NULL,

    FOREIGN KEY (subject_id)
        REFERENCES subject(id),

    FOREIGN KEY (user_id)
        REFERENCES userRouter(id)
);

CREATE TABLE image (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(1000) NOT NULL,
    review_id INT NOT NULL,

    FOREIGN KEY (review_id)
        REFERENCES review(id)
);

CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text TEXT,
    user_id INT NOT NULL,
    review_id INT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES userRouter(id),

    FOREIGN KEY (review_id)
        REFERENCES review(id)
);

CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    review_id INT NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES userRouter(id),

    FOREIGN KEY (review_id)
        REFERENCES review(id)
);

CREATE TABLE tag(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE tag_review (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_id INT NOT NULL,
    review_id INT NOT NULL,

    FOREIGN KEY (tag_id)
        REFERENCES tag(id),

    FOREIGN KEY (review_id)
        REFERENCES review(id)
);

