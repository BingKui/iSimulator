<template>
    <HalfModal
        :haveLogo="false"
        title="Url"
        :visible.sync="visible"
        :appendToBody="true"
        customClass="v-url-param"
        @halfClosed="drawerClosed"
    >
        <div class="param-content">
            <Input v-model="url" type="textarea" rows="3" />
            <Divider size="small" content-position="left">地址</Divider>
            <div>{{urlObject.origin}}{{urlObject.pathname}}</div>
            <template v-if="resultList.length > 0">
                <Divider size="small" content-position="left">参数列表</Divider>
                <div class="parse-result-list">
                    <div class="parse-item" v-for="item in resultList" :key="item.name">
                        <div class="item-name">{{item.name}}</div>
                        <div class="item-val">{{item.val}}</div>
                    </div>
                </div>
            </template>
        </div>
    </HalfModal>
</template>

<script>
import { Input, Divider } from 'element-ui';
import HalfModal from '@components/HalfModal';
import { createQrCode } from '@common/utils';
import { getWebviewUrl } from '@common/common';
export default {
    name: 'UrlQrcode', // url转换为二维码
    components: {
        HalfModal,
        Input,
        Divider,
    },
    data() {
        return {
            visible: false,
            url: '',
            resultList: [],
            urlObject: {},
        };
    },
    methods: {
        async show() {
            this.visible = true;
            const url = await getWebviewUrl();
            this.url = url;
            this.urlObject = new URL(url);
            const _val = decodeURIComponent(url);
            let result = [];
            this.urlValue = _val.split('?')[0];
            const values = _val.split('?')[1];
            if (values) {
                const arr = values.split('&');
                arr.forEach(item => {
                    const name = item.split('=')[0];
                    const val = item.split('=')[1];
                    result.push({
                        name,
                        val,
                    });
                });
                this.resultList = result;
            }
        },
        close() {
            this.visible = false;
        },
        drawerClosed() {
            this.$emit('closeMenu');
        },
    },
};
</script>

<style lang="less">
.v-url-param {
    .param-content {
        .p(@gap-md);
        .el-divider__text {
            background-color: @half-background-color;
        }
        .parse-result-list {
            .parse-item {
                .flex();
                .m-v(@gap-sm);
                .item-name {
                    .m-r(@gap);
                    font-weight: bold;
                    width: 80px;
                    text-align: left;
                    word-break: break-all;
                    color: @primary;
                }
                .item-val {
                    flex: 1;
                    word-break: break-all;
                }
            }
        }
    }
}
</style>
