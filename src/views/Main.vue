<template>
    <div class="v-main">
        <div class="main-header">
            <div class="header-back" v-if="isCanBack" @click="goback">
                <Icon type="ios-arrow-back" size="25" />
            </div>

            <div class="header-title">{{pageTitle}}</div>
            <div class="header-menu" v-if="isOpened">
                <div class="menu-item">
                    <Icon type="ios-more" @click="openMenu" title="DevTools" size="20" />
                </div>
                <div class="menu-item">
                    <Icon type="md-close" @click="close" title="关闭" size="20" />
                </div>
            </div>
        </div>
        <div class="main-content" v-if="!isOpened">
            <Input placeholder="输入url" size="large" type="textarea" :rows="4" v-model="url" />
            <Button class="margin-top" type="primary" size="large" long @click="openUrl">打开链接</Button>
        </div>
        <div class="main-content" v-else>
            页面调试中
        </div>
        <Drawer
            title="我是标题"
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
                <div class="title-name">菜单</div>
                <div class="close-action" @click="closeMenu">
                    <Icon type="md-close" title="关闭菜单" size="25" />
                </div>
            </div>
            <div class="menu-list">
                <Row :gutter="15">
                    <Col span="6">
                        <MenuItem name="DevTools" icon="Menu_Devtools" @click="openTools" />
                    </Col>
                    <Col span="6">
                        <MenuItem :name="this.isTop ? '取消置顶' : '窗口置顶'" icon="Menu_Fixed" @click="setWindowTop" />
                    </Col>
                </Row>
            </div>
        </Drawer>
    </div>
</template>

<script>
import { Button, Divider, Input, Message, Icon, Row, Col } from 'view-design';
import { Drawer, Card } from 'element-ui';
import MenuItem from './MenuItem';
import { OpenBrowserView, OpenDevTools, CloseView, BindTitleChange,
    BindUrlChange, PageBack, SetWinTop, HideView, ShowView } from '@common/common';
import { TipError, TipLoading } from '@common/tip';
export default {
    name: 'Main', // 主页面
    components: {
        Button,
        Divider,
        Input,
        Icon,
        Drawer,
        Card,
        MenuItem,
        Row,
        Col,
    },
    data() {
        const _this = this;
        return {
            pageTitle: '模拟器',
            url: '',
            drawer: false,
            isOpened: false,
            isCanBack: false,
            isTop: false,
            menuList: [{
                name: 'DevTools',
                icon: 'Menu_Devtools',
                action: () => {
                    // _this.openTools();
                    OpenDevTools();
                    this.closeMenu();
                },
            }, {
                name: this.isTop ? '取消置顶' : '置顶',
                icon: 'Menu_Fixed',
                action: () => {
                    _this.setWindowTop();
                },
            }],
        };
    },
    mounted() {
        this.close();
        const _this = this;
        BindTitleChange(title => {
            _this.pageTitle = title;
        });
        BindUrlChange(flag => {
            _this.isCanBack = flag;
        });
    },
    methods: {
        async openUrl() {
            const flag = /^((https|http)?:\/\/)/.test(this.url);
            if (flag) {
                Message.loading({
                    content: '加载中...',
                    top: '15',
                });
                const result = await OpenBrowserView(this.url);
                this.isOpened = true;
            } else {
                TipError('不是正确的URL');
            }
        },
        goback() {
            PageBack();
        },
        openMenu() {
            HideView();
            this.drawer = true;
        },
        closeMenu() {
            this.drawer = false;
        },
        drawerClosed() {
            ShowView();
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
        async close() {
            await CloseView();
            Object.assign(this.$data, this.$options.data());
        },
    },
};
</script>

<style lang="less">
.v-main {
    .margin-top {
        .m-t(@gap);
    }
    .main-header {
        width: 100%;
        height: 60px;
        -webkit-app-region: drag;
        background-color: #F1F3F4;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .header-back {
            position: absolute;
            left: @gap-sm;
            top: @gap;
            height: 40px;
            width: 40px;
            .flex-center();
            border-radius: 40px;
            &:active {
                background-color: #999999;
            }
        }
        .header-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            user-select: none;
        }
        .header-menu {
            position: absolute;
            right: @gap-sm;
            top: @gap-md;
            border: @border;
            height: 30px;
            width: 60px;
            .flex-row-center();
            border-radius: 4px;
            overflow: hidden;
            .menu-item {
                width: 30px;
                height: 30px;
                .flex-center();
                &:active {
                    background-color: #999999;
                }
            }
        }
    }
    .main-content {
        padding: 20px;
    }
}
.el-drawer__container {
    background-color: rgba(0, 0, 0, .4);
    outline: none;
}
.menu-element {
    outline: none;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .menu-title {
        padding-top: @gap-md;
        height: 40px;
        .p-h(@gap-lg);
        .flex();
        justify-content: space-between;
        align-items: center;
        .title-name {
            font-size: 18px;
            font-weight: bold;
            user-select: none;
        }
        .close-action {
            cursor: pointer;
        }
    }
    .menu-list {
        overflow-x: auto;
        overflow-y: hidden;
        padding: @gap-md;
    }
}
</style>
