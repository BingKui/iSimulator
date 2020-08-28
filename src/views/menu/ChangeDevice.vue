<template>
    <HalfModal
        :haveLogo="false"
        title="修改模拟设备"
        :visible.sync="visible"
        :appendToBody="true"
        size="500px"
        customClass="v-change-device"
        @halfClosed="drawerClosed"
    >
        <div class="device-content">
            <Divider size="small" content-position="left">当前设备</Divider>
            <div class="device-info">
                <div class="name">名称：{{deviceInfo.name}}</div>
                <div class="name">尺寸：{{deviceInfo.width}}x{{deviceInfo.height}}</div>
                <div class="name">UserAgent：{{deviceInfo.ua}}</div>
            </div>
            <Divider size="small" content-position="left">支持设备</Divider>
            <ScrollBar class="divice-list-container">
                <Row class="divice-list" :gutter="10">
                    <Col :span="12" v-for="item in deviceList" :key="item.key">
                        <div class="divice-item" @click="changeDevice(item)">{{item.name}}</div>
                    </Col>
                </Row>
            </ScrollBar>
        </div>
    </HalfModal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Select, Divider, Row, Col, Card } from 'element-ui';
import HalfModal from '@components/HalfModal';
import ScrollBar from '@components/ScrollBar';
import { DEVICE_LIST } from '@constants/device';
import { SetDevice } from '@common/render';
import { TipSuccess, TipError } from '@common/tip';
export default {
    name: 'ChangeDevice',
    components: {
        HalfModal,
        Divider,
        Row,
        Col,
        ScrollBar,
        Card,
    },
    data() {
        return {
            visible: false,
            deviceList: DEVICE_LIST,
            isChange: false,
        };
    },
    computed: {
        ...mapState({
            deviceInfo: state => state.app.deviceInfo,
        }),
    },
    methods: {
        ...mapActions([
            'setDeviceInfo',
        ]),
        show() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
        changeDevice(item) {
            this.setDeviceInfo(item);
            this.isChange = true;
            this.close();
        },
        async drawerClosed() {
            this.$emit('closeMenu');
            if (this.isChange) {
                this.isChange = false;
                const flag = await SetDevice(this.deviceInfo);
                if (flag) {
                    TipSuccess(`修改为 ${this.deviceInfo.name} 成功！`);
                } else {
                    TipError(`修改为 ${this.deviceInfo.name} 失败！`);
                }
            }
        },
    },
};
</script>

<style lang="less">
.v-change-device {
    .device-content {
        .p-h(@gap-md);
        .el-divider__text {
            background-color: @half-background-color;
        }
    }
    .device-info {
        height: 105px;
        font-size: @font-size-sm;
    }
    .divice-list-container {
        height: 225px;
        .divice-list {
            .divice-item {
                .m-b(@gap);
                cursor: pointer;
                user-select: none;
                background-color: @white;
                .p(@gap-md);
                border-radius: @border-radius;
                &:hover {
                    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                }
                &:active {
                    background-color: rgba(0, 0, 0, 0.01);
                }
            }
        }
    }
}
</style>
