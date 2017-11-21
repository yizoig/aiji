declare let sqls: {
    account: {
        /**
* 创建登录

*/
        creater: "insert into accounts set ?;",
        /**
* 获取条数

*/
        total: "select count(*) as total from accounts",
        /**
* 获取登录表信息

*/
        signIn: "select account_id as id, account_name AS name, account_gender AS gender, account_type AS type, account_number AS account, departments.dept_id AS deptId, departments.dept_name AS deptName, _c, _d from accounts join departments on departments.dept_id = accounts.dept_id where account_number = ? and account_pwd = ?",
        /**
* 删除数据

*/
        del: "delete from accounts where account_id in (?)",
        /**
* 修改信息

*/
        update: "update accounts set ? where account_id = ?",
        /**
* 获取用户信息

*/
        info: "select account_id as id, account_name AS name, account_gender AS gender, account_type AS type, account_number AS account, account_pwd AS password, dept_id AS deptId, _c, _d from accounts where account_id = ?",
        /**
* 获取用户基本信息

*/
        baseInfo: "select account_id as id, account_name AS name, account_gender AS gender, account_type AS type, account_number AS account, departments.dept_id AS deptId, departments.dept_name AS deptName, _c, _d from accounts join departments on departments.dept_id = accounts.dept_id where account_id = ?"
    },
    department: {
        /**
* 添加系

*/
        creater: "insert into departments set ?;",
        /**
* 修改系

*/
        update: "update departments set ? where ?;",
        /**
* 删除系

*/
        del: "delete from departments where dept_id in (?);",
        /**
* 获取所有的系

*/
        list: "select * from departments",
        /**
* 获取条数

*/
        total: "select count(*) as total from departments"
    },
    group: {
        /**
* 创建群

*/
        creater: "insert into groups(group_name,group_creater,group_type,_c) values (?)",
        /**
* 修改群信息

*/
        update: "update groups set ?",
        /**
* 获取群信息

*/
        info: "select groups.group_id as id,group_name as name,group_type type,group_creater as creater,_c from groups where group_id = ?"
    },
    student: {
        /**
* 添加学生

*/
        creater: "insert into students set ?;",
        /**
* 获取所有学生信息

*/
        list: "SELECT students.account_id AS id, departments.dept_id AS deptId, dept_name AS deptName, account_name AS name, account_type AS type, account_number AS account, account_gender AS gender, _c, _d FROM students join accounts ON students.account_id = accounts.account_id join departments ON accounts.dept_id = departments.dept_id",
        /**
* 获取条数

*/
        total: "SELECT count(student_id) AS total FROM students JOIN accounts ON students.account_id = accounts.account_id join departments ON accounts.dept_id = departments.dept_id",
        /**
* 修改系

*/
        update: "update students set ? where ?;",
        /**
* 删除系

*/
        del: "delete from students where account_id in (?);"
    },
    teacher: {
        /**
* 添加教师

*/
        creater: "insert into teachers set ?;",
        /**
* 获取所有教师信息

*/
        list: "SELECT teachers.account_id AS id, departments.dept_id AS deptId, dept_name AS deptName, account_name AS name, account_type AS type, account_number AS account, account_gender AS gender, _c, _d FROM teachers join accounts ON teachers.account_id = accounts.account_id join departments ON accounts.dept_id = departments.dept_id",
        /**
* 获取条数

*/
        total: "SELECT count(teacher_id) AS total FROM teachers JOIN accounts ON teachers.account_id = accounts.account_id join departments ON departments.dept_id = accounts.dept_id",
        /**
* 修改系

*/
        update: "update teachers set ? where ?;",
        /**
* 删除系

*/
        del: "delete from teachers where account_id in (?);"
    }
}