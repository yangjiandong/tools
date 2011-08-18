node.js
=======

2011.08.18
-----------

   1. cygwin insall nodejs

Unable to Remap to Same Address as Parent
fatal error – unable to remap \\?\C:\cygwin\lib\python2.6\lib-dynload\time.dll to same address as parent: 0×360000 != 0×3E0000
This is not an issue with node.js either. Install base -> rebase using setup.exe first then close all Cygwin instances. Using dash or ash as a shell run ):
$ /bin/rebaseall -v
Once you are done, restart your PC.
(on vista: 1. close the cygwin shell 2. type cmd in the search box of the start menu. 3. type cd cygwin/bin 4. type ash 5. type ./rebaseall -v)

   --END


