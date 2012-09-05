#!/usr/bin/envs python
#-*- coding: utf-8 -*-#

"""SMS Exporter for android
Run on the phone and it will export SMSes into CSV format. Also can run on the PC.
In which case give path to storage folder as first parameter to the program.

Author: Kashif Iftikhar
License: BSD (do whatever you want with this code)

Last update: 18-Nov-2010
"""

import android
import os
from datetime import datetime
import codecs

STORAGE_FOLDER = '/sdcard/smses_backup/'
sms_attrs = [u'_id', u'thread_id', u'address', u'person', u'date', u'protocol',
             u'read', u'status', u'type', u'reply_path_present', u'subject',
             u'body', u'service_center']

def export_messages(boxname='inbox'):
    "Given the box export messages from it. Normally boxname is either inbox or sent"
    droid = android.Android()
    msgs = droid.smsGetMessages(False, boxname)

    now = datetime.now()

    if not os.path.exists(STORAGE_FOLDER):
        os.mkdir(STORAGE_FOLDER)

    filename = STORAGE_FOLDER + "smses_%s_%i-%i-%i.csv" % (boxname, now.year, now.month, now.day)
    #print("saving msgs to: %s" % filename)
    f = codecs.open(filename, 'w', 'utf-8')
    line = ''
    for attr in sms_attrs:
        line += '"%s",' % attr

    line = line[:-1] + "\n"
    f.write(line)

    if msgs.error is None:
        msgs = msgs.result
        for msg in msgs:
            line = ''
            for attr in sms_attrs:
                if attr in msg:
                    line += '"%s",' % msg[attr]
                else:
                    line += '"",'

            line = line[:-1] + "\n"
            f.write(line)

    f.close()

    droid.makeToast("%s Exported" % boxname)

if '__main__' == __name__:
    import sys
    if len(sys.argv)>1:
        STORAGE_FOLDER = sys.argv[1]

    export_messages('inbox')
    export_messages('sent')


