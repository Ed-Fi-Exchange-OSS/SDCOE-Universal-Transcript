#!/bin/bash


pushd '/opt/sdcoe-transcript/transcript-api' || (echo "dir not found" && exit)

yarn setup-cron

popd || (echo "Could not popd" && exit)

echo "Task done at $(date)"
