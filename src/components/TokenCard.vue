<template>
    <div class="card col">
        <div>
            <b>Chain:</b>
            <div
                :class="chain.isLoaded ? '' : 'fakeBlock'"
            >{{ chain.value }}</div>
        </div>
        <div>
            <b>Token ID:</b>
            <div>{{ id }}</div>
        </div>
        <div>
            <b>Token contract:</b>
            <div
                :class="tokenInfo.isLoaded ? '' : 'fakeBlock'"
            >{{ tokenInfo.value.contract }}</div>
        </div>
        <div>
            <b>Token metadata:</b>
            <div
                :class="tokenMetadata.isLoaded ? '' : 'fakeBlock fakeBlock_big'"
            >
                {
                <div
                    v-for="(item, index) in Object.keys(tokenMetadata.value)"
                    :key="index"
                    class="row json-row"
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
        isLink(str) {
            // Выносим в отдельный метод. По-хорошему, можно и в отдельный файл вынести,
            // может использоваться и в других местах
            // .indexOf() работает быстрее, чем регулярки
            return str.indexOf('https://') === 0 || str.indexOf('http://') === 0
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
    width: 600px;
    border-radius: 5px;
    padding: 15px;
}

@keyframes effect-wave {
    0% {
        background-position: 50% 50%;
    }

    100% {
        background-position: -150% 50%;
    }
}

.fakeBlock {
    overflow: hidden;
    animation: effect-wave 1s infinite;
    background-color: #ddd;
    background-image:
      linear-gradient(
        90deg,
        #777 0%,
        #777 20%,
        #666 30%,
        #666 70%,
        #555 80%,
        #555 100%
      );
    background-position: 50% 50%;
    background-size: 200% 100%;
    border-radius: 3px;
    color: transparent;
    user-select: none;
    white-space: nowrap;
    min-width: 100px;
    min-height: 19px;
}

.fakeBlock_big {
    height: 125px;
}

.json-row {
    padding-left: 40px;
}

</style>
