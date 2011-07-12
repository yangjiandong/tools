################################################## ############################## 
#! /usr/bin/bsh 
#
# Modules: unload.sh 
#
# Description: According to a database or table to offload the data and generate corresponding data files 
#
# 1 = parameters of the user / password [@ example] 
# Parameters 2 = Table (optional) 
#
# Author Bing He 
#
# Modify record 
# Laws were amended # date description 
#
# 09/23/2003 Bing He began to prepare
#
# 2009.06.25 yangjiandong update
#
################################################## ############################## 

lv_sep='|' # - separators, can be amended into the separator you want, such as' | ' 
lv_temp1="unload.temp1" 

f_get_tables()
{ 
rm -f $lv_temp1
echo "
set colsep $lv_sep; 
set echo off; 
set feedback off; 
set heading off; 
set pagesize 0; 
set linesize 1000; 
set numwidth 12; 
set termout off; 
set trimout on; 
set trimspool on; 
spool $lv_temp1; 
select table_name from user_tables; 
spool off; 
" | sqlplus $userid > /dev/null
#exit
#!

if [ "$?" -ne 0 ]; then 
  echo "sqlplus $ userid error in get table name <"$?">!!" 
  echo "please check userid and passwd or database." 
exit
fi

if [ -f $lv_temp1 ] 
then
  #cat $lv_temp1 | grep -v "^SQL>" | tr -d '' > ttt.txt 
  lv_tables=`cat $lv_temp1 | grep -v "^SQL>" | tr -d ''` 
else
  echo "Error: $lv_temp1 file not found!" 
exit
fi
#生成的表名文件
rm -f $lv_temp1
} 

################################################## ############## 
# # Main program entrance 
lv_no=$# 
case $lv_no in 
1)
  userid=$1 
  f_get_tables;
;;
2)
  userid=$1 
  lv_tables=$2 
;;
*)
  echo "Usage: $ 0 <userid/passwd[@connection]> <table_name>" 
exit
;;
esac

################################################## ############## 

################################################## ############## 
# # Download operation 

#lv_tables=`cat ttt.txt | tr -d ''` 

for onetable in $lv_tables 
do
  #处理字符最后多个\r
  table=${onetable:0:${#onetable}-1}
  if [ -z $table ]
  then
    echo ${#table}
    continue
  fi

  rm -f lv_$table.txt
  #cat "${table}" >temp_${table}.txt
  echo unload $table ...
  #echo ${#table}
  echo "
  set colsep $lv_sep; 
  set echo off; 
  set feedback off; 
  set heading off; 
  set pagesize 0; 
  set linesize 1000; 
  set numwidth 12; 
  set termout off; 
  set trimout on; 
  set trimspool on; 
  spool lv_${table}.txt; 
  select * from ${table}; 
  spool off; 
  " | sqlplus ${userid} >/dev/null

  if [ "$?" -ne 0 ] 
  then
    echo "error: sqlplus $userid error in unload table $table!!" 
    echo "please check userid and passwd or database." 
    exit
  fi

  if [ -f lv_${table}.txt ]
  then
#cat lv_$table.txt | grep -v "^SQL>"|sed -e "s/ *$//g"|sed "s/$/\|/g"|sed -e "s/ *\|/\|/g" >${table}.unl
    cat lv_$table.txt |grep -v "^SQL>" > $table.unl
    if [[ `grep "ORA-" $table.unl` = "" ]]; then
      echo "unload table ${table}....\t\t\t\t\t ok"
    else
      cat ${table}.unl
	  err="$err ${table}"
    fi
  else
    echo $0 error
  fi
  
  rm -f lv_$table.txt 
done

################################################## ############## 
################################################## ############## 
# # End of operation 

if [[ "X $ err"="X" ]]; then 
  echo "Unload Complete!, Thank you!" 
else
  echo "Unload Table $ err error, please check it!" 
fi 

