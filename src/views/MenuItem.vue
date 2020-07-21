<template>
    <div class="v-menu-item" @click="menuClick">
        <ExtIcon :name="icon" :size="30" @click="menuClick" />
        <div class="menu-name">{{name}}</div>
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
    },
    methods: {
        menuClick() {
            console.log('点击');
            this.$emit('click');
        },
    },
};
</script>

<style lang="less">
.v-menu-item {
    height: 80px;
    // width: 100px;
    border-radius: 4px;
    border: @border;
    cursor: pointer;
    .flex-column-center();
    background-color: white;
    user-select: none;
    .menu-name {
        font-size: 12px;
        .text-overflow();
    }
    &:hover {
        box-shadow: 0 0 8px #999;
    }
}
</style>
