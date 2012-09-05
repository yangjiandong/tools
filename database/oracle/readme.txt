2010.08.25
----------

1、现场导出存储过程

运行sqlplus: sqlplus hcost/123@hcost

set   echo   off;
set   heading   off;
set   feedback   off;
spool   c:\proc.txt

--1、用sys用户等陆的话：
select   text   from   dba_source   where   owner= 'YOUR_USER ';
--2、用一般用户（要导出其下存储过程的用户）：
select   text   from   user_source;
spool   off;

2010.05.22
----------

1、导出导入

导出hcost用户的对象
  exp system/manager@dbserver file=d:\hcost.dmp owner=(hcost)

导入
  imp system/manager@dbserver fromuser=hcost touser=hcost file=d:\hcost.dmp


2010.04.29
----------

1、save/sqlplus.export.import.csv.txt

2、oracle 两张表 update

2010.04.03
----------

1、sqlplus导出少量数据为html或者xls
save/sqlplus_export.sql,getdata.sql
如果要导成html,则将sqlplus_export.sql中将emp.xls改为emp.html

sqlplus scott/tiger
@sqlplus_export.sql

可以设置哪些参数？可以在sqlplus 下运行？ set 查看，参数的含义，请参见SQL*Plus User's Guide and Reference Release 10.2

2010.03.11
----------

1.删除表中数据两种方法
         a. delete * from My_Table;
         b. truncate table My_Table;

2.删除整个表
         drop table My_Table;

如何恢复不小心 Drop 掉的表呢,其实 Oracle 中也有类似的 &quot;回收站&quot;

比如不小心删除了表 My_Table
         drop table My_Table;
这个时候再用SELECT语句查询此表时，将会提示表或视图不存在.

但可以用如下语句查询到这个表还在Oracle回收站中：
SELECT * FROM user_recyclebin WHERE original_name='My_Table';

那么现在就可以用如下语句进行恢复：
FLASHBACK TABLE My_Table TO BEFORE DROP;

2010.03.05
----------

1、Oracle 中使用 fetch bulk collect into 批量效率的读取游标数据
   save/fetch_bulk_collect_into.txt

2、oracle10g sys忘记密码

需要注意的是window和Linux下的修改方法虽然基本相同，但是Linux需要切换到oracle用户

   1. window
   2. sqlplus / as sysdba
   3. alter user sys identified by password;

window
sqlplus / as sysdba
alter user sys identified by password;

   1. linux
   2. 切换到Oracle用户
   3. su oracle
   4. sqlplus / as sysdba
   5. alter user sys identified by password;

linux
切换到Oracle用户
su oracle
sqlplus / as sysdba
alter user sys identified by password;

执行完以上命令之后Oracle 10g中的sys密码就被更改为 password了，我们可以使用sqlplus登录Oracle了，执行命令：

   1. sqlplus sys/password as sysdba

sqlplus sys/password as sysdba

注意： sys用户必须以sysdba的身份登录，否则无法登录的说！

3、导出数据到csv
   save/dump_csv.txt

2010.02.24
----------

1、返回字符中指定按分割符分割的字符
   save/sp.txt

2010.02.21
-----------

1、自己写完了存储过程忘了这个过程的内容是什么了，就可以使用oracle的数据词典来查看。
具体如下：select text from user_source where name='TEST';注意你的sql语句name的值必须大写，不然oracle不能识别

2010.02.19
----------

1、Oracle 存储过程返回结果集

CREATE OR REPLACE PACKAGE pkg_test
AS
    TYPE myrctype IS REF CURSOR;

    PROCEDURE get (p_id NUMBER, p_rc OUT myrctype);
END pkg_test;
/

CREATE OR REPLACE PACKAGE BODY pkg_test
AS
    PROCEDURE get (p_id NUMBER, p_rc OUT myrctype)
    IS
       sqlstr   VARCHAR2 (500);
    BEGIN
       IF p_id = 0 THEN
          OPEN p_rc FOR
             SELECT ID, NAME, sex, address, postcode, birthday
               FROM student;
       ELSE
          sqlstr :=
             'select id,name,sex,address,postcode,birthday
            from student where id=:w_id';
          OPEN p_rc FOR sqlstr USING p_id;
       END IF;
    END get;
END pkg_test;
/

函数返回记录集:
建立带ref cursor定义的包和包体及函数：
CREATE OR REPLACE
package pkg_test as
/* 定义ref cursor类型
    不加return类型，为弱类型，允许动态sql查询，
    否则为强类型，无法使用动态sql查询;
*/
   type myrctype is ref cursor;

--函数申明
   function get(intID number) return myrctype;
end pkg_test;
/

