<template>
    <HalfModal
        :haveLogo="true"
        title="菜单"
        :visible.sync="visible"
        customClass="menu-element"
        size="450px"
        @halfClosed="drawerClosed"
    >
        <ScrollBar class="menu-list">
            <Row class="menu-content">
                <Col :span="6">
                    <MenuItem :name="isTop ? '取消置顶' : '窗口置顶'" icon="Menu_Fixed" @click="setWindowTop" :isAction="isTop" />
                </Col>
                <template v-if="isApp">
                    <Col :span="6">
                        <MenuItem name="更新日志" icon="Menu_ChangeLog" @click="openChangeLog" />
                    </Col>
                    <Col :span="6">
                        <MenuItem name="关于" icon="Menu_About" @click="openAbout" />
                    </Col>
                </template>
                <template v-else>
                    <Col :span="6">
                        <MenuItem name="DevTools" icon="Menu_Devtools" @click="openTools" />
                    </Col>
                    <Col :span="6">
                        <MenuItem name="刷新" icon="Menu_Refresh" @click="refreshPage" />
                    </Col>
                    <Col :span="6">
                        <MenuItem name="修改模拟设备" icon="Menu_Device" @click="openChangeDevice" />
                    </Col>
                    <Col :span="6">
                        <MenuItem name="二维码" icon="Menu_Qrcode" @click="openUrlQrcode" />
                    </Col>
                    <Col :span="6">
                        <MenuItem name="Url" icon="Menu_Url" @click="openUrlParam" />
                    </Col>
                </template>
            </Row>
        </ScrollBar>
        <SetUserAgent ref="setUserAgent" @closeMenu="secondaryMenuClose" />
        <UrlQrcode ref="urlqrcode" @closeMenu="secondaryMenuClose" />
        <UrlParam ref="urlparam" @closeMenu="secondaryMenuClose" />
        <About ref="about" @closeMenu="secondaryMenuClose" />
        <ChangeDevice ref="changeDevice" @closeMenu="secondaryMenuClose" />
        <ChangeLog ref="changelog" @closeMenu="secondaryMenuClose" />
    </HalfModal>
</template>

<script>
import { Drawer, Row, Col } from 'element-ui';
import HalfModal from '@components/HalfModal';
import MenuItem from './menu/MenuItem';
import ExtIcon from '@components/ExtIcon';
import ScrollBar from '@components/ScrollBar';
import SetUserAgent from './menu/SetUserAgent';
import UrlQrcode from './menu/UrlQrcode';
import UrlParam from './menu/UrlParam';
import About from './menu/About';
import ChangeDevice from './menu/ChangeDevice';
import ChangeLog from './menu/ChangeLog';
import { OpenDevTools, SetWinTop, PageRefresh } from '@common/render';
import { TipSuccess } from '@common/tip';
export default {
    name: 'Menu', // 菜单
    components: {
        HalfModal,
        Drawer,
        MenuItem,
        Row,
        Col,
        ExtIcon,
        ScrollBar,
        SetUserAgent,
        UrlQrcode,
        UrlParam,
        About,
        ChangeDevice,
        ChangeLog,
    },
    data() {
        return {
            visible: false,
            isTop: false,
            isApp: false,
            isNoticyShowView: true,
        };
    },
    methods: {
        showMenu(isApp = false) {
            this.isApp = isApp;
            this.visible = true;
        },
        closeMenu() {
            this.visible = false;
        },
        drawerClosed() {
            if (this.isApp) return;
            this.isNoticyShowView && this.$emit('menuClose');
        },
        openTools() {
            OpenDevTools();
            this.closeMenu();
        },
        setWindowTop() {
            this.isTop = !this.isTop;
            SetWinTop(this.isTop);
            this.closeMenu();
        },
        refreshPage() {
            setTimeout(async () => {
                const flag = await PageRefresh();
                if (flag) TipSuccess('刷新成功！');
            }, 300);
            this.closeMenu();
        },
        openChangeDevice() {
            this.$refs.changeDevice.show();
            this.isNoticyShowView = false;
            this.closeMenu();
        },
        openSetUserAgent() {
            this.$refs.setUserAgent.show();
            this.isNoticyShowView = false;
            this.closeMenu();
        },
        secondaryMenuClose() {
            this.isNoticyShowView = true;
            this.drawerClosed();
        },
        openUrlQrcode() {
            this.$refs.urlqrcode.show();
            this.isNoticyShowView = false;
            this.closeMenu();
        },
        openUrlParam() {
            this.$refs.urlparam.show();
            this.isNoticyShowView = false;
            this.closeMenu();
        },
        openAbout() {
            this.$refs.about.show();
            this.isNoticyShowView = false;
            this.closeMenu();
        },
        openChangeLog() {
            this.$refs.changelog.show();
            this.isNoticyShowView = false;
            this.closeMenu();
        },
    },
};
</script>

<style lang="less">
.menu-element {
    .menu-list {
        // .p(@gap);
        height: calc(@half-height - @half-header-height);
        .menu-content {
            .m(@gap);
        }
    }
}
</style>
