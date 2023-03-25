import axios from 'axios'

export const BLOCKS_API = 'https://api.mumbainet.tzkt.io/v1/blocks'

export const getBlocks = async (offset = 0, limit = 20, sort = 'id') => {
    const sortParam = `&sort.desc=${sort}`

    const url = `${BLOCKS_API}?offset=${offset}&limit=${limit}${sortParam}`
    return axios.get(url)
}
