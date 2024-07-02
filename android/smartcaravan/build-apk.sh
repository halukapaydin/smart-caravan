#!/bin/bash
cd ./android
./gradlew assembleRelease
cd ..
cp ./android/app/build/outputs/apk/release/*.apk .