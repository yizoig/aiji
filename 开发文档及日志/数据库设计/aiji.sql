/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/10/31 17:35:25                          */
/*==============================================================*/


drop table if exists account;

drop table if exists admin;

drop table if exists department;

drop table if exists group_members;

drop table if exists groups;

drop table if exists student;

drop table if exists task;

drop table if exists task_field;

drop table if exists task_result;

drop table if exists task_result_item;

drop table if exists teacher;

/*==============================================================*/
/* Table: account                                               */
/*==============================================================*/
create table account
(
   account_id           int not null,
   type                 varchar(20),
   account              varchar(20),
   password             varchar(32),
   gender               char,
   _c                   timestamp,
   _d                   tinyint,
   primary key (account_id)
);

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   admin_id             int not null,
   account_id           int,
   primary key (admin_id)
);

/*==============================================================*/
/* Table: department                                            */
/*==============================================================*/
create table department
(
   dept_id              int not null,
   dept_name            varchar(50),
   primary key (dept_id)
);

/*==============================================================*/
/* Table: group_members                                         */
/*==============================================================*/
create table group_members
(
   account_id           int,
   group_id             int,
   _c                   timestamp
);

/*==============================================================*/
/* Table: groups                                                */
/*==============================================================*/
create table groups
(
   group_id             int not null,
   group_name           varchar(20),
   creater              int,
   admins               varchar(20),
   _c                   timestamp,
   type                 tinyint,
   primary key (group_id)
);

/*==============================================================*/
/* Table: student                                               */
/*==============================================================*/
create table student
(
   student_id           int not null,
   account_id           int,
   dept_id              int,
   primary key (student_id)
);

/*==============================================================*/
/* Table: task                                                  */
/*==============================================================*/
create table task
(
   task_id              char(32) not null,
   account_id           int,
   task_title           varchar(20),
   creater              int,
   task_content         int,
   status               tinyint,
   _c                   timestamp,
   group_id             int,
   primary key (task_id)
);

/*==============================================================*/
/* Table: task_field                                            */
/*==============================================================*/
create table task_field
(
   field_id             int not null,
   title                varchar(40) not null,
   description          varchar(255) not null,
   options              varchar(255),
   `default`            varchar(100),
   `require`            tinyint,
   sort                 smallint,
   task_id              char(32),
   primary key (field_id)
);

/*==============================================================*/
/* Table: task_result                                           */
/*==============================================================*/
create table task_result
(
   result_id            int not null,
   task_id              char(32),
   creater              int,
   _c                   timestamp,
   add_ip               char(15),
   primary key (result_id)
);

/*==============================================================*/
/* Table: task_result_item                                      */
/*==============================================================*/
create table task_result_item
(
   field_id             int,
   value                int,
   result_id            int
);

/*==============================================================*/
/* Table: teacher                                               */
/*==============================================================*/
create table teacher
(
   teacher_id           int not null,
   account_id           int,
   dept_id              int,
   primary key (teacher_id)
);

alter table admin add constraint FK_Reference_10 foreign key (admin_id)
      references account (account_id) on delete restrict on update restrict;

alter table group_members add constraint FK_Reference_13 foreign key (account_id)
      references account (account_id) on delete restrict on update restrict;

alter table group_members add constraint FK_Reference_8 foreign key (group_id)
      references groups (group_id) on delete restrict on update restrict;

alter table student add constraint FK_Reference_12 foreign key (account_id)
      references account (account_id) on delete restrict on update restrict;

alter table student add constraint FK_Reference_7 foreign key (dept_id)
      references department (dept_id) on delete restrict on update restrict;

alter table task add constraint FK_Reference_18 foreign key (account_id)
      references account (account_id) on delete restrict on update restrict;

alter table task_field add constraint FK_Reference_11 foreign key (task_id)
      references task (task_id) on delete restrict on update restrict;

alter table task_result add constraint FK_Reference_14 foreign key (task_id)
      references task (task_id) on delete restrict on update restrict;

alter table task_result_item add constraint FK_Reference_15 foreign key (result_id)
      references task_result (result_id) on delete restrict on update restrict;

alter table task_result_item add constraint FK_Reference_16 foreign key (field_id)
      references task_field (field_id) on delete restrict on update restrict;

alter table task_result_item add constraint FK_Reference_17 foreign key (result_id)
      references task_result (result_id) on delete restrict on update restrict;

alter table teacher add constraint FK_Reference_5 foreign key (account_id)
      references account (account_id) on delete restrict on update restrict;

alter table teacher add constraint FK_Reference_9 foreign key (dept_id)
      references department (dept_id) on delete restrict on update restrict;

