#!/bin/sh
set -e

# make sure to set the .env file according to current values before running application
source create_env_file.sh

# call the docker-entrypoint.sh defined as default entrypoint for the nodejs image and pass the same variables as it would normally receive
set -- docker-entrypoint.sh "$@"
exec "$@"
