<template>
    <div class="card col gap-3 p-3">
        <div>
            <b>Chain:</b>
            <div
                :class="chain.isLoaded ? '' : 'fake-block'"
            >{{ chain.value }}</div>
        </div>
        <div>
            <b>Token ID:</b>
            <div>{{ id }}</div>
        </div>
        <div>
            <b>Token contract:</b>
            <div
                :class="tokenInfo.isLoaded ? '' : 'fake-block'"
            >{{ tokenInfo.value.contract }}</div>
        </div>
        <div>
            <b>Token metadata:</b>
            <div
                :class="tokenMetadata.isLoaded ? 'col gap-1' : 'fake-block fake-block_big'"
            >
                {
                <div
                    v-for="(item, index) in Object.keys(tokenMetadata.value)"
                    :key="index"
                    class="row gap-3 json-row"
                >
                    <div>"{{ item }}":</div>
                    <div v-if="item === 'name'">
                        <span
                            :class="isInWhitelist(tokenMetadata.value[item]) ? 'text-green' : ''"
                        >"{{ tokenMetadata.value[item] }}"</span>,
                    </div>
                    <div
                        v-else-if="isLink(tokenMetadata.value[item])"
                    >
                        <a
                            :href="tokenMetadata.value[item]"
                            target="_blank"
                            rel="nofollower noopener"
                        >"{{ tokenMetadata.value[item] }}"</a>,
                    </div>
                    <div
                        v-else
                    >"{{ tokenMetadata.value[item] }}",</div>
                </div>
                }
            </div>
        </div>
    </div>
</template>

<script>
import { getChain, getTokenInfo, getTokenMetadata } from '@/api';

// Это можно вынести в отдельный файл
const TOKENS_WHITELIST = ['XTZ', 'TZBTC', 'USDT', 'USDC', 'USDS', 'KUSD', 'WBTC', 'WETH']

export default {
    name: 'TokenCard',
    props: {
        id: { type: Number, default: -1 },
    },
    data() {
        return {
            isLoaded: false,
            chain: {
                value: '',
                isLoaded: false,
            },
            tokenMetadata: {
                value: {},
                isLoaded: false,
            },
            tokenInfo: {
                value: {},
                isLoaded: false,
            },
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            // Я сделал три независимых запроса, потому что данные это позволяют
            // Можно запускать последовательно
            // Можно проверять, что пришли все данные перед выводом
            getChain().then((response) => {
                this.chain = {
                    value: response,
                    isLoaded: true,
                }
            })

            getTokenMetadata().then((response) => {
                this.tokenMetadata = {
                    value: response,
                    isLoaded: true,
                }
            })

            getTokenInfo(this.id).then((response) => {
                this.tokenInfo = {
                    value: response,
                    isLoaded: true,
                }
            })
        },
        isLink(value) {
            // Выносим в отдельный метод. По-хорошему, можно и в отдельный файл вынести,
            // может использоваться и в других местах
            // .indexOf() работает быстрее, чем регулярки
            return value.indexOf('https://') === 0 || value.indexOf('http://') === 0
        },
        isInWhitelist(name) {
            for(let i = 0; i < TOKENS_WHITELIST.length; i++) {
                if (TOKENS_WHITELIST[i] === name) {
                    return true
                }
            }
            return false
        }
    }
}
</script>

<style scoped>
.card {
    width: 600px;
    border-radius: 5px;
    padding: 15px;
}

.fake-block_big {
    height: 125px;
}

.json-row {
    padding-left: 40px;
}

</style>
