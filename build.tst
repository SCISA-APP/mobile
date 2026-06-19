
//to get the current version
eas build:version:get

//to set a version
eas build:version:set

//ios build 
eas build --profile production --platform ios --non-interactive --auto-submit

//android build
eas build --profile production --platform android

//apk build
eas build --profile production-apk --platform android

//eas update
eas update --branch production --message "fix bug"