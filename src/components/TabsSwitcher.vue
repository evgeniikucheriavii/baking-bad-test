<template>
    <div class="row gap-3 p-3">
        <button
            v-for="(tab, index) in tabs"
            :key="`tab_${index}`"
            :class="tab.name === currentTab ? 'tab tab_current' : 'tab'"
            @click="onTabClick(tab.name)"
        >{{ tab.title }}</button>
    </div>
</template>

<script>
export default {
    name: 'TabsSwitcher',
    props: {
        tabs: { type: Array, default: () => ([]) },
        currentTab: { type: String, default: '' },
    },
    methods: {
        onTabClick(name) {
            this.$emit('tabChange', name)
        }
    }
}
</script>

<style scoped>
.tab {
    background: #333;
    color: #fff;
    border-radius: var(--radius);
    border: none;
    outline: none;
    height: 32px;
    padding: 0 10px;
    font-family: var(--font-family);
}

.tab_current {
    background: var(--green);
}
</style>


