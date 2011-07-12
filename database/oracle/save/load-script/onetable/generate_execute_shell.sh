# generate_execute_shell.sh
#! / usr / bin / ksh 
################################################## ############################## 
#
# Modules: generate_execute_shell.sh 
#
# Description: According to generate a table of the table loading script 
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
# 2009.06.25 yangjiandong update
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

echo "generate execute ..."

################################################## ############################## 
################################################## ############################## 
# # Local variables definition of regional 
lv_rows=10000 
lv_bindsize=8192000 
lv_readsize=8192000 

################################################## ############################## 
################################################## ############################## 
# # Generate the implementation of script file 
echo "sqlldr $userid control=$table.ctl rows=$lv_rows bindsize=$lv_bindsize readsize=$lv_readsize log=log_$table.log bad=bad_$table.bad direct=true " > load_$table.sh 

################################################## ##############################  

