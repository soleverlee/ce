create table if not exists card_item (
    card_id integer primary key autoincrement,
    title varchar(100) not null,
    description text,
    card_status integer,
    create_time integer
);

create table if not exists category (
    name varchar(100) not null primary key,
    parent_category varchar(100)
);

create table if not exists card_status (
    card_status integer primary key not null,
    display integer default 1,
    name varchar(100) not null
);

insert into card_status (card_status, display, name)
values
(-1, 0, '已删除'),
(0, 1, '待实施'),
(1, 1, '正在进行'),
(2, 1, '已完成'),
(3, 1, '搁置');

insert into category (parent_category, name)
values
(null, '编程语言'),
(null, '操作系统'),
(null, '数据结构与算法'),
(null, 'APP开发'),
(null, '分布式高并发'),
(null, '数据库'),
(null, '系统架构'),
(null, '工具'),
(null, 'TeX'),
('编程语言', 'Java'),
('编程语言', 'C/C++'),
('编程语言', 'C#'),
('编程语言', 'Python'),
('编程语言', 'Rust'),
('Java', 'NIO'),
('Java', '集合类'),
('Java', 'JVM相关'),
('JVM相关', '垃圾回收'),
('JVM相关', 'JVM性能监控及调优'),
('操作系统', 'Linux/Unix'),
('数据结构与算法', '排序算法'),
('数据结构与算法', 'BTree'),
('APP开发', 'Android'),
('APP开发', 'IOS'),
('APP开发', 'React'),
('APP开发', 'Flutter'),
('分布式高并发', '分布式事务'),
('分布式事务', '2PC'),
('分布式事务', '3PC'),
('分布式事务', 'Paxos'),
('分布式事务', 'Raft'),
('分布式高并发', '缓存'),
('数据库', 'MySQL'),
('数据库', 'MongoDB'),
('数据库', 'Redis'),
('数据库', 'PostgreSQL'),
('系统架构', '微服务架构'),
('系统架构', 'SOA'),
('工具', 'GIT'),
('工具', 'VIM')
;

insert into card_item(card_id, title, description, create_time, card_status)
values
(1, 'Okapia APP开发', '完成基本的应用功能呢', 1581830469, 0),
(2, 'Btree的Java实现', '实现增删改查', 1581830469, 1),
(3, '一个TODO LIST的应用', '使用Angular和NodeJS完成一个TODO LIST应用', 1581830469, 1),
(4, 'Redis学习', '学习Redis的基本知识', 1581830469, 2),
(5, 'Rust学习', '使用Rust完成一个JVM引擎', 1581830469, 3)
;
