################################################## ############################## 
# 单表
#!/usr/bin/bsh
#
# Modules: load.sh 
#
# Description: According to a database or table to load the corresponding data files 
# load.sh user/password[@ example] tablename
#
# Author Bing He 
#
# Modify record 
# Laws were amended # date description 
#
# 09/23/2003 Bing He began to prepare 
#
# 2009.07.22 update by yangjiandong
#
################################################## ############################## 
lv_temp1="wk.test1"

f_get_tables()
{
rm -f ${lv_temp1}
echo " 
set colsep $sep;
set echo off;
set feedback off;
set heading off;
set pagesize 0;
set linesize 1000;
set numwidth 12;
set termout off;
set trimout on;
set trimspool on;
spool ${lv_temp1};
select table_name from user_tables;
spool off;
" | sqlplus $userid >/dev/null
#exit
#!
if [ "$?" -ne 0 ] ;
then
  echo "Error: sqlplus ${userid} error in load for ${userid}!"
  echo "please check userid and passwd or oracle_sid."
exit
fi

if [ -f $lv_temp1 ]
then
  lv_tables=`cat $lv_temp1 | grep -v "^SQL>" | tr -d ''`
else
  echo "Error: $lv_temp1 file not found!????"
exit
fi

rm -f $lv_temp1
}

################################################## ############################## 
# # Main program entrance 

lv_no=$#
case $lv_no in
1)
  echo "process user all tables"
  userid=$1
  f_get_tables;
;;
2)
  echo "proecess user:$1 tabel:$2"
  userid=$1
  lv_tables=$2
;;
*)
  echo "Usage: $0 <userid/passwd[@connection]> <table_name>"
  exit
;;
esac

for onetable in $lv_tables
do

  #处理字符最后多个\r
  #单表处理有可能不支持了，因为带表名的参数是不需要处理的
  #TODO
  lv_table=${onetable:0:${#onetable}}
  if [ -z $lv_table ]
  then
    echo ${#lv_table}
    continue
  fi
  #处理结束

  if [ ! -f $lv_table.unl ]
  then
    echo "Error: $lv_table.unl file not found!222"
  else
   echo "load table:$lv_table"
   #echo generate_control_file..
   ./generate_control_file.sh $userid $lv_table
   #echo generate_control_file..
   ./generate_execute_shell.sh $userid $lv_table
   sh load_$lv_table.sh
   rm -f $lv_table.ctl 
   rm -f load_$lv_table.sh
  fi
done 

