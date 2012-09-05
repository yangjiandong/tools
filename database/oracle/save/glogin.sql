--
-- Copyright (c) 1988, 2004, Oracle Corporation.  All Rights Reserved.
--
-- NAME
--   glogin.sql
--
-- DESCRIPTION
--   SQL*Plus global login "site profile" file
--
--   Add any SQL*Plus commands here that are to be executed when a
--   user starts SQL*Plus, or uses the SQL*Plus CONNECT command
--
-- USAGE
--   This script is automatically run
--

-- Used by Trusted Oracle
COLUMN ROWLABEL FORMAT A15

-- Used for the SHOW ERRORS command
COLUMN LINE/COL FORMAT A8
COLUMN ERROR    FORMAT A65  WORD_WRAPPED

-- Used for the SHOW SGA command
COLUMN name_col_plus_show_sga FORMAT a24
COLUMN units_col_plus_show_sga FORMAT a15
-- Defaults for SHOW PARAMETERS
COLUMN name_col_plus_show_param FORMAT a36 HEADING NAME
COLUMN value_col_plus_show_param FORMAT a30 HEADING VALUE

-- Defaults for SHOW RECYCLEBIN
COLUMN origname_plus_show_recyc   FORMAT a16 HEADING 'ORIGINAL NAME'
COLUMN objectname_plus_show_recyc FORMAT a30 HEADING 'RECYCLEBIN NAME'
COLUMN objtype_plus_show_recyc    FORMAT a12 HEADING 'OBJECT TYPE'
COLUMN droptime_plus_show_recyc   FORMAT a19 HEADING 'DROP TIME'

-- Defaults for SET AUTOTRACE EXPLAIN report
-- These column definitions are only used when SQL*Plus
-- is connected to Oracle 9.2 or earlier.
COLUMN id_plus_exp FORMAT 990 HEADING i
COLUMN parent_id_plus_exp FORMAT 990 HEADING p
COLUMN plan_plus_exp FORMAT a60
COLUMN object_node_plus_exp FORMAT a8
COLUMN other_tag_plus_exp FORMAT a29
COLUMN other_plus_exp FORMAT a44

-- Default for XQUERY
COLUMN result_plus_xquery HEADING 'Result Sequence'

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
