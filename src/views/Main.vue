<template>
    <div class="v-main">
        <div class="main-header">
            <div class="header-back" v-if="isCanBack" @click="goback">
                <Icon type="ios-arrow-back" size="25" />
            </div>
            <div class="header-title">{{pageTitle}}</div>
            <div class="header-menu" v-if="isOpened">
                <div class="menu-item">
                    <Icon type="ios-more" @click="openMenu" title="DevTools" size="25" />
                </div>
                <div class="menu-item">
                    <Icon type="md-close" @click="close" title="关闭" size="25" />
                </div>
            </div>
        </div>
        <div class="main-content" v-if="!isOpened">
            <Input placeholder="输入url" size="large" type="textarea" :rows="4" v-model="url" />
            <Button class="margin-top" type="primary" size="large" long @click="openUrl">打开链接</Button>
        </div>
        <Drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false"
            direction="ttb"
            :append-to-body="true"
            custom-class="menu-element"
        >
            <div class="menu-list">
                <div class="menu-item" @click="openTools" title="打开DevTools">
                    <Icon type="ios-hammer-outline" size="20" />
                </div>
            </div>
            <div class="close-menu" @click="closeMenu">
                <Icon type="md-close" color="red" title="关闭菜单" size="25" />
            </div>
        </Drawer>
    </div>
</template>

<script>
import { Button, Divider, Input, Message, Icon } from 'view-design';
import { Drawer, Card } from 'element-ui';
import { OpenBrowserView, OpenDevTools, CloseView, BindTitleChange, BindUrlChange, PageBack } from '@common/common';
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
    },
    data() {
        return {
            pageTitle: '模拟器',
            url: '',
            drawer: false,
            isOpened: false,
            isCanBack: false,
        };
    },
    mounted() {
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
                    content: '加载中...'
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
            this.drawer = true;
        },
        closeMenu() {
            this.drawer = false;
        },
        openTools() {
            OpenDevTools();
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
            top: @gap;
            border: @border;
            height: 40px;
            width: 100px;
            .p-h(@gap);
            .flex-row-center();
            border-radius: 40px;
            overflow: hidden;
            .menu-item {
                width: 40px;
                height: 40px;
                border-radius: 40px;
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
.menu-element {
    height: 60px;
    outline: none;
    .menu-list {
        overflow-x: auto;
        overflow-y: hidden;
        padding: @gap;
        .menu-item {
            height: 40px;
            width: 40px;
            line-height: 40px;
            border-radius: 4px;
            border: @border;
            cursor: pointer;
            display: inline-block;
            .flex-center();
            .m-r(@gap-sm);
            background-color: white;
            &:hover {
                box-shadow: 0 0 8px #999;
            }
        }
    }
    .close-menu {
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>