CREATE OR REPLACE
package body pkg_test as
--函数体
    function get(intID number) return myrctype is
      rc myrctype;  --定义ref cursor变量
      sqlstr varchar2(500);
    begin
      if intID=0 then
         --静态测试，直接用select语句直接返回结果
         open rc for select id,name,sex,address,postcode,birthday from student;
      else
         --动态sql赋值，用:w_id来申明该变量从外部获得
         sqlstr := 'select id,name,sex,address,postcode,birthday from student where id=:w_id';
         --动态测试，用sqlstr字符串返回结果，用using关键词传递参数
         open rc for sqlstr using intid;
      end if;

      return rc;
    end get;

end pkg_test;
/

2、另一个详细例子
   save/oracle_ref_cursor.txt

2010.02.11
----------

1、假如windows平台有2个以上的实例，修改默认sid，只要修改注册表中ORACLE_SID即可，具体位置为
9i：HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\HOME0
10g：HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OraDb10g_home1

2010.02.03
-----------

1、在linux的sqlplus环境启动历史命令快捷键
window下的sqlplus可以通过箭头键，来回看历史命令，用起来非常的方便。
但是在linux里就没有这么方面了，错了一个命令，我们必须重新敲一次，辛苦了手指头叻。
看到一个文章，很方便的一招，给我们带来方便。
通过rlwrap包实现linux里的sqlplus历史命令的功能
可以下载rlwrap包从inthirties里。
这个包依赖readline包，这个包也可以下载
http://inthirties.com:90/thread-1061-1-1.html
下载
rlwrap-0.30.tar.gz
readline-6.1.tar.gz
到本地
然后解压
由于rlwrap依赖readline包，我们先安装readline包
#gunzip readline-6.1.tar.gz
#tar -xf readline-6.1.tar
#cd readline-6.1
#./configure
#make install
安装以后，我们可以安装rlwrap叻
#gunzip rlwrap-0.30.tar.gz
#tar -xf rlwrap-0.30.tar
#cd rlwrap-0.30
#./configure
#make install
现在rlwrap就已经安装到我们的linux里。
我们可以用rlwrap sqlplus执行试试，好悲惨哟，好像有错误
rlwrap: error while loading shared libraries: libreadline.so.6: cannot open shared object file: No such file or directory
报错哟，别着急，这里其实这里是.so库没有load到，
你可以修改/etc/ld.so.conf，设置我们so库的load路径
先找到这个libreadline.so.6的路径
find / -iname libreadline.so.6
/usr/local/lib/libreadline.so.6
在最后的一行下加上/usr/local/lib就可以叻，这里的
include ld.so.conf.d/*.conf
/usr/local/lib
加入要重启生效，不过我们也可以执行ldconfig即时生效
现在我们在试试lrwrap sqlplus命令，是不是很爽呀。
不过每次在前面要多输入lrwrap，确实有些不习惯了，都习惯直接sqlplus，以后要是加上lrwrap也太不习惯了。
解决方法用alias命令就可以叻
alias sqlplus="rlwrap sqlplus"
alias rman="rlwrap rman"
可以在启动文件里加入一上两句，就尅直接的sqlplus，
赶快试试吧，是不是感觉自己的手指头轻松多了呀。

2010.01.26
----------

1、数据库归档模式/非归档 切换
sqlplus / as sysdba
查看登录的数据库：
select name from V$DATABASE;
查看是否为归档模式
archive log list;
关闭数据库
shutdown immediate
启动数据库到mount状态
startup mount;
修改数据库归档模式
alter database archivelog(noarchivelog);
启动数据库
alter database open;
定义归档位置
alter system set log_archive_dest_1="location=D:\database\example" scope=both;
确认配置生效：
archive log list;

startup mount;
2010.01.21
-----------

1、安装sqlplus下新的帮助
$ sqlplus system/system                           (以system用户登录)

SQL> select count(distinct topic) from help;      (确认当前有多少个帮助主题, 默认58个)

将save/help.rar中的helpnew.sql考到指定位置，本试验中放到
$ORACLE_HOME/sqlplus/admin/help下
安装：
进入sqlplus/admin/help/目录
sqlplus下运行@hlpbld.sql helpnew.sql
出错信息没关系，完成后，应该有222条帮助信息

2010.01.12
----------

1、dba\dba日记1,2

2010.01.08
----------

1、分区
   save/partion.txt

2、save/rman.txt

   涂抹oracle中rman文件 save/rman_code.rar

3、设置默认连接

   set oracle_id=DatabaseName

4、以system/system as sysdba
   @save/tablespace_useinfo.txt

5、sqlplus/glogin.sql中增加以下内容

--提示符前加入當前時間
set time on
--計算SQL執行使用時間
set timi on

--set pagesize 0;

set linesize 120;
--输出一行字符个数，缺省为80

2009.12.25
----------

1、save/Oracle_IO_性能调优手册.pdf

2、save/彻底删除oracle.bat.txt

3、save/Oracle SQL Developer 2.1.pdf

4、数据库脚本
   save/MySQL_5.1.rar, Oracle_10g.rar, PostgreSql_8.2.rar, SqlServer_2005.rar

2009.12.14
----------

1、oracle 函数大全
   http://wlh269.javaeye.com/blog/548215
   save/oracle_fun.txt

2009.12.12
----------

1、Oracle中如何用一条SQL快速生成大量测试数据

做数据库开发或管理的人经常要创建大量的测试数据，动不动就需要上万条，如果一条一条的录入，那会浪费大量的时间，本文介绍了Oracle中如何通过一条SQL快速生成大量的测试数据的方法。
产生测试数据的SQL如下：
SQL> select rownum as id,
                to_char(sysdate + rownum / 24 / 3600, 'yyyy-mm-dd hh24:mi:ss') as inc_datetime,
                trunc(dbms_random.value(0, 100)) as random_id,
                dbms_random.string('x', 20) random_string
           from dual
           connect by level <= 10;

        ID INC_DATETIME         RANDOM_ID RANDOM_STRING
---------- ------------------- ---------- --------------------------------------------------------------------------------
         1 2009-12-08 19:43:14         76 GWMU280MIVBKKOCZV620
         2 2009-12-08 19:43:15         34 GNV88O6TDHD3TWC5GWI5
         3 2009-12-08 19:43:16         77 LI6H4O5IAHQIMO4B0WMH
         4 2009-12-08 19:43:17         99 LP7XP49I0YOJIYSJDQZO
         5 2009-12-08 19:43:18         55 V3284X9RXW4UZI8BQMO3
         6 2009-12-08 19:43:19         16 T0OA52UAOGHL1TT46H25
         7 2009-12-08 19:43:20         61 UY6RUOF7HWTO86942FLP
         8 2009-12-08 19:43:21         25 JYXO4OPEW8J1CKVCPDJR
         9 2009-12-08 19:43:22         10 DONU6W9QVQM3KJ2UG8LO
        10 2009-12-08 19:43:23         76 J8DJLVNOUIZDXE4UXUJG

10 rows selected

2009.09.15
----------

1、从mssql导300w记录到oracle10g

(1).先是安装oracle10的透明网关，设置listener,设置tns,接下来：
 CREATE  DATABASE LINK mssqllink CONNECT TO "sa" IDENTIFIED BY "sa" USING  'tg4msql';
 select * from T@mssqllink where rownum <=5;

报错;TNS，无法解析指定的连接标识符
监听可以正常的启动，tnsping也是通的，奇怪，仔细检查配置，没得问题，什么都是好好的，10g的透明网关死活不通,无奈，晚上9点了，下班回家。

(2).第二天早上一来就卸载10g，换成9i，问题没了，汗！

(3).使用oracle的bulk insert,导数据：

create table t_copy as select  *  from  T@mssqllink where rownum<1;
alter table t_copy nologging;
insert /*+ APPEND */ into t_copy
select  t.*  from  T@mssqllink t;

