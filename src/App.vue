<template>
    <div id="app">
        <TabsSwitcher
            :tabs="tabs"
            :current-tab="currentTab"
            @tabChange="changeTab($event)"
        />
        <TokenCard
            v-if="currentTab === 'token'"
            :id="10"
        />
        <BlocksTable
            v-else-if="currentTab === 'table'"
        />
        <div v-else>Wrong tab</div>
    </div>
</template>

<script>
import TabsSwitcher from '@/components/TabsSwitcher.vue'
import TokenCard from '@/components/TokenCard.vue'
import BlocksTable from '@/components/BlocksTable.vue'

export default {
    name: 'App',
    components: {
        TabsSwitcher,
        TokenCard,
        BlocksTable,
    },
    data() {
        return {
            tabs: [
                {
                    name: 'table',
                    title: 'Table',
                },
                {
                    name: 'token',
                    title: 'Token',
                }
            ],
            currentTab: 'table',
        }
    },
    methods: {
        changeTab(tab) {
            this.currentTab = tab
        },
    }
}
</script>

<style>


</style>

