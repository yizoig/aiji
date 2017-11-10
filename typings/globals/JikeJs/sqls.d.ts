declare let sqls: {
    account: {
        /**
* 创建登录

*/
        creater: "insert into account set ?;",
        /**
* 获取条数

*/
        total: "select count(*) as total from account",
        /**
* 获取登录表信息

*/
        list: "select * from account",
        /**
* 删除数据

*/
        del: "delete from account where account_id in (?)"
    },
    department: {
        /**
* 添加系

*/
        creater: "insert into department set ?;",
        /**
* 修改系

*/
        update: "update department set ? where ?;",
        /**
* 删除系

*/
        del: "delete from department where dept_id in (?);"
    },
    student: {
        /**
* 添加学生

*/
        creater: "insert into student set ?;",
        /**
* 获取所有学生信息

*/
        list: "SELECT student.account_id AS id, department.dept_id AS dept, department.`dept_name`, name, type, account, gender, _c, _d FROM student join account ON student.account_id = account.account_id join department ON student.dept_id = department.dept_id",
        /**
* 获取条数

*/
        total: "SELECT count(student_id) AS total FROM student JOIN account ON student.account_id = account.account_id join department ON student.dept_id = department.dept_id",
        /**
* 修改系

*/
        update: "update student set ? where ?;",
        /**
* 删除系

*/
        del: "delete from student where account_id in (?);"
    }
}