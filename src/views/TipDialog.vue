<template>
    <HalfModal
        title="检测到复制的地址"
        :visible.sync="isShow"
        customClass="tip-dialog-element"
        size="30%"
        @halfClosed="drawerClosed"
    >
        <div class="content-url">{{urlValue}}</div>
        <Row class="action-list" :gutter="15">
            <Col :span="12">
                <Button @click="cancelTip">取消</Button>
            </Col>
            <Col :span="12">
                <Button type="primary" @click="openUrl">打开</Button>
            </Col>
        </Row>
    </HalfModal>
</template>

<script>
import { Button, Row, Col } from 'element-ui';
import ExtIcon from '@components/ExtIcon';
import HalfModal from '@components/HalfModal';
export default {
    name: 'TipDialog', // 提示框
    components: {
        Button,
        Row,
        Col,
        ExtIcon,
        HalfModal,
    },
    data() {
        return {
            urlValue: '',
            isShow: false,
            isOpen: false,
        };
    },
    methods: {
        showTip(value) {
            this.urlValue = value;
            this.isShow = true;
        },
        closeTip() {
            this.isShow = false;
        },
        cancelTip() {
            this.isOpen = false;
            this.closeTip();
        },
        openUrl() {
            this.isOpen = true;
            this.closeTip();
        },
        drawerClosed() {
            this.$emit('tipResult', this.isOpen ? this.urlValue : false);
        },
    },
};
</script>

<style lang="less" scope>
.tip-dialog-element {
    outline: none;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #EAEBEC;
    .title {
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
    .content-url {
        font-size: 16px;
        .p(@gap-md);
        word-break: break-all;
    }
    .action-list {
        .p(@gap-md);
        .el-button {
            width: 100%;
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
