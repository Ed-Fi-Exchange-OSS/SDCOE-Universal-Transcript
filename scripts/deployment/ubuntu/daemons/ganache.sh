#!/bin/bash
# A simple script to start ganache instance using ganache-cli
# Prerequisite:
#   - ganache-cli: Install by typing `npm -g i ganache-cli` or `yarn global add ganache-cli`
#
# Required environment variables
#   - BLOCKCHAIN_DATA_PATH
#   - BLOCKCHAIN_NODE_PORT
#   - BLOCKCHAIN_MNEMONIC
#
# Usage:
# ./ganache.sh          (asks confirmation messages)
# ./ganache.sh --yes    (doesn't ask confirmation messages)
#

FLAG=$1

# Setup Variables
BLOCKCHAIN_DATA_PATH="$BLOCKCHAIN_DATA_PATH"

BLOCKCHAIN_NODE_PORT="$BLOCKCHAIN_NODE_PORT"
BLOCKCHAIN_MNEMONIC="$BLOCKCHAIN_MNEMONIC"
BLOCKCHAIN_NUM_ACCOUNTS=1

echo "Starting Ganache..."

# Check if ganache instance is already running
ganache_pid="$(lsof -t -i:$BLOCKCHAIN_NODE_PORT)"
if [ $ganache_pid ]; then
    echo "Ganache already running on port: $BLOCKCHAIN_NODE_PORT, with process id: $ganache_pid"

    # Reference: http://kb.ictbanking.net/article.php?id=483&oid=5
    while true; do

        if [ "$FLAG" == "--yes" ]; then
            yn="y"
        else
            read -p "Do you wish to close previous Ganache instance and start a new one? [y/n] " yn
        fi

        case $yn in
        [Yy]*)
            kill $ganache_pid
            break
            ;;
        [Nn]*) exit ;;
        *) echo "Please answer yes or no." ;;
        esac
    done

    echo "Previous Ganache killed"
fi

echo "Starting a new instance..."
ganache-cli --port $BLOCKCHAIN_NODE_PORT --account_keys_path "$BLOCKCHAIN_DATA_PATH"/keys.json --accounts $BLOCKCHAIN_NUM_ACCOUNTS --mnemonic "$BLOCKCHAIN_MNEMONIC" || exit

echo "Ganache started on port $BLOCKCHAIN_NODE_PORT"

exit
