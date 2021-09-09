# The script finds all chrome processes 
# and checks if it has been running for more than 300 seconds
# and kills those processes

kill -9 $(ps -eo comm,pid,etimes | awk '/^chrome/ {if ($3 > 300) { print $2}}')
