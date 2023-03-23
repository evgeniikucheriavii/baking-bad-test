<template>
    <div id="table">
        <div class="row">
            <div class="col">level</div>
            <div class="col">timestamp</div>
            <div class="col">hash</div>
            <div class="col">proposer</div>
            <div class="col">reward</div>
            <div class="col">fees</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlocksTable',
    data() {

    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll() {

        }
    }
}
</script>

<style>
</style>
