<template>
    <div class="v-log-item">
        <div class="log-title">
            <div class="log-version">v{{ log.version }}</div>
            <div class="log-date">{{ log.date }}</div>
        </div>
        <div class="log-content-list">
            <div class="log-content-item" v-for="item in log.logs" :key="item.content">
                <Tag class="content-type" :color="tagColor(item)">{{ item.type }}</Tag>
                <div class="content-value">{{ item.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Tag } from 'view-design';
export default {
    name: 'LogItem', // 日志项
    components: {
        Tag,
    },
    props: {
        log: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        tagColor() {
            return item => {
                let color = '';
                switch(item.type) {
                case 'add':
                    color = 'primary';
                    break;
                case 'update':
                    color = 'success';
                    break;
                case 'del':
                    color = 'error';
                    break;
                case 'fixed':
                    color = 'warning';
                    break;
                default:
                    color = 'default';
                    break;
                }
                return color;
            };
        },
    },
};
</script>

<style lang="less" scoped>
.v-log-item {
    .flex-column();
    .p(@gap-md);
    .p-b(0);
    &:last-child {
        .m-b(30);
    }
    .log-title {
        .flex-row-between();
        .m-b(@gap);
        .log-version {
            .font-size-lg();
            font-weight: @font-weight-bold;
            color: @title-color;
        }
        .log-date {
            .font-size();
        }
    }
    .log-content-item {
        display: flex;
        .m-b(@gap-sm);
        &:last-child {
            .m-b(0);
        }
        .content-type {
            width: 65px;
            .t-c();
        }
        .content-value {
            line-height: 22px;
            color: @content-color;
        }
    }
}
</style>
