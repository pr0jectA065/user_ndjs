
verb="GET"
contentType="Content-Type:application/json"
endPoint="http://localhost:3000/retrievepw"

# header
appContext="http://gotestli.com/"

# request payload
userMeta=$(cat <<EOF
    {
        "userId":"bxpatel",
        "email":"i.do.prefer@gmail.com"
    }
EOF
)

command="curl -X "$verb" "
#command+="-i "
command+='-H "'$contentType'" '
command+='-H "appContext:'
command+=$appContext'" '
command+=$endPoint" "
command+="-d '"$userMeta"'"

echo $command
eval "$command"