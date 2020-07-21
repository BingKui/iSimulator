<template>
    <div class="v-mouse-right">
        <div class="mouse-content" v-contextmenu:contextmenu>
            <slot></slot>
        </div>
        <Contextmenu v-if="mouseData && mouseData.length > 0" ref="contextmenu">
            <ContextmenuItem v-for="(item, i) in mouseData" :key="i" @click="() => item.action(mouseKey)">{{item.text}}</ContextmenuItem>
        </Contextmenu>
    </div>
</template>

<script>
// 基础版右键菜单封装，支持单层右键菜单，不可分组，不存在层级
import { directive, Contextmenu, ContextmenuItem } from 'v-contextmenu';
import 'v-contextmenu/dist/index.css';
export default {
    name: 'MouseRight',
    components: {
        Contextmenu,
        ContextmenuItem,
    },
    props: {
        mouseData: {
            type: Array,
            default() {
                return []; // 数组对象相应结构：{text: '赋值', action: () => {}}
            },
        },
        mouseKey: [String, Number, Object], // 鼠标事件返回需要的数据，选中相应操作都会把相应的数据返回
    },
    directives: {
        contextmenu: directive,
    },
};
</script>

<style lang="less" scoped>
.v-contextmenu {
    .p(0);
    border: none;
    overflow: hidden;
    .v-contextmenu-divider {
        .m(0);
    }
    .v-contextmenu-item {
        min-width: 50px;
        .p-h(@gap-md);
        .p-v(@gap);
    }
}
</style>

