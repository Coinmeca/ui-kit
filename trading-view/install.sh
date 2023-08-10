#!/bin/sh

remove_if_directory_exists() {
	if [ -d "$1" ]; then rm -Rf "$1"; fi
}

create_if_directory_does_not_exists() {
	if [ ! -d "$1" ]; then mkdir "$1"; fi
}

BRANCH="master";

REPOSITORY='https://github.com/coinmeca/trading-view/'

LATEST_HASH=$(git ls-remote $REPOSITORY $BRANCH | grep -Eo '^[[:alnum:]]+')

remove_if_directory_exists "$LATEST_HASH"

git clone -q --depth 1 -b "$BRANCH" $REPOSITORY "$LATEST_HASH"

create_if_directory_does_not_exists 'trading-view'

remove_if_directory_exists "trading-view/charting_library"
remove_if_directory_exists "trading-view/datafeeds"

cp -r "$LATEST_HASH/charting_library" "trading-view"
cp -r "$LATEST_HASH/datafeeds" "trading-view"

remove_if_directory_exists "$LATEST_HASH"