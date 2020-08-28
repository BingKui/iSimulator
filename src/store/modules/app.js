import { DEVICE_LIST } from '@constants/device';
const app = {
    state: {
        deviceInfo: DEVICE_LIST[1],
    },
    mutations: {
        SET_DEVICE_INFO: (state, deviceInfo) => {
            Object.assign(state, {
                deviceInfo,
            });
        }
    },
    actions: {
        setDeviceInfo: ({ commit }, info) => {
            commit('SET_DEVICE_INFO', info);
        },
        resetDeviceInfo: ({ commit }) => {
            commit('SET_DEVICE_INFO', DEVICE_LIST[1]);
        },
    }
};

export default app;