(4).12分钟后，控制台输出：已创建31938010行。

(5). commit;

(6)接下来从9i导入到10g就简单了。

2009.09.10
----------

1、sqlplus设置永久生效
   sqlplus\admin\glogin.sql
   save/glogin.sql

--提示符前加入當前時間
set time on
--計算SQL執行使用時間
set timi on
--設置列寬20
col colname format a20
set colsep' ';
--域输出分隔符
set echo off;
--显示start启动的脚本中的每个sql命令，缺省为on
--set feedback off;
--回显本次sql命令处理的记录条数，缺省为on
--set heading off;
--输出域标题，缺省为on
set pagesize 0;
--输出每页行数，缺省为24,为了避免分页，可设定为0。
set linesize 80;
--输出一行字符个数，缺省为80
set numwidth 12;
--输出number类型域长度，缺省为10
set termout off;
--显示脚本中的命令的执行结果，缺省为on
--set timing off;
--显示每条sql命令的耗时，缺省为off
set trimout on;
--去除标准输出每行的拖尾空格，缺省为off
set trimspool on;
--去除重定向（spool）输出每行的拖尾空格，缺省为off

--用于分析
--SET AUTOTRACE ON
--我们就可以看到我们SQL的执行计划，执行成本（PHYSICAL READ/CONSISTENT READ...)

2009.08.24
----------

1、 修改oracle 150 的最大连接数
使用sys，以sysdba权限登录：

c:\sqlplus /nolog
SQL>conn / as sysdba

SQL> show parameter processes;

NAME TYPE VALUE
------------------------------------ ----------- ------------------------------
aq_tm_processes integer 1
db_writer_processes integer 1
job_queue_processes integer 10
log_archive_max_processes integer 1
processes integer 150

SQL> alter system set processes=300 scope = spfile;

系统已更改。

SQL> show parameter processes;

