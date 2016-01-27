#!/bin/bash
if [ $# -ne 1 ]
then
  echo "Proper Usage:"
  echo "setup [TeamName]"
  exit
fi

git clone http://192.168.33.10/git/whisper.git $1
cd $1
git checkout -b $1
git push -u origin $1

chmod 777 reconnect.sh

echo "All Done!"
