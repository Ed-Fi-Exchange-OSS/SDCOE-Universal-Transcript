
echo "Setting up cron"
cd /opt/sdcoe-transcript/scripts/schedules/ || exit

mkdir -p /etc/cron.d
mkdir -p /var/log/cron
cp cron/sdcoe_per_minute /etc/cron.d

# Alternative approach
# Thanks to https://unix.stackexchange.com/a/297377
#if [[ $(crontab -l | egrep -v "^(#|$)" | grep -q 'sdcoe-process'; echo $?) == 1 ]]
#then
#    echo "1" | crontab -e
#    set -f
#    echo "$(crontab -l ; echo "* * * * * ${SDCOE_CRON_COMMAND}")" | crontab -
#    set +f
#fi