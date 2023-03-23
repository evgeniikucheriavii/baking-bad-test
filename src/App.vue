<template>
    <div id="app">
        <TokenCard :id="10"/>
    </div>
</template>

<script>
import TokenCard from './components/TokenCard.vue'

export default {
    name: 'App',
    components: {
        TokenCard
    }
}
</script>

<style>
body {
    background-color: #222;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    margin-top: 60px;
}

a, a:visited {
    color: #98D3F7;
}

a:hover {
    text-decoration: none;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.text-green {
    color: #63BF77;
}
</style>
