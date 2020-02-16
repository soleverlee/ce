create table if not exists card_item (
    card_id integer primary key autoincrement,
    title varchar(100) not null,
    description text,
    card_status integer,
    create_time integer
);

create table if not exists category (
    category_id integer primary key autoincrement,
    name varchar(100) not null,
    parent_category_id integer
);

create table if not exists card_status (
    card_status integer primary key not null,
    name varchar(100) not null
);

insert into card_status (card_status, name)
values
(-1, "已删除"),
(0, "待实施"),
(1, "正在进行"),
(2, "已完成"),
(3, "搁置");

insert into category (category_id, parent_category_id, name)
values
(1, null, "编程语言"),
(2, 1, "Java"),
(3, 1, "C++"),
(4, null, "数据库"),
(5, null, "TeX"),
(6, null, "分布式")
;

insert into card_item(card_id, title, description, create_time, card_status)
values
(1, "Okapia APP开发", "完成基本的应用功能呢", 1581830469, 0),
(2, "Btree的Java实现", "实现增删改查", 1581830469, 1),
(3, "一个TODO LIST的应用", "使用Angular和NodeJS完成一个TODO LIST应用", 1581830469, 1),
(4, "Redis学习", "学习Redis的基本知识", 1581830469, 2),
(5, "Rust学习", "使用Rust完成一个JVM引擎", 1581830469, 3)
;
