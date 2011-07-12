一些schema的常用脚本
一些schema的常用脚本
############################################################
                       getcode.sql --获得某个存储过程、包、函数代码脚本
set feedback off
set heading off
set termout off
set linesize 1000
set trimspool on
set verify off
spool &1..sql
prompt set define off
select decode( type||'-'||to_char(line,'fm99999'),
               'PACKAGE BODY-1', '/'||chr(10),
                null) ||
       decode(line,1,'create or replace ', '' ) ||
       text text
  from user_source
where name = upper('&&1')
order by type, line;
prompt /
prompt set define on
spool off
set feedback on
set heading on
set termout on
set linesize 100

############################################################
                       getallcode.sql --获得所以存储过程、包、函数代码脚本
set termout off
set heading off
set feedback off
set linesize 50
spool xtmpx.sql
select '@getcode ' || object_name
from user_objects
where object_type in ( 'PROCEDURE', 'FUNCTION', 'PACKAGE' )
/
spool off
spool getallcode_INSTALL.sql
select '@' || object_name
from user_objects
where object_type in ( 'PROCEDURE', 'FUNCTION', 'PACKAGE' )
/
spool off
set heading on
set feedback on
set linesize 130
set termout on
@xtmpx.sql
############################################################
                       getaview.sql --获得某个视图脚本
set heading off
set feedback off
set linesize 1000
set trimspool on
set verify off
set termout off
set embedded on
set long 50000

column column_name format a1000
column text format a1000

spool &1..sql
prompt create or replace view &1 (
select decode(column_id,1,'',',') || column_name column_name
from user_tab_columns
where table_name = upper('&1')
order by column_id
/
prompt ) as
select text
from user_views
where view_name = upper('&1')
/
prompt /
spool off

set heading on
set feedback on
set verify on
set termout on

############################################################
                       getallview.sql --获得所有视图脚本
set heading off
set feedback off
set linesize 1000
set trimspool on
set verify off
set termout off
set embedded on

spool tmp.sql
select '@getaview ' || view_name
from user_views
/
spool off

set termout on
set heading on
set feedback on
set verify on
@tmp


##########################################################
                        gettrig.sql --获得触发器脚本
set heading off
set feedback off
set linesize 1000
set trimspool on
set verify off
set termout off
set embedded on

