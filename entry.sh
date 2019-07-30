#!/bin/sh

# First run of script
echo First run...
/app/script.js > /proc/1/fd/1 2>/proc/1/fd/2

# Start cron
echo Starting cron...
/usr/sbin/crond -f -l 8
