###################################################################
#
# 将数据库中表的内容导出成为一个文本格式的shell脚本
# 有两种使用方法（假设这个脚本的名字叫做unload):
# 1.将一个用户中所有的数据库表的内容到出来：
#            unload userid/passwd[@connection]
# 2.只导出一个表的内容：
#            unload userid/passwd[@connection]  table_name
# 这里要感谢you的帖子，是他让我学会了如何设置sqlplus环境，从而
# 将数据库数据分解出来。
#
# 我还想写出一个根据数据库中的数据字典的内容自动生成ctl文件的脚本，
# 以便于将文本的数据库内容使用sqlldr导入到数据库中
# 请各位提示我可能要涉及的数据字典是哪些 ：）
#             
###################################################################

sep=','   # --分隔符，可以修改成自己想要的分隔符，如'|'
load_table( ){
rm -f table1.txt
echo " set colsep $sep;
set echo off;
set feedback off;
set heading off;
set pagesize 0;
set linesize 1000;
set numwidth 12;
set termout off;
set trimout on;
set trimspool on;
spool table1.txt;
select table_name from user_tables;
spool off;
"  | sqlplus $userid   >/dev/null
if [ "$?" -ne 0 ] ; then
echo  sqlplus $userid error in get table name 
echo please check userid and passwd or database.
exit 
fi

if [[ -f table1.txt ]]
then
cat table1.txt | grep -v "^SQL>;" | tr -d ' ' >table.txt
rm -f table1.txt
tables=`cat table.txt`
rm table.txt
else
echo "get table name error"
exit
fi
}

if [ "X$1" = "X" ]; then
echo "Usage: $0 <userid/passwd@connection>; <table_name>;"
exit
echo \c "Userid:"
read userid1
echo \c "Passwd:"
echo off
read passwd
userid=$userid1$passwd
echo on
else
userid=$1
fi

if [ "X$2" = "X" ]; then 
load_table;
if [[ "X$tables" = "X" ]];then
echo "no table in user $userid"
exit
fi
else 
tables=$2
fi

for table in $tables
do
rm -f wk_$table.txt
echo " set colsep $sep;
set echo off;
set feedback off;
set heading off;
set pagesize 0;
set linesize 1000;
set numwidth 12;
set termout off;
set trimout on;
set trimspool on;
spool wk_$table.txt; 
select * from $table; 
spool off; 
"  | sqlplus $userid  >/dev/null
if [ "$?" -ne 0 ] ; then
echo  error:sqlplus $userid error in unload table $table!!
echo please check userid and passwd or database.
exit 
fi

if [[ -f wk_$table.txt ]]
then
cat wk_$table.txt | grep -v "^SQL>;" >$table.txt
sed -e "s/ *$//g" $table.txt >wk_$table.txt
mv  wk_$table.txt $table.txt
if [[ `grep "ORA-" $table.txt`  = "" ]]; then
echo "unload table $table....\t\t\t\t\t\t ok"
else 
cat $table.txt
err="$err $table"
fi

else 
echo $0 is error
fi
done
if [[  "X$err" = "X" ]];then
echo unload complete!
else
echo "unload table $err error, please check it!"
fi

