2010.02.24
----------

1、mssql 中的分割函数
Create this function:
CREATE FUNCTION dbo.Split(@String nvarchar(4000), @Delimiter char(1))
returns @Results TABLE (Items nvarchar(4000))
as
begin
declare @index int
declare @slice nvarchar(4000)

select @index = 1
if @String is null return

while @index != 0

begin
select @index = charindex(@Delimiter,@String)
if @index !=0
select @slice = left(@String,@index - 1)
else
select @slice = @String

insert into @Results(Items) values(@slice)
select @String = right(@String,len(@String) - @index)
if len(@String) = 0 break
end return
endand then try:

select * from dbo.split('a,b,c,d,e,f,g,h,i,j,k,l'), ',')

2010.02.08
----------

1、SQL Server 存储过程的分页
SQL Server 存储过程的分页，这个问题已经讨论过几年了，很多朋友在问我，所以在此发表一下我的观点
建立表：

CREATE TABLE [TestTable] (
 [ID] [int] IDENTITY (1, 1) NOT NULL ,
 [FirstName] [nvarchar] (100) COLLATE Chinese_PRC_CI_AS NULL ,
 [LastName] [nvarchar] (100) COLLATE Chinese_PRC_CI_AS NULL ,
 [Country] [nvarchar] (50) COLLATE Chinese_PRC_CI_AS NULL ,
 [Note] [nvarchar] (2000) COLLATE Chinese_PRC_CI_AS NULL
) ON [PRIMARY]
GO

插入数据：(2万条，用更多的数据测试会明显一些)
SET IDENTITY_INSERT TestTable ON

declare @i int
set @i=1
while @i<=20000
begin
    insert into TestTable([id], FirstName, LastName, Country,Note) values(@i, 'FirstName_XXX','LastName_XXX','Country_XXX','Note_XXX')
    set @i=@i+1
end

SET IDENTITY_INSERT TestTable OFF
-------------------------------------

分页方案一：(利用Not In和SELECT TOP分页)
语句形式：
SELECT TOP 10 *
FROM TestTable
WHERE (ID NOT IN
          (SELECT TOP 20 id
         FROM TestTable
         ORDER BY id))
ORDER BY ID


SELECT TOP 页大小 *
FROM TestTable
WHERE (ID NOT IN
          (SELECT TOP 页大小*页数 id
         FROM 表
         ORDER BY id))
ORDER BY ID

-------------------------------------

分页方案二：(利用ID大于多少和SELECT TOP分页）
语句形式：
SELECT TOP 10 *
FROM TestTable
WHERE (ID >
          (SELECT MAX(id)
         FROM (SELECT TOP 20 id
                 FROM TestTable
                 ORDER BY id) AS T))
ORDER BY ID


SELECT TOP 页大小 *
FROM TestTable
WHERE (ID >
          (SELECT MAX(id)
         FROM (SELECT TOP 页大小*页数 id
                 FROM 表
                 ORDER BY id) AS T))
ORDER BY ID
-------------------------------------

分页方案三：(利用SQL的游标存储过程分页)
create  procedure XiaoZhengGe
@sqlstr nvarchar(4000), --查询字符串
@currentpage int, --第N页
@pagesize int --每页行数
as
set nocount on
declare @P1 int, --P1是游标的id
 @rowcount int
exec sp_cursoropen @P1 output,@sqlstr,@scrollopt=1,@ccopt=1,@rowcount=@rowcount output
select ceiling(1.0*@rowcount/@pagesize) as 总页数--,@rowcount as 总行数,@currentpage as 当前页
set @currentpage=(@currentpage-1)*@pagesize+1
exec sp_cursorfetch @P1,16,@currentpage,@pagesize
exec sp_cursorclose @P1
set nocount off

其它的方案：如果没有主键，可以用临时表，也可以用方案三做，但是效率会低。
建议优化的时候，加上主键和索引，查询效率会提高。

通过SQL 查询分析器，显示比较：我的结论是:
分页方案二：(利用ID大于多少和SELECT TOP分页）效率最高，需要拼接SQL语句
分页方案一：(利用Not In和SELECT TOP分页)   效率次之，需要拼接SQL语句
分页方案三：(利用SQL的游标存储过程分页)    效率最差，但是最为通用

在实际情况中，要具体分析。

2010.01.28
----------

1、分页

--busdate必须为索引
select drugcost,*
from
    (
        select row_number() over(order by busdate desc) as RowNum, *
        from
            h_indrugincome
    ) t
where
  t.RowNum between  begin_num and end_num

--
SELECT * FROM
     (
     SELECT TOP(100 ) * FROM
     (
          SELECT TOP (100 * page ) *
          FROM h_indrugincome
          ORDER BY specialdeptcode DESC
     ) a
     ORDER BY specialdeptcode ASC
) b
ORDER BY specialdeptcode DESC

2010.01.27
----------

1、MS SQL2005 数据索引重建(Index Defragment)脚本
MS SQL Server 中索引很多，时间长了，最好重建一下，保证数据库的可靠性。

Step 1. 获取index， 建立执行脚本。

CREATE TABLE #table_index (
 table_index_id  INT IDENTITY(1, 1)  NOT NULL,
 table_name  VARCHAR(255)   NULL,
 index_name  VARCHAR(255)   NULL,
 sql_statement  VARCHAR(5000)   NULL,
   )
INSERT #table_index (
 table_name,
 index_name)
