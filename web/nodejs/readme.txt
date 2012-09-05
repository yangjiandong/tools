node.js
=======

2011.09.09
----------

   1. 0.5.5 Can't open .lib file: default/libnode.dll.a 

   https://github.com/joyent/node/issues/1599
   running "mkdir -p out/default" before "make" resolves this problem

   2. npm

   curl http://npmjs.org/install.sh | sh
   npm install jsdom
   npm install htmlparser
   npm install express
   npm install connect
   --安装Nodejs-kissy：
   npm install kissy
   
2011.08.18
-----------

   1. cygwin insall nodejs

   git clone http://github.com/joyent/node.git
   cd node
   git fetch --all
   git tag
   git co [last tag]
   ./configure
   make
   make install
   
Unable to Remap to Same Address as Parent
fatal error – unable to remap \\?\C:\cygwin\lib\python2.6\lib-dynload\time.dll to same address as parent: 0×360000 != 0×3E0000
This is not an issue with node.js either. Install base -> rebase using setup.exe first then close all Cygwin instances. Using dash or ash as a shell run ):
$ /bin/rebaseall -v
Once you are done, restart your PC.
(on vista: 1. close the cygwin shell 2. type cmd in the search box of the start menu. 3. type cd cygwin/bin 4. type ash 5. type ./rebaseall -v)

If, during the “configure” step, you get the following error: “error: could not configure a cxx compiler!” Do the following:

Close your Cygwin terminal.
Start -> Run -> ash
/bin/rebaseall
Close ash, re-open your Cygwin shell, and try again.

rebaseall:'/cygdrive/c/Users/ADMINI~1/AppData/Local/Temp' is not writable
Open up a Cygwin shell and run:

$ chmod 777 ~/AppData/Local/Temp

   -- 注意，以上操作需用cygwin.bat 进入


   --END


