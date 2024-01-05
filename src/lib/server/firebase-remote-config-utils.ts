import * as admin  from 'firebase-admin';

enum RemoteConfigOptions {
    isSurveyModeOn = 'isSurveyModeOn'
}


export async function get () {

    admin.remoteConfig().

}
