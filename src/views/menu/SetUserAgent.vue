<template>
    <Drawer
        :visible.sync="drawer"
        :with-header="false"
        direction="btt"
        :append-to-body="true"
        custom-class="v-set-user-agent"
        :wrapperClosable="false"
        size="60%"
        @closed="drawerClosed"
    >

        <Divider content-position="left">快捷设置</Divider>
    </Drawer>
</template>

<script>
import { Drawer, Row, Col, Tag, Divider } from 'element-ui';
export default {
    name: 'SetUserAgent', // 设置UA
    components: {
        Drawer,
        Tag,
        Divider,
    },
};
</script>

<style lang="less">
.v-set-user-agent {

}
</style>
