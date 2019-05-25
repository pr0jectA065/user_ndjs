verb="POST"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/auth/reg"

# request payload
authRegJson=$(cat <<EOF
    {
        "fname":"rupal",
        "lname":"patel",
        "email":"RUPAL@GMAILXXXXCCCC.com",
        "phone":"4445556666",
        "userId":"rxpatel",
        "pw":"rxpatel"
    }
EOF
)

command="curl -X "$verb" "
command+='-H "'$contentType'" '
command+=$endPoint" "
command+="-d '"$authRegJson"'"

echo $command
eval "$command"