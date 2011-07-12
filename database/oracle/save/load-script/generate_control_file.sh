################################################## ############## 
#generate_control_file.sh
#! / usr / bin / ksh 
################################################## ############################## 
#
# Modules: generate_control_file.sh 
#
# Description: According to generate a table of the table control documents 
#
# 1 = parameters of the user / password [@ example] 
# 2 = parameters table 
#
# Author Bing He 
#
# Modify record 
#  Laws were amended # date description 
#
# 09/23/2003 Bing He began to prepare 
#
################################################## ############################## 

################################################## ############################## 
# # Main program entrance 

if [ $# -ne 2 ] 
then
  echo "Usage: $0 <userid/passwd[@connection]> <table_name>" 
exit
else
  userid=$1 
  table=$2 
fi

echo "generate control .."

################################################## ############################## 
################################################## ############################## 
# # Download operation 
lv_temp="wk_$table.test" 
lv_temp1="wk_$table.test1" 
lv_temp2="wk_$table.test2" 
lv_control="$table.ctl" 

echo " alter session set nls_language=american;
  spool $lv_temp; 
  desc $table;
  spool off; 
  " | sqlplus $userid >/dev/null

if [ "$?" -ne 0 ] 
then
  echo "Error: sqlplus $userid error in generate control file for table $table!" 
  echo "please check userid and passwd or oracle_sid." 
exit
fi

if [ -f $lv_temp ] 
then

##
  cat $lv_temp | grep -v "^SQL>" | grep -v " Name " | grep -v " ------" | awk '{print $1 }' > $lv_temp1 
#  cat $lv_temp | grep -v "^SQL>" | grep -v " Name" | grep -v "------" | awk '{print $$1 }' > $lv_temp1 
  lv_line_num=`cat $lv_temp1 | wc -l` 
  lv_line_num=`expr $lv_line_num - 2` 
  lv_index=0 

  rm -f $lv_temp2 
  for lineinfo in `cat $lv_temp1` 
  do
  if [ $lv_index -eq $lv_line_num ] 
  then
    echo "$lineinfo">> $lv_temp2 
  else
    echo "$lineinfo,">> $lv_temp2 
    lv_index=`expr $lv_index + 1` 
  fi
  done
else
  echo "$ 0 error: not find $lv_temp file." 
  exit
fi

#echo "LOAD DATA INFILE '$table.unl' BADFILE 'bad_$table.bad' APPEND INTO TABLE $table FIELDS TERMINATEd BY '|'" 
lv_str="LOAD DATA INFILE '$table.unl' BADFILE 'bad_$table.bad' APPEND INTO TABLE $table FIELDS TERMINATED BY '|'" 
echo $lv_str > $lv_control 
echo "(">> $lv_control 
cat $lv_temp2 >> $lv_control 
echo ")" >> $lv_control 

rm -f $lv_temp 
rm -f $lv_temp1 
rm -f $lv_temp2