SELECT  c.name + '.' +
  a.name AS table_name,
 b.name AS index_name
FROM sysobjects a
INNER JOIN sysindexes b
ON  a.id = b.id
AND b.indid <> 0 -- table  itself
AND   b.indid <> 255 -- text column
AND  a.name <> 'dtproperties'
AND a.type = 'u'
INNER JOIN sysusers c
ON  c.uid = a.uid
ORDER BY 1

IF @@ERROR <> 0
 BEGIN
  RAISERROR('error occured while populating a temp table', 16, 1)
  RETURN
 END

UPDATE  #table_index
SET  sql_statement =
'DBCC INDEXDEFRAG(' + db_name() + ', ''' + table_name + ''',''' + index_name + ''')'
FROM  #table_index a

select * from #table_index

执行上述脚本，获取index 集合

Step2: 然后 从结果集中拷贝sql_statement列内容到sql management studio.

执行这些dbcc command：
 DBCC INDEXDEFRAG(hotel, 'dbo.GuestInfo','PK__GuestInf__0C47285A15502E78')

.......

Step3: check result when finished.检查结果中的Message信息，确保成功。

2010.01.15
----------

1、查表使用情况
select object_name(id)  表,
8*reserved/1024 预留大小,rtrim(8*dpages/1024)+'Mb' 已使用,
8*(reserved-dpages)/1024 未使用,8*dpages/1024-rows/1024*minlen/1024 空闲,
rows,* from sysindexes
where indid=1
order by reserved desc

select object_name(id) tablename,8*reserved/1024 reserved,rtrim(8*dpages/1024)+'Mb' used,8*(reserved-dpages)/1024 unused,8*dpages/1024-rows/1024*minlen/1024 free,
rows,* from sysindexes
where indid=1
order by reserved desc

2009.12.02
-----------

1、重新刷新所有视图
SELECT REPLACE(B.TEXT,'CREATE','ALTER')
FROM SYSOBJECTS A,SYSCOMMENTS   B
WHERE A.ID=B.ID  AND A.XTYPE='V'

2009.11.16
----------

1、TRUNCATE TABLE
在功能上与不带 Where 子句的 Delete 语句相同：二者均删除表中的全部行。但 TRUNCATE TABLE 比 Delete 速度快，且使用的系统和事务日志资源少。

2009.10.18
----------

1、sql
   1.txt

2009.06.08
-----------

1、Trees-in-relational-databases
   http://gfilter.net/?Post=Trees-in-relational-databases
   save/Jonathan Holland - Trees in relational databases.htm

   --END