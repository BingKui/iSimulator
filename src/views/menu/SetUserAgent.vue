<template>
    <HalfModal
        :haveLogo="false"
        title="设置userAgent"
        :visible.sync="visible"
        :appendToBody="true"
        customClass="v-set-user-agent"
        @halfClosed="drawerClosed"
    >
        <div class="ua-input">
            <Input class="ua-value" placeholder="输入url" size="large" type="textarea" :rows="4" v-model="userAgent" />
            <Button class="set-action" type="primary" size="large" long @click="setSelfUserAgent">设置</Button>
        </div>
        <div class="ua-list">
            <Divider content-position="left">快捷设置</Divider>
            <Tag v-for="item in uaList" :key="item.name" @click="() => setUserAgentAction(item.value)">{{item.name}}</Tag>
        </div>
    </HalfModal>
</template>

<script>
import { Drawer, Row, Col, Tag, Divider, Button, Input } from 'element-ui';
import { USERAGENT_LIST } from '@constants/ua';
import { SetUserAgent } from '@common/common';
import HalfModal from '@components/HalfModal';
export default {
    name: 'SetUserAgent', // 设置UA
    components: {
        Drawer,
        Tag,
        Divider,
        Button,
        Input,
        HalfModal,
    },
    data() {
        return {
            visible: false,
            uaList: USERAGENT_LIST,
            userAgent: '',
        };
    },
    methods: {
        show() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
        drawerClosed() {
            this.$emit('closeMenu');
        },
        async setUserAgentAction(value) {
            console.log('设置UA==>', value);
            await SetUserAgent(value);
            this.close();
        },
        async setSelfUserAgent() {
            await this.setUserAgentAction(this.userAgent);
        },
    },
};
</script>

<style lang="less">
.v-set-user-agent {
    .ua-input {
        .m(@gap);
        .set-action {
            .m-t(@gap);
        }
    }
    .ua-list {
        .m(@gap);
        .el-tag {
            .m-r(@gap);
            cursor: pointer;
        }
        .el-divider__text {
            background-color: @half-background-color;
        }
    }
}
</style>
