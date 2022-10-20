#!/bin/bash
#typesinstaller.sh - tiny @types installer

RED='\033[0;31m'
NC='\033[0m' 

npm $1 $2
type="@types/$2"
ALERT = echo -e "${RED}${type} has been deprecated. Do you want to proceed? ${NC}(y/n)"

if [[ $1 == "install" ]]
    then
    npm show ${type} | grep -q 'DEPRECATED' &&
    read -p "${ALERT}" choice
    case $choice in
        y|Y ) npm $1 ${type};;
        n|N ) exit;;
        * ) exit;;
    esac
else
    npm $1 ${type}
fi