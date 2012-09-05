#!/usr/bin/env python

# extract SMS, write to std out

import os, sys, time
import sqlite3

DBFILE="PalmDatabase.db3"

# open database with sqlite3
if os.path.exists(DBFILE):
    conn = sqlite3.connect(DBFILE)
    c = conn.cursor()
else:
    print "No database"

classSent = 0;
classRcvd = 2;

# get all messages

currFrom = ()
recipDict = {}
nameDict = {}

for text, first, last, status, address, timeStamp in c.execute('''
SELECT com_palm_pim_FolderEntry.messageText,
com_palm_pim_Recipient.firstName,
com_palm_pim_Recipient.lastName,
com_palm_pim_FolderEntry.status,
com_palm_pim_Recipient.address,
com_palm_pim_FolderEntry.timeStamp
FROM com_palm_pim_FolderEntry
JOIN com_palm_pim_Recipient
ON (com_palm_pim_FolderEntry.id = com_palm_pim_Recipient.com_palm_pim_FolderEntry_id)
ORDER BY com_palm_pim_FolderEntry.timeStamp'''):
    # get rid of crap rows
    if (text == '' or status is None or (currFrom == () and first is None)):
        continue

# now state machine, iterate through

# save each
if not recipDict.has_key(address):
# no entries create lists
    recipDict[address] = []
    nameDict[address] = []

    recipDict[address].append((text, timeStamp))

if not (first is None and last is None):
    nameDict[address].append((first,last))


# now extract from dictionaries and print to stdout
for number, textList in recipDict.iteritems():
    print '%s %s: (%s)' % (nameDict[number][0][0], nameDict[number][0][1], number)

for text, timeStamp in textList:
    secs = int(timeStamp)/1000
    print ' %s %s' % (time.strftime("%a %d %b %y %H:%M",time.gmtime(secs)),text)
    print

