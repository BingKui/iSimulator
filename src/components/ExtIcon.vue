<template>
    <i :class="className" :style="style" @click.stop="click" :title="title" :alt="title" />
</template>

<script>
import '@styles/exticon.less';
export default {
    name: 'ExtIcon',
    props: {
        name: String, // 图标名称
        size: Number, // 字体大小
        color: String, // 自定义颜色
        title: String,
    },
    computed: {
        className() {
            const { name } = this.$props;
            return `icon icon-${name}`;
        },
        style() {
            const { size, color } = this.$props;
            let result = {};
            if (size) {
                result['font-size'] = size + 'px';
            }
            if (color) {
                result['color'] = color;
            }
            return result;
        },
    },
    methods: {
        click() {
            this.$emit('click');
        },
    },
};
</script>
