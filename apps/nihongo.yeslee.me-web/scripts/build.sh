#!/bin/sh
docker build -t nihongo.yeslee.me-web .
docker image prune -f
