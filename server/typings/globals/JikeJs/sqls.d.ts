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
        del: "delete from account where account_id in (?)",
        /**
* 修改信息

*/
        update: "update account set ?"
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
        del: "delete from department where dept_id in (?);",
        /**
* 获取所有的系

*/
        list: "select * from department",
        /**
* 获取条数

*/
        total: "select count(*) as total from department"
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
    },
    teacher: {
        /**
* 添加教师

*/
        creater: "insert into teacher set ?;",
        /**
* 获取所有教师信息

*/
        list: "SELECT teacher.account_id AS id, department.dept_id AS dept, department.`dept_name`, name, type, account, gender, _c, _d FROM teacher join account ON teacher.account_id = account.account_id join department ON teacher.dept_id = department.dept_id",
        /**
* 获取条数

*/
        total: "SELECT count(teacher_id) AS total FROM teacher JOIN account ON teacher.account_id = account.account_id join department ON teacher.dept_id = department.dept_id",
        /**
* 修改系

*/
        update: "update teacher set ? where ?;",
        /**
* 删除系

*/
        del: "delete from teacher where account_id in (?);"
    }
}