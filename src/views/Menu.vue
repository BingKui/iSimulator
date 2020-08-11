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
                    <MenuItem name="DevTools" icon="Menu_Devtools" @click="openTools" />
                </Col>
                <Col :span="6">
                    <MenuItem :name="isTop ? '取消置顶' : '窗口置顶'" icon="Menu_Fixed" @click="setWindowTop" :isAction="isTop" />
                </Col>
                <Col :span="6">
                    <MenuItem name="修改UA" icon="Menu_UserAgent" @click="openSetUserAgent" />
                </Col>
                <Col :span="6">
                    <MenuItem name="二维码" icon="Menu_Qrcode" @click="openUrlQrcode" />
                </Col>
                <Col :span="6">
                    <MenuItem name="关于" icon="Menu_About" @click="openAbout" />
                </Col>
            </Row>
        </ScrollBar>
        <SetUserAgent ref="setUserAgent" @closeMenu="secondaryMenuClose" />
        <UrlQrcode ref="urlqrcode" @closeMenu="secondaryMenuClose" />
        <About ref="about" @closeMenu="secondaryMenuClose" />
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
import About from './menu/About';
import { OpenDevTools, SetWinTop } from '@common/common';
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
        About,
    },
    data() {
        return {
            visible: false,
            isTop: false,
            isNoticyShowView: true,
        };
    },
    methods: {
        showMenu() {
            this.visible = true;
        },
        closeMenu() {
            this.visible = false;
        },
        drawerClosed() {
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
        openAbout() {
            this.$refs.about.show();
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
