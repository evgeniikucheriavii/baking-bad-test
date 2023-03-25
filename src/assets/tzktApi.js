import axios from 'axios'

export const BLOCKS_API = 'https://api.mumbainet.tzkt.io/v1/blocks'
export const BLOCKS_COUNT_API = 'https://api.mumbainet.tzkt.io/v1/blocks/count'

export const getBlocks = (offset = 0, limit = 20, sort = 'id') => {
    const sortParam = `&sort.desc=${sort}`

    const url = `${BLOCKS_API}?offset=${offset}&limit=${limit}${sortParam}`
    return axios.get(url)
}

export const getBlocksCount = () => {
    return axios.get(BLOCKS_COUNT_API)
}