NAME TYPE VALUE
------------------------------------ ----------- ------------------------------
aq_tm_processes integer 1
db_writer_processes integer 1
job_queue_processes integer 10
log_archive_max_processes integer 1
processes integer 150

SQL> create pfile from spfile;

文件已创建。


重启数据库，OK！

2009.07.23
----------

1、Oracle10g数据文件太大，导致C盘空间不够用的解决方法
从 JavaEye博客 作者：ado88

1.先登录sqlplus：
C:\Documents and Settings\jbdu>sqlplus /nolog

SQL> connect jbdu/jbdu@orclado


2.修改表空间为Offline：
SQL> alter tablespace users offline;


3.拷贝表空间文件
拷贝
C:\oracle\product\10.2.0\oradata\orclado\USERS01.DBF
到
D:\oracledata

4.修改oracle表空间指向地址
SQL> alter database rename file 'C:\oracle\product\10.2.0\oradata\orclado\USERS01.DBF' to 'D:\oracledata\USERS01.DBF';

5.修改表空间为Online
SQL> alter tablespace users online;

OK；

至此，你可以放心的删除c:下的USERS01.DBF文件了，并且以后数据全部会放在D:\oracledata，就不用再担心c盘空间不够用了。


另：
使用select file_name from sys.dba_data_files;可以查看数据库的表空间文件在哪里

2009.07.22
-----------

1、采用utl导出到csv，及导入
   save/utl_file.txt

2009.07.17
----------

1、通过oracle的数据字典找到该用户下的所有表、视图等对象，拼接成语句。如下

select 'drop table ' || table_name ||';'||chr(13)||chr(10) from user_tables;  --delete tables
select 'drop view ' || view_name||';'||chr(13)||chr(10) from user_views;  --delete views
select 'drop sequence ' || sequence_name||';'||chr(13)||chr(10) from user_sequences;--delete seqs
select 'drop function ' || object_name||';'||chr(13)||chr(10) from user_objects  where object_type='FUNCTION';--delete functions
select 'drop procedure ' || object_name||';'||chr(13)||chr(10) from user_objects  where object_type='PROCEDURE';--DELETE PROCEDURE
select 'drop package ' || object_name||';'||chr(13)||chr(10) from user_objects  where object_type='PACKAGE';--delete pags

2009.07.02
----------

1、Oracle工具——WRAP ,produce function 加密工具

2009.06.27
----------

1、pl/vision
   http://wuhuizhong.javaeye.com/blog/231427
   save/plvision.txt

2009.06.24
----------

1、oracle 导入导出到文本
   -导出该用户所有表
   ./unload.sh ofbiz/ofbiz@xe
   -导入该用所有表
   ./load.sh ofbiz/ofbiz@xe

   -导出、导入单表，该过程要调整，因为所有表导出导入时，对表名进行了处理

   save/load-script

   －相应的导出用户所建表结构

set pagesize 0
set long 90000
set feedback off
set echo off
spool get_allddl.sql
connect  USERNAME/PASSWORD@SID;
SELECT DBMS_METADATA.GET_DDL('TABLE',u.table_name)
FROM USER_TABLES u;
SELECT DBMS_METADATA.GET_DDL('INDEX',u.index_name)
FROM USER_INDEXES u;
spool off;

    or save/load_script/dbschema.sh

2、用plsql做金額中文数字和阿拉伯数字之间的互相转换
   http://wuhuizhong.javaeye.com/blog/226274
   save/je.sql

3、一些有用的脚本
   save/script.sql

2009.06.21
----------

1、oracle 10g xe
   oracle10g_xe.txt

2009.06.03
----------

1、oracle主键自增
从 JavaEye博客 作者：wangrusheng5200

a、建立数据

create table users(
           userid number(10) primary key,  /*主键，自动增加*/
           username varchar2(20)
           );


b、创建自动增长序列

CREATE SEQUENCE users_Sequence
 INCREMENT BY 1   -- 每次加几个
     START WITH 1     -- 从1开始计数
     NOMAXVALUE       -- 不设置最大值
     NOCYCLE          -- 一直累加，不循环
     CACHE 10;


c、创建触发器

CREATE TRIGGER users_Increase BEFORE
insert ON  Test_Increase FOR EACH ROW
begin
select users_Sequence.nextval into:New.userid from dual;

end;

d、提交

commit;

f、测试

     反复执行如下语句:

insert into users(Username) values('test')

     查看插入结果:

select * from users


2009.03.24
----------

1、oracle10g 教程
   oracle10g

2009.03.19
----------

1、手工启动
net start OracleOraDb10g_home1TNSListener
net start OracleServiceSong
注意的地方是start后面的监听和服务的名称是根据自己数据的名称定的
然后保存为begin.bat，就可以双击启动数据库了，是不是很方便？
关闭的方法跟启动的一样，就是改动一点
net stop OracleOraDb10g_home1TNSListener
net stop OracleServiceSong

