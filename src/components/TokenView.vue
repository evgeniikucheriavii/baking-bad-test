<template>
    <div>
        <!-- Добавить бы индикацию загрузки -->
        <div v-if="chain">
            <pre><b>Chain:</b></pre>
            <pre>{{ chain }}</pre>
        </div>
        <br>
        <div v-if="tokenInfo">
            <pre><b>Token id:</b></pre>
            <pre>{{ tokenInfo.id }}</pre>
        </div>
        <br>
        <div v-if="tokenInfo">
            <pre><b>Token contract:</b></pre>
            <pre>{{ tokenInfo.contract }}</pre>
        </div>
        <br>
        <div v-if="tokenMetadata">
            <pre><b>Token metadata:</b></pre>
            <!-- лучше избегать v-html, тем более там, где мы получаем данные извне -->
            <pre v-html="tokenMetadata" />
        </div>
    </div>
</template>


<script>
// Лишние зависимости. Во Vue2 можно обойтись и без этого
import { defineComponent, onMounted, ref } from 'vue';
import { getChain, getTokenInfo, getTokenMetadata } from './api';

export default defineComponent({
    props: {
        id: {
            type: Number,
            default: 1234, // Может совпасть с реальным ID, лучше поставить 0 или -1
        },
    },
    setup(props) {
        const chain = ref('Mainnet');
        const tokenInfo = ref(null);
        const tokenMetadata = ref(null);
        const whitelisted = ['XTZ', 'TZBTC', 'USDT', 'USDC', 'USDS', 'KUSD', 'WBTC', 'WETH'];

        const processMetadata = (metadata) => {
            let json = JSON.stringify(metadata, null, '\t');
            for (const name of whitelisted) {
                if (name == metadata.name) {
                    json = json.replace(`"${name}"`, `<span style="color:limegreen">${name}</span>`);
                }
            }
            for (const match of json.matchAll(/"https?:\/\/[^"]+"/g)) {
                const link = match[0].substring(1, match[0].length - 1);
                json = json.replace(link, `<a href="${link}">${link}</a>`);
            }
            return json;
        };
        
        onMounted(async () => {
            tokenMetadata.value = processMetadata(await getTokenMetadata());
            tokenInfo.value = await getTokenInfo(props.id);
            chain.value = await getChain();
        });        // Лишние пробелы

        return {
            chain,
            tokenInfo,
            tokenMetadata,
        };
    },
})
</script>

<style>
/* На базовые компоненты лучше ничего не вешать. Лучше на классы */
div {
    /* !important сложно контроллировать, поэтому лучше избегать */
    padding: 1rem !important;
}

/* Опять же */
div > div {
    padding: 0 !important;
}
</style>
