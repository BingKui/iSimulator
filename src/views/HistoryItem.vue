<template>
    <div class="v-history-item">
        <div class="url-value">{{url}}</div>
        <div class="btn-list">
            <Button type="primary" @click="openHistory">打开</Button>
            <Button type="error" @click="delHistory">删除</Button>
        </div>
    </div>
</template>

<script>
import { Card, Button } from 'view-design';
export default {
    name: 'HistoryItem', // 历史记录
    props: {
        url: String,
        id: String,
    },
    components: {
        Card,
        Button,
    },
    methods: {
        openHistory() {
            this.$emit('openHistory', this.$props.url);
        },
        delHistory() {
            this.$emit('delHistory', this.$props.id);
        },
    },
};
</script>

<style lang="less">
.v-history-item {
    border: @border;
    border-radius: 4px;
    .p(@gap);
    background-color: @white;
    .m(@gap-md);
    .m-b(@gap);
    .url-value {
        font-size: 14px;
        font-weight: bold;
        .m-b(@gap);
        word-break: break-all;
    }
    .btn-list {
        display: flex;
        .ivu-btn {
            .m-r(@gap);
        }
    }
    &:hover {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
}
</style>