2008.09.03
----------

1、toad使用技巧

  找了些简单使用TOAD技巧，现在共享给大家，呵呵。
  1 .把鼠标停在sql所在行，然后ctrl+Enter直接执行当前sql。
  2 .解决Toad对中文显示乱码问题：
  系统环境变量加 NLS_LANG=AMERICAN_AMERICA.WE8ISO8859P1
  3 .toad中自动提示功能，就像plsql developer那样：
  输入表名前几个字母，然后用Ctrl + .就可以弹出，如你输入select * from emp t where t. 这时候停顿一下，会弹出emp的字段来供你选择
  4 .如何支持代码自动更正，如输入ndf，自动替换成NO_DATA_FOUND，输入sf自动替换成select * from：
  点开菜单edit->editer_options->auto_replace中，自己去设定。可以设置任何你想自动替换的单词
  5 .toad如何实现多线程，像plsql developer那样可以取消当前的操作：
  安装的时候有选项设置，如果未设置进入view-options-oracle-transactions，把第一个选项选上。
  6 .在TOAD的SQL Editor中修改查询的数据：
  select rowid,b.* from acc_bill b 就可以修改数据了......
  7 .使用Object Palette吧，很棒：
  在VIEW——Object Palette找到入口。点击后在SQL Editor窗口右侧产生一个窗口，里面可以根据schema选择对象类型，比如table，出现的表名双击后就出现在SQL编辑器里了，下面还有字段名，是不是很方便啊。
  8 .格式化sql语句（SQL编辑窗口）Ctrl+Shift+F

2008.09.02
----------

1、10免安装
    首先，在安装ORACLE服务器的机器上搜索下列文件，
    oci.dll
    ocijdbc10.dll
    ociw32.dll
    orannzsbb10.dll
    oraocci10.dll
    oraociei10.dll
    sqlnet.ora
    tnsnames.ora
    classes12.jar
    ojdbc14.jar

    制作成压缩文件，配置目标计算机使用。
    1.将oracleinstantclient.rar解压缩到一个目录, 如d:\oracleinstantclient
    2.配置d:\oracleinstantclient的tnsnames.ora文件，只需要修改其中的服务器地址、服务名称和端口。
    3、配置环境变量，在PATH变量中加入d:\oracleinstantclient
    4、注册表加入下面键值
    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment]
    "LD_LIBRARY_PATH"="d:\OracleInstantClient"
    "NLS_LANG"="AMERICAN_AMERICA.ZHS16GBK"
    "TNS_ADMIN"="d:\OracleInstantClient"
    5、如果是ASP.NET应用，则要为ASPNET用户分配d:\oracleinstantclient文件夹的读写权限。
     通过上面的设置后，即可实现免安装ORACLE客户端，连接到ORACLE数据库服务器。

2008.01.11
----------