spool &1..sql
select
'create or replace trigger "'||
                   trigger_name||'"'||chr(10)||
                   decode(substr(trigger_type,1,1),
                   'A','AFTER','B',BEFORE','I','INSTEAD OF')||
                   CHR(10)||
           triggering_event||chr(10)||
           'ON"'||table_owner||'"."'||
           table_name||'"'||chr(10)||
           decode(instr(trigger_type,'EACH ROW'),0,null,
                                     'FOR EACH ROW')||chr(10),
  trigger_body
from user_triggers
where trigger_name = upper('&1')
/
prompt /

spool off
set verify on
set feedback on
set termout on
set heading on

#################################################################
                                        analyze.sql --分析某用户下的表及索引（大表将以评估的方式分析）

set serveroutput on size 100000
declare
  v_per number(3);
  v_start number := dbms_utility.get_time;
  v_end   number;
begin

for rec in (select segment_name,segment_type,ceil(sum(bytes)/1024/1024) segment_size
  from user_segments group by segment_name,segment_type)
loop

    if rec.segment_type = 'INDEX' then
         dbms_stats.gather_index_stats(ownname=>'???',  --自己改一下
                                       INDNAME=>rec.segment_name
                                      );

--        dbms_output.put_line(rec.segment_name||' '||rec.segment_size||'m '||ceil((dbms_utility.get_time - v_start)/100)||'s');
         v_start := dbms_utility.get_time;

    elsif rec.segment_type = 'TABLE' then
        case when rec.segment_size < 32 then
            v_per := 100;
             when rec.segment_size < 320 then
            v_per := 10;
        else
            v_per := 1;
        end case;
             dbms_stats.gather_table_stats(OWNNAME=>'???',
                   TABNAME=>rec.segment_name,
                   ESTIMATE_PERCENT=>v_per,
                   METHOD_OPT=>'FOR ALL INDEXED COLUMNS');

--         dbms_output.put_line(rec.segment_name||' '||rec.segment_size||'m '||ceil((dbms_utility.get_time - v_start)/100)||'s');
         v_start := dbms_utility.get_time;

    end if;
end loop;
end;
/

###############################################################
                         print_table --纵向显示一行


create or replace
procedure print_table( p_query in varchar2 )
AUTHID CURRENT_USER
is
    l_theCursor     integer default dbms_sql.open_cursor;
    l_columnValue   varchar2(4000);
    l_status        integer;
    l_descTbl       dbms_sql.desc_tab;
    l_colCnt        number;
begin
    dbms_sql.parse(  l_theCursor,  p_query, dbms_sql.native );
    dbms_sql.describe_columns( l_theCursor, l_colCnt, l_descTbl);

    for i in 1 .. l_colCnt loop
        dbms_sql.define_column(l_theCursor, i, l_columnValue, 4000);
    end loop;

    l_status := dbms_sql.execute(l_theCursor);

    while ( dbms_sql.fetch_rows(l_theCursor) > 0 ) loop
        for i in 1 .. l_colCnt loop
           dbms_sql.column_value( l_theCursor, i, l_columnValue );
           dbms_output.put_line( rpad( l_descTbl(i).col_name, 30 )
                                  || ': ' ||
                                  l_columnValue );
        end loop;
        dbms_output.put_line( '-----------------' ); --注意如果输出的行比较多的话,要加大dbms_output.enable(值)
    end loop;
exception
    when others then
        dbms_sql.close_cursor( l_theCursor );
        RAISE;
end;
/

grant execute on print_table to public;

--该脚本是实现横向改成纵向显示
例如:
一行记录显示如下:
ADMIN_MEMBER_ID               : dealexpress
VIEW_NAME                     : Deal Express
BUSINESS_TYPE                 : 5
FIRST_NAME                    : Tim
LAST_NAME                     : Horton
JOB_TITLE                     :
PROVINCE                      : Wisconsin
COUNTRY                       : US
PHONE_COUNTRY                 : 1920
PHONE_AREA                    : 623
PHONE_NUMBER                  : 9528
FAX_COUNTRY                   : 1920
FAX_AREA                      : 623
FAX_NUMBER                    : 9528
MOBILE_NO                     :
ZIP                           : 53925
ADDRESS                       : 215 Robbins Rd
CITY                          : Columbus


#######################################################
                     show_space --用户模式下查看对象空间使用情况
create or replace
procedure show_space
( p_segname in varchar2,
  p_owner   in varchar2 default user,
  p_type    in varchar2 default 'TABLE',
  p_partition in varchar2 default NULL )
authid current_user
as
    l_free_blks                 number;

    l_total_blocks              number;
    l_total_bytes               number;
    l_unused_blocks             number;
    l_unused_bytes              number;
    l_LastUsedExtFileId         number;
    l_LastUsedExtBlockId        number;
    l_LAST_USED_BLOCK           number;
    procedure p( p_label in varchar2, p_num in number )
    is
    begin
        dbms_output.put_line( rpad(p_label,40,'.') ||
                              p_num );
    end;
begin
    for x in ( select tablespace_name
                 from user_tablespaces
                where tablespace_name = ( select tablespace_name
                                            from user_segments
                                           where segment_type = p_type
                                             and segment_name = p_segname
                                  and SEGMENT_SPACE_MANAGEMENT <> 'AUTO' )
             )
    loop
    dbms_space.free_blocks
    ( segment_owner     => p_owner,
      segment_name      => p_segname,
      segment_type      => p_type,
      partition_name    => p_partition,
      freelist_group_id => 0,
      free_blks         => l_free_blks );
    end loop;

    dbms_space.unused_space
    ( segment_owner     => p_owner,
      segment_name      => p_segname,
      segment_type      => p_type,
          partition_name    => p_partition,
      total_blocks      => l_total_blocks,
      total_bytes       => l_total_bytes,
      unused_blocks     => l_unused_blocks,
      unused_bytes      => l_unused_bytes,
      LAST_USED_EXTENT_FILE_ID => l_LastUsedExtFileId,
      LAST_USED_EXTENT_BLOCK_ID => l_LastUsedExtBlockId,
      LAST_USED_BLOCK => l_LAST_USED_BLOCK );

    p( 'Free Blocks', l_free_blks );
    p( 'Total Blocks', l_total_blocks );
    p( 'Total Bytes', l_total_bytes );
    p( 'Total MBytes', trunc(l_total_bytes/1024/1024) );
    p( 'Unused Blocks', l_unused_blocks );
    p( 'Unused Bytes', l_unused_bytes );
    p( 'Last Used Ext FileId', l_LastUsedExtFileId );
    p( 'Last Used Ext BlockId', l_LastUsedExtBlockId );
    p( 'Last Used Block', l_LAST_USED_BLOCK );
end;

#######################################################################
                             moveall.sql  --move表及rebuild 索引
set echo off

column order_col1 noprint
column order_col2 noprint

set heading off
set verify off
set feedback off
set echo off

spool move_build_tpcrm.sql
!date
select decode( segment_type, 'TABLE',
                       segment_name, table_name ) order_col1,
       decode( segment_type, 'TABLE', 1, 2 ) order_col2,
      'alter ' || segment_type || ' ' || segment_name ||
      decode( segment_type, 'TABLE', ' move; ', ' rebuild; ' )
  from user_segments,
       (select table_name, index_name from user_indexes )
where segment_type in ( 'TABLE', 'INDEX' )
   and segment_name = index_name (+)
   and tablespace_name in
      (自己选择的表空间)
order by 1, 2
/
!date
spool off

set heading on
set verify on
set feedback on
set echo on

REM UNCOMMENT TO AUTO RUN the generated commands
REM ELSE edit move_build.sql, modify as needed and run it
@move_build