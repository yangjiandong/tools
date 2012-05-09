python
========

2012.05.09
----------

   1. Python 中一条语句解决「去重 tuple、list 类型的元素数据」，
   我经常使用这 2 种奇淫巧计
   （input = [1,2,3,4,3,2] ）。
   1:「 {}.fromkeys(input).keys() 」
   2:「 [x for x in input if x not in locals()['_[ 1 ]']] 」

   2. sphinx pdf
   other/sphinx.rst2pdf.txt

   3. python user dll
   ctypes:
import ctypes
# give location of dll
mydll = ctypes.cdll.LoadLibrary("C:\\demo.dll")

   http://starship.python.net/crew/theller/ctypes/tutorial.html 
   http://python.net/crew/theller/ctypes/tutorial.html 

   or swing,create c head to python 
   http://www.swig.org/translations/chinese/index.html

   pefile,read and work with Portable executable files
   https://code.google.com/p/pefile/ 

   4. pil for python2.7
   The _imagingft C module is not installed   
   -- 重新下载安装  http://www.lfd.uci.edu/~gohlke/pythonlibs/ 
   -- 900 k 的版本


2012.05.08
----------

   1. bpython,类似ipython,unix风格
   需要curses, http://www.lfd.uci.edu/~gohlke/pythonlibs/ 

   其他日常module
   pyflakes,rope,sphinx,numpy,scipy,matplotlib,pylint,pep8

   2. portable python2.7 自带比较好用的ide
   pyscripter

   3. 最新版 python-guide
   https://github.com/kennethreitz/python-guide
   fork版本不能同步？

2012.05.05
----------

   1. pyc,pyo

   批量生成pyc文件
   一般来说，我们的工程都是在一个目录下的，一般不会说仅仅编译一个py文件而已，而是需要把整个文件夹下的py文件都编译为pyc文件，python又为了我们提供了另一个模块：compileall 。使用方法如下：
   import compileall
   compileall.compile_dir(r’H:\game’)

compile_dir(dir[, maxlevels[, ddir[, force[, rx[, quiet]]]]])
dir 表示需要编译的文件夹位置
maxlevels 表示需要递归编译的子目录的层数，默认是10层，即默认会把10层子目录中的py文件编译为pyc
ddir 英文没明白，原文：it is used as the base path from which the filenames used in error messages will be generated。
force 如果为True，则会强制编译为pyc，即使现在的pyc文件是最新的，还会强制编译一次，pyc文件中包含有时间戳，python编译器会根据时间来决定，是否需要重新生成一次pyc文件
rx 表示一个正则表达式，比如可以排除掉不想要的目录，或者只有符合条件的目录才进行编译
quiet 如果为True，则编译后，不会在标准输出中，打印出信息

   如果需要特殊的单独编译，则只需要使用py_complie这个模块就行了，如下
import py_compile
py_compile.compile(r’H:\game\test.py’)
compile函数原型：
compile(file[, cfile[, dfile[, doraise]]])
file 表示需要编译的py文件的路径
cfile 表示编译后的pyc文件名称和路径，默认为直接在file文件名后加c 或者 o，o表示优化的字节码
dfile 错误消息保存的路径
doraise 可以是两个值，True或者False，如果为True，则会引发一个PyCompileError，否则如果编译文件出错，则会有一个错误，默认显示sys.stderr中，而不会引发异常

   2. list python installed module
   yolk -l

2012.04.23
----------

   1. virtualenv in win7
   >pip install virtualenv 
   >md v_env
   >cd v_env
   >virtualenv --distribute --no-site-packages MyNewEnv

   To use an environment, run the activate.bat batch file in the Scripts subdirectory of that environment
   other/Getting Started with Python on Heroku/Cedar.txt
   
   -- 不同版本
   virtualenv --python=c:\Python25\python.exe envname
   virtualenv --python=/usr/bin/python2.6 myvirtualenv
   
2012.04.19
----------

   1. Django 托管在 Github 上的实践
   other/django.github.conf.txt

