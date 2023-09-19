
use artale;

set global time_zone = 'Asia/Seoul';
set session time_zone = 'Asia/Seoul';

create table user
(
    id         int auto_increment
        primary key,    created_at datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    deleted_at datetime(6)                              null,
    balance    int         default 0                    not null,
    nickname   varchar(255)                             not null,
    constraint IDX_e2364281027b926b879fa2fa1e
        unique (nickname)
);

create table item
(
    id         int auto_increment
        primary key,    created_at datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    deleted_at datetime(6)                              null,
    name       varchar(255)                             not null,
    userId     int                                      null
);

create table trade
(
    id         int auto_increment
        primary key,    created_at datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    deleted_at datetime(6)                              null,
    price      int                                      not null,
    sold_at    datetime                                 null,
    buyer_id   int                                      null,
    seller_id  int                                      null,
    item_id    int                                      null,
    constraint REL_e5148c14d539b8d76b3cb1daf3
        unique (item_id)
);

INSERT artale.user (created_at, updated_at, deleted_at, balance, nickname) VALUES (DEFAULT, DEFAULT, null, DEFAULT, 'user1');
INSERT artale.user (created_at, updated_at, deleted_at, balance, nickname) VALUES (DEFAULT, DEFAULT, null, DEFAULT, 'user2');
INSERT artale.user (created_at, updated_at, deleted_at, balance, nickname) VALUES (DEFAULT, DEFAULT, null, DEFAULT, 'user3');

INSERT INTO artale.item (created_at, updated_at, deleted_at, name, userId) VALUES (DEFAULT, DEFAULT, null, 'item1', 1);
INSERT INTO artale.item (created_at, updated_at, deleted_at, name, userId) VALUES (DEFAULT, DEFAULT, null, 'item2', 1);
INSERT INTO artale.item (created_at, updated_at, deleted_at, name, userId) VALUES (DEFAULT, DEFAULT, null, 'item3', 2);
INSERT INTO artale.item (created_at, updated_at, deleted_at, name, userId) VALUES (DEFAULT, DEFAULT, null, 'item4', 2);
INSERT INTO artale.item (created_at, updated_at, deleted_at, name, userId) VALUES (DEFAULT, DEFAULT, null, 'item5', 3);
INSERT INTO artale.item (created_at, updated_at, deleted_at, name, userId) VALUES (DEFAULT, DEFAULT, null, 'item6', 3);