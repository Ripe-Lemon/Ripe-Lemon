const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

if (!browserAPI) {
    throw new Error('Neither browser nor chrome API is available');
}
