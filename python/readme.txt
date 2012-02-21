python
========

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
