CREATE OR REPLACE FUNCTION num2rmb(je NUMBER) RETURN VARCHAR2 IS
result varchar2(100);
i pls_integer;
snum varchar2(20) := ltrim(replace(to_char(abs(je), '9999999999999990.99'), '.'));
len pls_integer := length(snum);
sch varchar2(20) := '零壹贰叁肆伍陆柒捌玖';
sjin varchar2(50) := '分角圆拾佰仟万拾佰仟亿拾佰仟万拾佰仟';
srmb varchar2(100):= '';
num pls_integer;
jin varchar(2);
s_num pls_integer := 0; --'0'起始位置
e_num pls_integer := 0; --'0'结束位置
begin
for i in 1..len loop
num := to_number(substr(snum, i, 1));
if num <> 0 then --非'0'时处理：
if s_num = 0 then
srmb := srmb||substr(sch, num + 1, 1)||substr(sjin, len - i + 1, 1); --前面字符非'0', 正常联接...
else
srmb := srmb|| --否则：
case when s_num = e_num then --前面只有一个'0'
case s_num when 7 then '万' --只处理进位
when 11 then '亿'
when 15 then '万' end
when e_num < 12 then --否则(多个'0'处理)
case when s_num < 7 then '' --万以内..
when s_num < 11 then case when e_num < 8 and s_num < 10 then '万' end
when s_num < 15 then case when e_num < 12 then '亿' end
else '万亿' end
when e_num < 16 and s_num > 14 then '万' end||
case when s_num > 3 and e_num < 3 then '圆零'
when e_num = 3 then '圆'
when e_num not in (7, 11, 15) or s_num - e_num > 2 then '零' end;
srmb := srmb||substr(sch, num + 1, 1)||substr(sjin, len - i + 1, 1);
end if;
s_num := 0;
e_num := 0;
else if s_num = 0 then --当s_num = 0时'0'串起始，
s_num := len - i + 1; --记录开始
e_num := s_num; --各结整位置。
else
e_num := len - i + 1; --否则新的结整位置。
end if;
end if;
end loop;
if s_num <>0 then --此时以'0'结尾
srmb := srmb||
case when s_num = len then '零圆整' --全'0'串，加...
when s_num = 1 or s_num = 2 then '整' --分(1)，角(2)后加...
when s_num < 7 or s_num = 10 then '圆整'
when s_num <11 then '万圆整'
when s_num <15 then '亿圆整'
else '万亿圆整' end;
else
srmb := srmb||'整'; --不以'0'结尾，加...
end if;
if je < 0 then
srmb:='负'||srmb;
end if;
RETURN srmb;
end num2rmb;