oracle 日期函数 处理大全(转)

  TO_DATE格式
  Day:
  dd number 12
  dy abbreviated fri
  day spelled out friday
  ddspth spelled out, ordinal twelfth
  Month:
  mm number 03
  mon abbreviated mar
  month spelled out march
  Year:
  yy two digits 98
  yyyy four digits 1998

  24小时格式下时间范围为： 0:00:00 - 23:59:59....
  12小时格式下时间范围为： 1:00:00 - 12:59:59 ....
  1.
  日期和字符转换函数用法（to_date,to_char）

  2.
  select to_char( to_date(222,'J'),'Jsp') from dual

  显示Two Hundred Twenty-Two

  3.
  求某天是星期几
  select to_char(to_date('2002-08-26','yyyy-mm-dd'),'day') from dual;
  星期一
  select to_char(to_date('2002-08-26','yyyy-mm-dd'),'day','NLS_DATE_LANGUAGE = American') from dual;
  monday
  设置日期语言
  ALTER SESSION SET NLS_DATE_LANGUAGE='AMERICAN';
  也可以这样
  TO_DATE ('2002-08-26', 'YYYY-mm-dd', 'NLS_DATE_LANGUAGE = American')

  4.
  两个日期间的天数
  select floor(sysdate - to_date('20020405','yyyymmdd')) from dual;

  5. 时间为null的用法
  select id, active_date from table1
  UNION
  select 1, TO_DATE(null) from dual;

  注意要用TO_DATE(null)

  6.
  a_date between to_date('20011201','yyyymmdd') and to_date('20011231','yyyymmdd')
  那么12月31号中午12点之后和12月1号的12点之前是不包含在这个范围之内的。
  所以，当时间需要精确的时候，觉得to_char还是必要的
  7. 日期格式冲突问题
  输入的格式要看你安装的ORACLE字符集的类型, 比如: US7ASCII, date格式的类型就是: '01-Jan-01'
  alter system set NLS_DATE_LANGUAGE = American
  alter session set NLS_DATE_LANGUAGE = American
  或者在to_date中写
  select to_char(to_date('2002-08-26','yyyy-mm-dd'),'day','NLS_DATE_LANGUAGE = American') from dual;
  注意我这只是举了NLS_DATE_LANGUAGE，当然还有很多，
  可查看
  select * from nls_session_parameters
  select * from V$NLS_PARAMETERS

  8.
  select count(*)
  from ( select rownum-1 rnum
  from all_objects
  where rownum <= to_date('2002-02-28','yyyy-mm-dd') - to_date('2002-
  02-01','yyyy-mm-dd')+1
  )
  where to_char( to_date('2002-02-01','yyyy-mm-dd')+rnum-1, 'D' )
  not
  in ( '1', '7' )

  查找2002-02-28至2002-02-01间除星期一和七的天数
  在前后分别调用DBMS_UTILITY.GET_TIME, 让后将结果相减(得到的是1/100秒, 而不是毫秒).

  9.
  select months_between(to_date('01-31-1999','MM-DD-YYYY'),
  to_date('12-31-1998','MM-DD-YYYY')) "MONTHS" FROM DUAL;
  1

  select months_between(to_date('02-01-1999','MM-DD-YYYY'),
  to_date('12-31-1998','MM-DD-YYYY')) "MONTHS" FROM DUAL;

  1.03225806451613
  10. Next_day的用法
  Next_day(date, day)

  Monday-Sunday, for format code DAY
  Mon-Sun, for format code DY
  1-7, for format code D

  11
  select to_char(sysdate,'hh:mi:ss') TIME from all_objects
  注意：第一条记录的TIME 与最后一行是一样的
  可以建立一个函数来处理这个问题
  create or replace function sys_date return date is
  begin
  return sysdate;
  end;

  select to_char(sys_date,'hh:mi:ss') from all_objects;
  12.
  获得小时数

  SELECT EXTRACT(HOUR FROM TIMESTAMP '2001-02-16 2:38:40') from offer
  SQL> select sysdate ,to_char(sysdate,'hh') from dual;

  SYSDATE TO_CHAR(SYSDATE,'HH')
  -------------------- ---------------------
  2003-10-13 19:35:21 07

  SQL> select sysdate ,to_char(sysdate,'hh24') from dual;

  SYSDATE TO_CHAR(SYSDATE,'HH24')
  -------------------- -----------------------
  2003-10-13 19:35:21 19

  获取年月日与此类似
  13.
  年月日的处理
  select older_date,
  newer_date,
  years,
  months,
  abs(
  trunc(
  newer_date-
  add_months( older_date,years*12+months )
  )
  ) days
  from ( select
  trunc(months_between( newer_date, older_date )/12) YEARS,
  mod(trunc(months_between( newer_date, older_date )),
  12 ) MONTHS,
  newer_date,
  older_date
  from ( select hiredate older_date,
  add_months(hiredate,rownum)+rownum newer_date
  from emp )
  )

  14.
  处理月份天数不定的办法
  select to_char(add_months(last_day(sysdate) +1, -2), 'yyyymmdd'),last_day(sysdate) from dual

  16.
  找出今年的天数
  select add_months(trunc(sysdate,'year'), 12) - trunc(sysdate,'year') from dual

  闰年的处理方法
  to_char( last_day( to_date('02' || :year,'mmyyyy') ), 'dd' )
  如果是28就不是闰年

  17.
  yyyy与rrrr的区别
  'YYYY99 TO_C
  ------- ----
  yyyy 99 0099
  rrrr 99 1999
  yyyy 01 0001
  rrrr 01 2001

  18.不同时区的处理
  select to_char( NEW_TIME( sysdate, 'GMT','EST'), 'dd/mm/yyyy hh:mi:ss') ,sysdate
  from dual;

  19.
  5秒钟一个间隔
  Select TO_DATE(FLOOR(TO_CHAR(sysdate,'SSSSS')/300) * 300,'SSSSS') ,TO_CHAR(sysdate,'SSSSS')
  from dual

  2002-11-1 9:55:00 35786
  SSSSS表示5位秒数

  20.
  一年的第几天
  select TO_CHAR(SYSDATE,'DDD'),sysdate from dual
  310 2002-11-6 10:03:51

  21.计算小时,分,秒,毫秒
  select
  Days,
  A,
  TRUNC(A*24) Hours,
  TRUNC(A*24*60 - 60*TRUNC(A*24)) Minutes,
  TRUNC(A*24*60*60 - 60*TRUNC(A*24*60)) Seconds,
  TRUNC(A*24*60*60*100 - 100*TRUNC(A*24*60*60)) mSeconds
  from
  (
  select
  trunc(sysdate) Days,
  sysdate - trunc(sysdate) A
  from dual
  )



  select * from tabname
  order by decode(mode,'FIFO',1,-1)*to_char(rq,'yyyymmddhh24miss');

  //
  floor((date2-date1) /365) 作为年
  floor((date2-date1, 365) /30) 作为月
  mod(mod(date2-date1, 365), 30)作为日.
  23.next_day函数
  next_day(sysdate,6)是从当前开始下一个星期五。后面的数字是从星期日开始算起。
  1 2 3 4 5 6 7
  日 一 二 三 四 五 六


  ===================================
  在oracle中有很多关于日期的函数，如：
  1、add_months()用于从一个日期值增加或减少一些月份
  date_value:=add_months(date_value,number_of_months)
  例：
  SQL> select add_months(sysdate,12) "Next Year" from dual;

  Next Year
  ----------
  13-11月-04

  SQL> select add_months(sysdate,112) "Last Year" from dual;

  Last Year
  ----------
  13-3月 -13

  SQL>

  2、current_date()返回当前会放时区中的当前日期
  date_value:=current_date
  SQL> column sessiontimezone for a15
  SQL> select sessiontimezone,current_date from dual;

  SESSIONTIMEZONE CURRENT_DA
  --------------- ----------
  +08:00 13-11月-03

  SQL> alter session set time_zone='-11:00'
  2 /

  会话已更改。

  SQL> select sessiontimezone,current_timestamp from dual;

  SESSIONTIMEZONE CURRENT_TIMESTAMP
  --------------- ------------------------------------
  -11:00 12-11月-03 04.59.13.668000 下午 -11:
  00

  SQL>

  3、current_timestamp()以timestamp with time zone数据类型返回当前会放时区中的当前日期
  timestamp_with_time_zone_value:=current_timestamp([timestamp_precision])
  SQL> column sessiontimezone for a15
  SQL> column current_timestamp format a36
  SQL> select sessiontimezone,current_timestamp from dual;

  SESSIONTIMEZONE CURRENT_TIMESTAMP
  --------------- ------------------------------------
  +08:00 13-11月-03 11.56.28.160000 上午 +08:
  00

  SQL> alter session set time_zone='-11:00'
  2 /

  会话已更改。

  SQL> select sessiontimezone,current_timestamp from dual;

  SESSIONTIMEZONE CURRENT_TIMESTAMP
  --------------- ------------------------------------
  -11:00 12-11月-03 04.58.00.243000 下午 -11:
  00

  SQL>

  4、dbtimezone()返回时区
  varchar_value:=dbtimezone
  SQL> select dbtimezone from dual;

  DBTIME
  ------
  -07:00

  SQL>

  5、extract()找出日期或间隔值的字段值
  date_value:=extract(date_field from [datetime_value|interval_value])
  SQL> select extract(month from sysdate) "This Month" from dual;

  This Month
  ----------
  11

  SQL> select extract(year from add_months(sysdate,36)) "3 Years Out" from dual;

  3 Years Out
  -----------
  2006

  SQL>

  6、last_day()返回包含了日期参数的月份的最后一天的日期
  date_value:=last_day(date_value)
  SQL> select last_day(date'2000-02-01') "Leap Yr?" from dual;

  Leap Yr?
  ----------
  29-2月 -00

  SQL> select last_day(sysdate) "Last day of this month" from dual;

  Last day o
  ----------
  30-11月-03

  SQL>

  7、localtimestamp()返回会话中的日期和时间
  timestamp_value:=localtimestamp
  SQL> column localtimestamp format a28
  SQL> select localtimestamp from dual;

  LOCALTIMESTAMP
  ----------------------------
  13-11月-03 12.09.15.433000
  下午

  SQL> select localtimestamp,current_timestamp from dual;

  LOCALTIMESTAMP CURRENT_TIMESTAMP
  ---------------------------- ------------------------------------
  13-11月-03 12.09.31.006000 13-11月-03 12.09.31.006000 下午 +08:
  下午 00

  SQL> alter session set time_zone='-11:00';

  会话已更改。

  SQL> select localtimestamp,to_char(sysdate,'DD-MM-YYYY HH:MI:SS AM') "SYSDATE" from dual;

  LOCALTIMESTAMP SYSDATE
  ---------------------------- ------------------------
  12-11月-03 05.11.31.259000 13-11-2003 12:11:31 下午
  下午

  SQL>

  8、months_between()判断两个日期之间的月份数量
  number_value:=months_between(date_value,date_value)
  SQL> select months_between(sysdate,date'1971-05-18') from dual;

  MONTHS_BETWEEN(SYSDATE,DATE'1971-05-18')
  ----------------------------------------
  389.855143

  SQL> select months_between(sysdate,date'2001-01-01') from dual;

  MONTHS_BETWEEN(SYSDATE,DATE'2001-01-01')
  ----------------------------------------
  34.4035409

  SQL>

  9、next_day()给定一个日期值，返回由第二个参数指出的日子第一次出现在的日期值（应返回相应日子的名称字符串）



  ==============================================
  1.查询某周的第一天
  select trunc(decode(ww, 53, to_date(yy || '3112', 'yyyyddmm'), to_date(yy || '-' || to_char(ww * 7), 'yyyy-ddd')), 'd') last_day
  from (select substr('2004-32', 1, 4) yy, to_number(substr('2004-32', 6)) ww
  from dual)

  select trunc(to_date(substr('2003-01',1,5)||to_char((to_number(substr('2003-01',6)))*7),'yyyy-ddd'),'d')-6 first_day from dual

  select min(v_date) from
  (select (to_date('200201','yyyymm') + rownum) v_date
  from all_tables
  where rownum < 370)
  where to_char(v_date,'yyyy-iw') = '2002-49'

  2.查询某周的最后一天
  select trunc(decode(ww, 53, to_date(yy || '3112', 'yyyyddmm'), to_date(yy || '-' || to_char(ww * 7), 'yyyy-ddd')), 'd') - 6 first_day
  from (select substr('2004-33', 1, 4) yy, to_number(substr('2004-33', 6)) ww
  from dual)

  select trunc(to_date(substr('2003-01',1,5)||to_char((to_number(substr('2003-01',6)))*7),'yyyy-ddd'),'d') last_day from dual

  select max(v_date) from
  (select (to_date('200408','yyyymm') + rownum) v_date
  from all_tables
  where rownum < 370)
  where to_char(v_date,'yyyy-iw') = '2004-33'

  3.查询某周的日期
  select min_date, to_char(min_date,'day') day from
  (select to_date(substr('2004-33',1,4)||'001'+rownum-1,'yyyyddd') min_date
  from all_tables
  where rownum <= decode(mod(to_number(substr('2004-33',1,4)),4),0,366,365)
  union

  select to_date(substr('2004-33',1,4)-1||
  decode(mod(to_number(substr('2004-33',1,4))-1,4),0,359,358)+rownum,'yyyyddd') min_date
  from all_tables
  where rownum <= 7
  union

  select to_date(substr('2004-33',1,4)+1||'001'+rownum-1,'yyyyddd') min_date
  from all_tables
  where rownum <= 7
  )
  where to_char(min_date,'yyyy-iw') ='2004-33'

2007.05.22
----------

1、doc/lang.txt
  重点:不同字符集之间如何传递汉字
  http://zalbb.itpub.net/post/980/28171

2007.05.20
----------

1、http://www.itpub.net/index.php

2、doc/初学者.txt

2007.05.18
----------

1、导入导出工具
  doc/sqlldr.txt

2006.12.12
----------

1、doc/字符下安装oracle.txt
   doc/oracle102手工建数据库.txt
   doc/建用户及表空间.txt

2006.12.07
----------

1、oracle下的工具http://tora.sourceforge.net/

2006.12.06
----------

1、在ubuntu 64下安装--参考doc/oracle-10gr2-on-ubuntu-610-amd64.html,
  Installing 10g Release 2 on Ubuntu-2.html,
  ubuntu-oracle-10g-install.txt

  注意：
  下载for linux64 版本，释放时
    Unzip the file: gunzip <filename>
    Extract the file: cpio -idmv < <filename>

  建立用户
  sudo groupadd nobody
  sudo groupadd oinstall
  sudo groupadd dba
  sudo useradd -g oinstall -G dba -p passwd -d /home/oracle -s /bin/bash oracle
      password : 123456789

  设置以下文件，以便安装通过
    sudo gedit /etc/redhat-release
      Red Hat Enterprise Linux AS release 3 (Taroon)

  用户oracle要用图形界面登录一次
    安装时用oracle登录，su - oracle，并且设置以下变量
        export XLOCALELIBDIR=/usr/lib32/X11/localecd

  安装时设置
    第一个界面，
      oracle home location: /oracle/10g
      installation type: enterprise edition
      unix dba group: oinstall
      以下部分不选
　　第二个界面，
　　　/oracle/orainventory
      oinstall
    以后有两次报错，点continue
    最后，打开一个终端切换到正常用户
      sudo /oracle/oraInventory/orainstRoot.sh
      sudo /oracle/10g/root.sh

  Create listener
    netca
    采用默认即可。

  Create database
    dbca

  注意以上都用oracle进行操作。

  手工启动(自动启动改：/etc/oratab)
      su root
      xhost + 127.0.0.1 0.0
      su oracle
      xhost + 127.0.0.1 0.0
      export LANG=en
      $ORACLE_HOME/bin/lsnrctl start  (启动监听器)
      $ORACLE_HOME/BIN/sqlplus /nolog
        sql>conn / as sysdba
        sql>startup
        sql>exit

2、win下手工启动oracle
　 doc/win下手工启动oracle.txt
