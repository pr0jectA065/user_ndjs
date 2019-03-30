#!/bin/bash

verb="POST"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/usr/prof"

# header information
token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZmYzMmRjYjA1MTk1NGM0NDFiZjRhNCIsImlhd"
token+="CI6MTU0MzQ1MTM1NiwiZXhwIjoxNTQzNTM3NzU2fQ.nlZZNrwk7RReMflinHtr_h0rkxlVN9F8oY7ue7scezY"

# request payload
userPrefJson=$(cat <<EOF
    {
        "userId":1,
        "age":22,
        "type":"publisher",
        "memType":"platinum",
        "interestCategories":["math","science"]
    }
EOF
)

command="curl -X "$verb" "
command+='-H "'$contentType:'" '
command+='-H "x-access-token:'
command+=$token'" '
command+=$endPoint" "
command+="-d '"$userPrefJson"'"

echo $command
eval "$command"