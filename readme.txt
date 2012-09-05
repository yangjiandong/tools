日常工具
==========

1. cygwin

2. vim (for portable)

   --command-t
   --https://github.com/saberma/vimfiles
   --use pik,
   --pik sw 187
   --cd ..\vimfiles\bundle\Command-T\ruby\command-t

   set path=D:\ruby\RailsInstaller\DevKit\bin;D:\ruby\RailsInstaller\DevKit\mingw\bin;%path%
   make

   参考参考https://github.com/akitaonrails/vimfiles,
   终于解决vim bundle 插件在windows下的安装,所有文件放在d:/home/vimfiles下,
   新建文件_vimrc,内容source ~/vimfiles/vimrc 

   --irb and vi
   http://vimcasts.org/episodes/running-vim-within-irb/

   --vim python

   https://github.com/sophacles/vim-bundle-python

3. vcn 版本控制

4. 文档生成工具

   a. docbook

   java,ptyhon == 都支持,可参考 http://www.woodpecker.org.cn:9081/doc/XML/docbook_step_1.6.6/src/html/ 

   https://github.com/remko/docbook-kit

   参考 netty 项目,采用 mvn 插件 -- 中文处理有问题

   另一个工具: svn checkout http://hantsy-labs.googlecode.com/svn/trunk/dbktools dbktools 

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

   -- convert to pdf
   $ txt2tags -t tex filename.t2t
   $ pdflatex filename.tex

   -- install pdflatex
   http://www.oschina.net/code/explore/chromium.r67069/third_party/scons/scons-local/SCons/Tool/pdftex.py

   f. markdown

   convert tool: http://johnmacfarlane.net/pandoc/try 

   g. textile wiki

   eclipse,file extensions: *.textile, *.tracwiki, *.mediawiki, *.twiki, *.confluence,

   h. python Sphinx + cygwin
   
   http://sphinx.pocoo.org/index.html

   不错。手工安装

   example:https://github.com/gotgit/gotgithub ,介绍github 的文章
  

5. web

   cssmenu/

      visual css quickmenu unlock
         chrome\content\qm_visual.js(11377,95)
         chrome\content\qm_visual.js(13250,123)

      nodefire_api

   ext

   jquery

      cool jquery grid
      http://www.trirand.com/blog/jqgrid/jqgrid.html
      https://github.com/tonytomov/jqGrid

      easyui
      http://jquery-easyui.wikidot.com/

   nodejs

   css
      
      blueprint.html

   --END
