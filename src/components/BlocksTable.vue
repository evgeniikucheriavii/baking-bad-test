<template>
    <div class="p-3">
        <div id="table" class="table col gap-3">
            <div class="row gap-3 table-head">
                <div
                    v-for="(col, index) in columns"
                    :key="`col_${index}`"
                    class="row p-3 gap-3 align-items-center"
                    :style="{'width': `${col.width}px`}"
                >
                    <span>{{ col.title }}</span>
                    <i
                        v-if="col.sortable"
                        :class="[
                            'fa-solid',
                            sort === col.name ? 'fa-sort-up' : sort === `-${col.name}` ? 'fa-sort-down' : 'fa-sort text-gray'
                        ]"
                        @click="onSortClick(col.name)"
                    ></i>
                </div>
            </div>
            <div class="table-body col gap-2">
                <div
                    v-for="(row, rIndex) in data"
                    :key="`row_${rIndex}`"
                    class="row gap-3"
                >
                    <div
                        v-for="(col, cIndex) in columns"
                        :key="`row_${rIndex}_col_${cIndex}`"
                        class="row table-col p-3 gap-3 align-items-center"
                        :style="{'width': `${col.width}px`}"
                    >
                        <span
                            v-if="col.name === 'timestamp'"
                        >{{ new Date(row['timestamp']).toLocaleString() }}</span>
                        <span v-else-if="col.name === 'proposer'">{{ row[col.name].address }}</span>
                        <span v-else>{{ row[col.name] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBlocks } from '@/assets/tzktApi'

export default {
    name: 'BlocksTable',
    data() {
        return {
            columns: [
                { name: 'level', title: 'Level', sortable: true, width: 100 },
                { name: 'timestamp', title: 'Timestamp', width: 200 },
                { name: 'hash', title: 'Hash', width: 550 },
                { name: 'proposer', title: 'Proposer', width: 400 },
                { name: 'reward', title: 'Reward', sortable: true, width: 100 },
                { name: 'fees', title: 'Fees', sortable: true, width: 100 },
            ],
            sort: '-id',
            offset: 0,
            limit: 20,
            data: [],
            fetchingData: false,
        }
    },
    watch: {
        sort() {
            this.fetchData()
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
        this.fetchData()
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        fetchData() {
            this.fetchingData = true
            getBlocks(this.offset, this.limit, this.sort).then((response) => {
                this.data = [
                    ...this.data,
                    ...response.data
                ]
                this.fetchingData = false
            })
        },
        onScroll() {
            // const top = this.$refs.refContainer.getBoundingClientRect().top
            // const elementPosition = top - this.spacing
            const pageHeight = document.body.scrollHeight
            const scrollBottom = window.scrollY + window.innerHeight

            const delta = Math.abs(pageHeight - scrollBottom)
            const scrollSpacing = 300

            if (delta < scrollSpacing) {
                this.offset += this.limit
                this.fetchData()
            }
        },
        onSortClick(value) {
            if (this.sort === `-${value}`) {
                this.sort = '-id'
                return
            }

            if (this.sort === value) {
                this.sort = `-${value}`
                return
            }

            this.sort = value
        },
    }
}
</script>

<style>
.table {
    width: 100%;
}

.table-head {
    border: 1px solid #333;
    background-color: #333;
    border-radius: var(--radius);
}

.table-col {
    overflow: hidden;
}

</style>
