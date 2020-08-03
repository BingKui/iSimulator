<template>
    <Drawer
        :visible.sync="drawer"
        :with-header="false"
        direction="btt"
        :append-to-body="true"
        custom-class="menu-element"
        :wrapperClosable="false"
        size="60%"
        @closed="drawerClosed"
    >
        <div class="menu-title">
            <div class="title-name"><img class="logo" src="../assets/logo.png" alt="">菜单</div>
            <div class="close-action" @click="closeMenu">
                <ExtIcon name="Header_Close" @click="closeMenu" title="关闭菜单" :size="18" />
            </div>
        </div>
        <ScrollBar class="menu-list">
            <Row class="menu-content">
                <Col :span="6">
                    <MenuItem name="DevTools" icon="Menu_Devtools" @click="openTools" />
                </Col>
                <Col :span="6">
                    <MenuItem :name="this.isTop ? '取消置顶' : '窗口置顶'" icon="Menu_Fixed" @click="setWindowTop" />
                </Col>
                <Col :span="6">
                    <MenuItem name="修改UA" icon="Menu_UserAgent" @click="openSetUserAgent" />
                </Col>
            </Row>
        </ScrollBar>
    </Drawer>
</template>

<script>
import { Drawer, Row, Col } from 'element-ui';
import MenuItem from './menu/MenuItem';
import ExtIcon from '@components/ExtIcon';
import ScrollBar from '@components/ScrollBar';
import { OpenDevTools, SetWinTop } from '@common/common';
export default {
    name: 'Menu', // 菜单
    components: {
        Drawer,
        MenuItem,
        Row,
        Col,
        ExtIcon,
        ScrollBar,
    },
    data() {
        return {
            drawer: false,
            isTop: false,
        };
    },
    methods: {
        showMenu() {
            this.drawer = true;
        },
        closeMenu() {
            this.drawer = false;
        },
        drawerClosed() {
            this.$emit('menuClose');
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
        openSetUserAgent() {},
    },
};
</script>

<style lang="less">
.menu-element {
    outline: none;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #EAEBEC;
    .menu-title {
        .p-v(@gap-md);
        .p-h(@gap-lg);
        .flex();
        justify-content: space-between;
        align-items: center;
        border-bottom: @border;
        .title-name {
            font-size: 18px;
            font-weight: bold;
            user-select: none;
            .flex();
            align-items: center;
            .logo {
                width: 30px;
                height: 30px;
                .m-r(@gap);
            }
        }
        .close-action {
            cursor: pointer;
        }
    }
    .menu-list {
        overflow-x: auto;
        overflow-y: hidden;
        height: 375px;
        .menu-content {
            .p-h(@gap);
        }
    }
}
.el-drawer__container {
    background-color: rgba(0, 0, 0, .4);
    outline: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
</style>
