set linesize 200 
set term off verify off feedback off pagesize 999 
set markup html on entmap ON spool on preformat off
spool emp.xls
@getdata.sql
spool off
exit
