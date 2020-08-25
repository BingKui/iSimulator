<template>
    <div class="v-menu-item" @click="menuClick">
        <div class="menu-icon">
            <ExtIcon :name="icon" :size="30" :color="isAction ? '#409EFF' : '#000000'" @click="menuClick" />
        </div>
        <div :class="`menu-name ${isAction ? 'action' : ''}`">{{name}}</div>
    </div>
</template>

<script>
import ExtIcon from '@components/ExtIcon';
export default {
    name: 'MenuItem', // 菜单
    components: {
        ExtIcon,
    },
    props: {
        name: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        isAction: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        menuClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="less">
.v-menu-item {
    cursor: pointer;
    .flex-column-center();
    user-select: none;
    .m-t(@gap-md);
    .menu-icon {
        width: 65px;
        height: 65px;
        background-color: white;
        .flex-center();
        border-radius: @gap-md;
    }
    .menu-name {
        font-size: 12px;
        .text-overflow();
        .m-t(@gap);
        color: @gray-darker;
        &.action {
            color: #409EFF;
        }
    }
    &:hover {
        .menu-icon {
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
    }
}
</style>
