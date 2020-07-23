<template>
    <div class="v-main">
        <div class="main-header">
            <div class="header-back" v-if="isCanBack" @click="goback">
                <ExtIcon name="Header_Back" @click="goback" title="菜单" :size="25" />
            </div>
            <div class="header-title">{{pageTitle}}</div>
            <div class="header-menu">
                <template v-if="isOpened">
                    <div class="menu-item">
                        <ExtIcon name="Header_Menu" @click="openMenu" title="菜单" :size="18" />
                    </div>
                    <div class="menu-item">
                        <ExtIcon name="Header_Close" @click="close" title="关闭" :size="18" />
                    </div>
                </template>
                <div v-else class="menu-item">
                    <ExtIcon name="Header_Exit" @click="exitApp" title="退出应用" :size="18" />
                </div>
            </div>
        </div>
        <div class="main-content" v-if="!isOpened">
            <div class="input-elment">
                <Input class="input-el" placeholder="输入url" size="large" type="textarea" :rows="4" v-model="url" />
                <Button class="open-action margin-top" type="primary" size="large" long @click="openUrl">打开链接</Button>
            </div>
            <template v-if="historyList && (historyList.length > 0)">
                <div class="history-name">历史记录</div>
                <ScrollBar class="history-list">
                    <HistoryItem v-for="item in historyList" :url="item.url" :id="item._id" :key="item._id" @openHistory="openBrowser" @delHistory="delHistory" />
                </ScrollBar>
            </template>
        </div>
        <div class="main-content-tip" v-else>
            <img class="test-logo" src="../assets/build.svg" alt="">
            <div class="test-text">debugging......</div>
        </div>
        <Menu ref="menu" @menuClose="menuClose" />
        <TipDialog ref="tipDialog" :url="tipUrl" @tipResult="isOpenUrl" />
    </div>
</template>

<script>
import { Button, Input } from 'element-ui';
import HistoryItem from './HistoryItem';
import ScrollBar from '@components/ScrollBar';
import ExtIcon from '@components/ExtIcon';
import Menu from './Menu';
import TipDialog from './TipDialog';
import { OpenBrowserView, CloseView, BindTitleChange,
    BindUrlChange, PageBack, HideView, ShowView, ExitApp, getClipboardValue } from '@common/common';
import { isUrl } from '@common/utils';
import { TipError, TipLoading } from '@common/tip';
import { addItem, getAllItems, delItem, getItemsByCondition } from '@common/db';
import DB_NAME from '@constants/db';
export default {
    name: 'Main', // 主页面
    components: {
        Button,
        Input,
        HistoryItem,
        ScrollBar,
        ExtIcon,
        Menu,
        TipDialog,
    },
    data() {
        const _this = this;
        return {
            pageTitle: 'Emulator',
            url: '',
            drawer: false,
            isOpened: false,
            isCanBack: false,
            isTop: false,
            historyList: [],
            tipUrl: '',
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
        this.getAllHistory();
        this.autoTip();
    },
    methods: {
        async openUrl() {
            const flag = /^((https|http)?:\/\/)/.test(this.url);
            if (isUrl(this.url)) {
                await this.openBrowser();
                // 查询是否已经保存到本地
                const res = await getItemsByCondition(DB_NAME.history, {}, { url: this.url });
                // 本地数据库添加记录
                !res && await addItem(DB_NAME.history, {
                    url: this.url
                });
            } else {
                TipError('不是正确的URL');
            }
        },
        async openBrowser(url) {
            await OpenBrowserView(url || this.url);
            this.isOpened = true;
        },
        async getAllHistory() {
            const list = await getAllItems(DB_NAME.history);
            console.log('获取所有历史记录：', list);
            this.historyList = list;
        },
        async delHistory(id) {
            await delItem(DB_NAME.history, id);
            await this.getAllHistory();
        },
        autoTip() {
            const value = getClipboardValue();
            console.log('value => url', value);
            if (isUrl(value)) {
                // 打开提示是否打开
                this.tipUrl = value;
                this.$refs.tipDialog.showTip();
            }
        },
        isOpenUrl(flag) {
            flag && this.openBrowser(this.tipUrl);
        },
        goback() {
            PageBack();
        },
        openMenu() {
            HideView();
            this.$refs.menu.showMenu();
        },
        menuClose() {
            ShowView();
        },
        async close() {
            await CloseView();
            Object.assign(this.$data, this.$options.data());
            await this.getAllHistory();
        },
        exitApp() {
            ExitApp();
        },
    },
};
</script>

<style lang="less">
.v-main {
    background-color: @background-color;
    height: 100vh;
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
            max-width: 40%;
            .text-overflow();
        }
        .header-menu {
            position: absolute;
            right: @gap;
            top: @gap-md;
            border: @border;
            height: 30px;
            .flex-row-center();
            border-radius: 4px;
            overflow: hidden;
            .menu-item {
                width: 30px;
                height: 30px;
                .flex-center();
                border-right: @border;
                &:last-child {
                    border-right: none;
                }
                &:active {
                    background-color: #999999;
                }
            }
        }
    }
    .main-content {
        .input-elment {
            .p(@gap-md);
        }
        .history-name {
            font-size: 14px;
            font-weight: bold;
            color: #000;
            padding: 0 @gap-md;
            user-select: none;
        }
        .history-list {
            height: 472px;
        }
    }
    .main-content-tip {
        display: flex;
        flex-direction: column;
        align-items: center;
        .test-logo {
            .m-v(30px);
            width: 200px;
        }
        .test-text {
            font-size: 14px;
        }
    }
}
</style>
