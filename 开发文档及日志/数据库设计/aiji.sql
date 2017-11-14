/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/11/14 16:56:51                          */
/*==============================================================*/


drop table if exists accounts;

drop table if exists admins;

drop table if exists departments;

drop table if exists group_members;

drop table if exists groups;

drop table if exists students;

drop table if exists task_fields;

drop table if exists task_result_items;

drop table if exists task_results;

drop table if exists tasks;

drop table if exists teachers;

/*==============================================================*/
/* Table: accounts                                              */
/*==============================================================*/
create table accounts
(
   account_id           int not null auto_increment,
   account_type         varchar(20),
   account_number       varchar(20),
   account_pwd          varchar(32),
   dept_id              int,
   account_name         varchar(30),
   account_gender       char,
   _c                   int,
   _d                   tinyint default 0,
   primary key (account_id)
);

/*==============================================================*/
/* Table: admins                                                */
/*==============================================================*/
create table admins
(
   admin_id             int not null auto_increment,
   account_id           int,
   primary key (admin_id)
);

/*==============================================================*/
/* Table: departments                                           */
/*==============================================================*/
create table departments
(
   dept_id              int not null auto_increment,
   dept_name            varchar(50),
   primary key (dept_id)
);

/*==============================================================*/
/* Table: group_members                                         */
/*==============================================================*/
create table group_members
(
   group_id             int not null,
   account_id           int not null,
   _c                   int,
   primary key (group_id, account_id)
);

/*==============================================================*/
/* Table: groups                                                */
/*==============================================================*/
create table groups
(
   group_id             int not null auto_increment,
   group_name           varchar(20),
   group_creater        int,
   group_type           char(6),
   _c                   int,
   _d                   tinyint default 0,
   primary key (group_id)
);

/*==============================================================*/
/* Table: students                                              */
/*==============================================================*/
create table students
(
   student_id           int not null auto_increment,
   account_id           int,
   primary key (student_id)
);

/*==============================================================*/
/* Table: task_fields                                           */
/*==============================================================*/
create table task_fields
(
   field_id             int not null auto_increment,
   field_title          varchar(40) not null,
   field_desc           varchar(255) not null,
   field_options        varchar(255),
   field_default_value  varchar(100),
   field_required       tinyint,
   field_sort           smallint,
   task_id              char(32),
   primary key (field_id)
);

/*==============================================================*/
/* Table: task_result_items                                     */
/*==============================================================*/
create table task_result_items
(
   field_id             int not null,
   result_id            int not null,
   value                int,
   primary key (field_id, result_id)
);

/*==============================================================*/
/* Table: task_results                                          */
/*==============================================================*/
create table task_results
(
   result_id            int not null auto_increment,
   task_id              char(32),
   result_creater       int,
   result_ip            char(15),
   _c                   int,
   primary key (result_id)
);

/*==============================================================*/
/* Table: tasks                                                 */
/*==============================================================*/
create table tasks
(
   task_id              char(32) not null,
   task_title           varchar(20),
   task_creater         int,
   task_content         int,
   task_status          tinyint default 0,
   group_id             int,
   _c                   int,
   _d                   tinyint default 0,
   primary key (task_id)
);

/*==============================================================*/
/* Table: teachers                                              */
/*==============================================================*/
create table teachers
(
   teacher_id           int not null auto_increment,
   account_id           int,
   primary key (teacher_id)
);

alter table accounts add constraint fk_reference_20 foreign key (dept_id)
      references departments (dept_id) on delete restrict on update restrict;

alter table admins add constraint fk_reference_10 foreign key (account_id)
      references accounts (account_id) on delete restrict on update restrict;

alter table group_members add constraint fk_reference_13 foreign key (account_id)
      references accounts (account_id) on delete restrict on update restrict;

alter table group_members add constraint fk_reference_8 foreign key (group_id)
      references groups (group_id) on delete restrict on update restrict;

alter table groups add constraint fk_reference_21 foreign key (group_creater)
      references accounts (account_id) on delete restrict on update restrict;

alter table students add constraint fk_reference_12 foreign key (account_id)
      references accounts (account_id) on delete restrict on update restrict;

alter table task_fields add constraint fk_reference_11 foreign key (task_id)
      references tasks (task_id) on delete restrict on update restrict;

alter table task_result_items add constraint fk_reference_15 foreign key (field_id)
      references task_fields (field_id) on delete restrict on update restrict;

alter table task_result_items add constraint fk_reference_16 foreign key (result_id)
      references task_results (result_id) on delete restrict on update restrict;

alter table task_results add constraint fk_reference_14 foreign key (task_id)
      references tasks (task_id) on delete restrict on update restrict;

alter table task_results add constraint fk_reference_19 foreign key (result_creater)
      references accounts (account_id) on delete restrict on update restrict;

alter table tasks add constraint fk_reference_18 foreign key (task_creater)
      references accounts (account_id) on delete restrict on update restrict;

alter table tasks add constraint fk_reference_22 foreign key (group_id)
      references groups (group_id) on delete restrict on update restrict;

alter table teachers add constraint fk_reference_5 foreign key (account_id)
      references accounts (account_id) on delete restrict on update restrict;