2012.02.21
----------

   1. win7,python,django
   
   django-admin.py startproject mysite
   碰到的几个问题：
   1、无法找到django-admin.py文件？
   解决：django在安装完后，正常会将C:\Python25\Lib\site-packages\django\bin路径添加到path环境变量中，因而可以直接运行django-admin.py。
   但是，我正常安装完后并没有自动添加到环境变量，因此需要手动添加进去。

   2、django-admin.py startproject mysite命令没有创建mysite?
   
   解决：这个命令在XP下正常（我没试过），我用的win7，无法创建。这属于django的一个bug。
   方法是：修改注册表中 HKEY_CLASSES_ROOT\Applications\python.exe\shell\open\command项为：
   "C:\Python25\python.exe" "%1" %* （缺省情况下，没有后面的%*）
   (save/python.reg)

   弹出txt文件问题解决
   1.对一个.py文件右键-》打开方式-》选择python并勾住始终是用选择的程序打开这种文件。

2012.02.10
----------

1. python 编程规范
other/python.v2.txt

2. pylint
Windows 下的安装
确保 Python 的安装目录和相应的 Scripts 目录已经在环境变量 path 中
先到 http://pypi.python.org/pypi/pylint下载安装包，然后解压到某目录，这里假定在 D:/pylint-0.22.0
进入 D:/pylint-0.22.0 目录，然后在命令行执行以下指令：python setup.py install
在上一步会出错，但会报告成已经成功安装，这时候需要打开 D:/pylint-0.22.0/bin 目录，然后把那里的所有文件拷贝到 Python 的 Scripts 目录下（如：D:/Python26/Scripts）
在命令行尝试执行 pylint，如果输出帮助，则表示已经安装成功

与 PyDev 集成
PyDev 的安装略过...以下是集成配置的过程：
Window -> preferences -> Pydev -> Pylint,选中 "Use pylint?"
在 Location of pylint 处输入你安装的 lint.py 的地址，如：D:/pylint-0.22.0/lint.py
在下方的 Arguments to pass to pylint 处输入 --rcfile="E:/svn/misc/pylint.conf"，以使用自己的 pylintrc 配置
Project -> Properties -> PyDev?-PYTHONPATH 增添项目的源文件目录到"Project Source Folders"。

2011.12.15
----------

1. link 方式安装django

git clone https://github.com/django/django.git django.git
edit python/Lib/site-packages/django.pth
D:\workspace\python\django.s\django.git   

2011.12.08
----------

1. 跟踪一些python项目

other/example.txt

2. vim filter pyc
let NERDTreeIgnore = ['\.pyc$']

2011.12.07
----------

1. 华为面试题
http://meiowei.iteye.com/blog/438945
other/new2.txt

2011.11.27
----------

1. vim 

zo: 打开光标位置的折叠代码；
zc: 折叠光标位置的代码；
zr: 将文件中所有折叠的代码打开；
zm: 将文件中所有打开的代码折叠；
zR: 作用和 zr 类似，但会打开子折叠（折叠中的折叠）；
zM: 作用和 zm 类似，但会关闭子折叠；
zi: 折叠与打开操作之间的切换命令；

2011.11.25
----------

1. new python developer
Python面试题集合: http://www.douban.com/group/topic/21206826/
other/new.txt

2011.08.24
----------

1. win7 + cygwin
http://blog.adlibre.org/2011/01/11/how-to-install-and-setup-a-python-django-development-environment-on-windows-7/

cygwin install:
   python2.6
   gcc
   libjpeg-devel

install python setup tools:
   wget http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg#md5=bfa92100bd772d5a213eedd356d64086 
   ./setuptools-xx.egg

--暂时没有用
virutalenvwrapper:
   easy_install virtualenvwrapper 

2011.04.10
-----------

1. new install tool -> pip

http://pypi.python.org/pypi/pip/1.0#downloads

use easy_install show follow error:.. No urls, filenames, or requirements specified


   --END
