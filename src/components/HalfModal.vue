<template>
    <Drawer
        :visible.sync="visible"
        :with-header="false"
        direction="btt"
        :append-to-body="appendToBody"
        :custom-class="`half-modal ${customClass}`"
        :wrapperClosable="wrapperClosable"
        :size="size"
        @closed="drawerClosed"
    >
        <div class="modal-title">
            <div class="title-name">
                <img v-if="haveLogo" class="logo" :src="logoSrc" alt="">
                {{title}}
            </div>
            <div class="close-action" @click="closeAction">
                <ExtIcon name="Header_Close" @click="closeAction" title="关闭菜单" :size="18" />
            </div>
        </div>
        <div class="modal-content">
            <slot></slot>
        </div>
    </Drawer>
</template>

<script>
import { Drawer } from 'element-ui';
import ExtIcon from '@components/ExtIcon';
import logoSrc from '@assets/logo.png';
export default {
    name: 'HalfModal', // 半屏弹框
    components: {
        Drawer,
        ExtIcon,
    },
    props: {
        visible: Boolean,
        title: String,
        haveLogo: {
            type: Boolean,
            default: false,
        },
        appendToBody: {
            type: Boolean,
            default: false,
        },
        wrapperClosable: {
            type: Boolean,
            default: false,
        },
        customClass: String,
        size: {
            type: String,
            default: '450px',
        },
    },
    data() {
        return {
            logoSrc,
        };
    },
    methods: {
        closeAction() {
            this.$emit('update:visible', false);
        },
        drawerClosed() {
            this.$emit('halfClosed');
        },
    },
};
</script>

<style lang="less">
.half-modal {
    outline: none;
    border-top-left-radius: @half-border-radius;
    border-top-right-radius: @half-border-radius;
    background-color: @half-background-color !important;
    .modal-title {
        .p-v(@gap-md);
        .p-h(@gap-lg);
        .flex();
        justify-content: space-between;
        align-items: center;
        .border-line();
        height: @half-header-height;
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
    .modal-content {
        min-height: 100px;
    }
}
.el-drawer__container {
    background-color: rgba(0, 0, 0, .4);
    outline: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
</style>
