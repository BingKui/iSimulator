<template>
    <HalfModal
        :haveLogo="false"
        title="更新日志"
        :visible.sync="visible"
        :appendToBody="true"
        customClass="v-changelog"
        size="550px"
    >
        <ScrollBar class="changelog-content">
            <LogItem v-for="item in changeLogs" :key="item.version" :log="item" />
        </ScrollBar>
    </HalfModal>
</template>

<script>
import ScrollBar from '@components/ScrollBar.vue';
import HalfModal from '@components/HalfModal';
import LogItem from './LogItem.vue';
import CHANGE_LOG from '@constants/log';
export default {
    name: 'ChangeLog', // 关于
    components: {
        HalfModal,
        ScrollBar,
        LogItem,
    },
    data() {
        return {
            visible: false,
            changeLogs: CHANGE_LOG.reverse(),
        };
    },
    methods: {
        show() {
            this.visible = true;
        },
        close() {
            this.visible = false;
        },
    },
};
</script>

<style lang="less">
.v-changelog {
    .changelog-content {
        height: 490px;
        // background-color: #333;
    }
}
</style>
