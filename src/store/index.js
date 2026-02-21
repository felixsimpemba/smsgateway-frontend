import { createStore } from 'vuex';
import auth from './modules/auth-module';
import logs from './modules/logs-module';
import apikeys from './modules/apikeys-module';
import sms from './modules/sms-module';
import contacts from './modules/contacts-module';
import stats from './modules/stats-module';
import senderids from './modules/senderids-module';

export default createStore({
    modules: {
        auth,
        logs,
        apikeys,
        sms,
        contacts,
        stats,
        senderids
    }
});
