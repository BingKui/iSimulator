<template>
    <Drawer
        :visible.sync="show"
        :with-header="false"
        direction="btt"
        :append-to-body="true"
        custom-class="half-modal"
        :wrapperClosable="wrapperClosable"
        @closed="drawerClosed"
    >
        <div class="modal-title">
            <div class="title-name">
                <img v-if="haveLogo" class="logo" src="../assets/logo.png" alt="">
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
export default {
    name: 'HalfModal', // 半屏弹框
    components: {
        Drawer,
        ExtIcon,
    },
    props: {
        show: Boolean,
        title: String,
        haveLogo: {
            type: Boolean,
            default: false,
        },
        wrapperClosable: {
            type: Boolean,
            default: false,
        },

    },
    methods: {
        closeAction() {
            this.$emit('closeModal');
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
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #EAEBEC;
    .modal-title {
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
