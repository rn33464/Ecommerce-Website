import axios from 'axios';

export const getAll = async () => {
    const { data } = await axios.get('/api/prods');
    return data;
};

export const search = async searchTerm => {
    const { data } = await axios.get('/api/prods/search/' + searchTerm);
    return data;
};

export const getAllTags = async () => {
    const { data } = await axios.get('/api/prods/tags');
    return data;
};

export const getAllByTag = async tag => {
    if (tag === 'All-Products') return getAll();
    const { data } = await axios.get('/api/prods/tag/' + tag);
    return data;
};

export const getById = async prodId => {
    const { data } = await axios.get('/api/prods/' + prodId);
    return data;
};

export async function deleteById(prodId) {
    await axios.delete('/api/prods/' + prodId);
}

export async function update(prod) {
    await axios.put('/api/prods', prod);
}

export async function add(prod) {
    const { data } = await axios.post('/api/prods', prod);
    return data;
}
