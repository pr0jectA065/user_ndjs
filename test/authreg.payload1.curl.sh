verb="POST"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/auth/reg"

# request payload
authRegJson=$(cat <<EOF
    {
        "fname":"bhavesh",
        "lname":"patel",
        "email":"i.do.prefer@gmail.com",
        "phone":"111223333",
        "userId":"bxpatel",
        "pw":"bxpatel777",
        "appContext":"testli"
    }
EOF
)

command="curl -X "$verb" "
command+='-H "'$contentType'" '
command+=$endPoint" "
command+="-d '"$authRegJson"'"

echo $command
eval "$command"