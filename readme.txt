日常工具
==========

1. cygwin

2. vim (for portable)

   --https://github.com/saberma/vimfiles
   --use pik,
   --pik sw 187
   --cd ..\vimfiles\bundle\Command-T\ruby\command-t

   set path=D:\ruby\RailsInstaller\DevKit\bin;D:\ruby\RailsInstaller\DevKit\mingw\bin;%path%
   make

   参考参考https://github.com/akitaonrails/vimfiles,
   终于解决vim bundle 插件在windows下的安装,所有文件放在d:/home/vimfiles下,
   新建文件_vimrc,内容source ~/vimfiles/vimrc 

3. vcn 版本控制

4. 文档生成工具

   a. docbook

   java,ptyhon == 都支持,可参考 http://www.woodpecker.org.cn:9081/doc/XML/docbook_step_1.6.6/src/html/ 

   b. maruku 

   暂时用 ruby 版本支持,可参考 https://github.com/sinatra/sinatra-book 

   d. AsciiDOc
   
   http://www.methods.co.nz/asciidoc/ 

   e. txt2tags

   save\Txt2tags.man.htm

   use:
   >python d:\gVimPortable\txt2tags.py --target html cygwin.txt
   or 
   use windows ext 

   --END


