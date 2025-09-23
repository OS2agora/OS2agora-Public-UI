
TargetFile=/app/public/.env
env |                                       # read entire environment of container
grep "^NEXT_PUBLIC_EXT" >> $TargetFile      # take only the variables that starts with this prefix
