2010.03.05
----------

1、sql cmd工具

   python:sqlcmd
      已停止开发，转为sqlshell

      use:
         sqlcmd -d dbserver,oracle,localhost,fauser,fauser

   scala:sqlshell
      http://www.clapper.org/software/scala/sqlshell/
      没运行成功

2009.12.20
----------

1、sqlserver,mysql,oracle,postgresql,一些有用的脚本
其中例子中包括：

    *  用户和角色操作
    *  权限操作
    *  数据库操作
    *  架构操作
    *  表空间操作
    *  表操作
    *  查询操作
    *  试图操作
    *  函数和存储过程操作
    *  触发器操作
    *  索引操作
    *  序列操作
oracle\save\SqlServer_2005.rar,MySql_5.1.rar,Oracle_10g.rar,PostgreSql_8.2.rar

2009.12.08
----------

1、sqlite网络版
http://code.google.com/p/sphivedb/

2009.05.19
-----------

1、Fetch Random rows from Database (MySQL, Oracle, MS SQL, PostgreSQL)

Select random rows in MySQL

Following query will fetch 10 random rows from MySQL.
view plaincopy to clipboardprint?

   1. SELECT column FROM table
   2. ORDER BY RAND()
   3. LIMIT 10

SELECT column FROM table
ORDER BY RAND()
LIMIT 10

Select random rows in Oracle
view plaincopy to clipboardprint?

   1. SELECT column FROM
   2. ( SELECT column FROM table
   3. ORDER BY dbms_random.value )
   4. WHERE rownum <= 10

SELECT column FROM
( SELECT column FROM table
ORDER BY dbms_random.value )
WHERE rownum <= 10

Select random rows in PostgreSQL
view plaincopy to clipboardprint?

   1. SELECT column FROM table
   2. ORDER BY RANDOM()
   3. LIMIT 10

SELECT column FROM table
ORDER BY RANDOM()
LIMIT 10

Select random rows in Microsoft SQL Server
view plaincopy to clipboardprint?

   1. SELECT TOP 10 column FROM table
   2. ORDER BY NEWID()

   --END