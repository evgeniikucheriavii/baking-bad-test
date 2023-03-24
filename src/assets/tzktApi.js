import axios from 'axios'

export const BLOCKS_API = 'https://api.mumbainet.tzkt.io/v1/blocks'

export const getBlocks = async (offset = 0, limit = 20, sort = null) => {
    let sortParam = `&sort.asc=${sort}`

    if (sort[0] === '-') {
        sortParam = `&sort.desc=${sort.substring(1)}`
    }

    const url = `${BLOCKS_API}?offset=${offset}&limit=${limit}${sortParam}`
    return axios.get(url)
}
