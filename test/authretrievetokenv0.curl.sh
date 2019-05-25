#!/bin/bash

verb="GET"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/auth/me/v0"

# header
token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYzUzZTBlMmNjZDAxNDc1ZTNjYmI2NyIsImlhd"
token+="CI6MTU1NjQzMDM1MCwiZXhwIjoxNTU2NTE2NzUwfQ.pil4_NAHURHw-ibIrZ-EZKWApg-7L3US8oBoNw4CENE"

command="curl -X "$verb" "
command+='-H "'$contentType:'" '
command+='-H "x-access-token:'
command+=$token'" '
command+=$endPoint" "

echo $command
eval "$command"