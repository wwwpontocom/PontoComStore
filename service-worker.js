const CACHE_NAME = 'gem-gm-central-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './data_fases.js',
    './data_extras.js',
    './data_plano.js',       // Adicionado
    './data_dia.js',         // Adicionado
    './data_logs.js',
    './data_audios.js',      // Adicionado
    './data_moo.js',         // Adicionado
    './data_manual.js',      // Adicionado
    './data_login.js',       // Adicionado
    './main.js',
    'https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.1.3/firebase-database-compat.js',
    'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth-compat.js', // Adicionado
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Estratégia: Tenta a rede, se falhar, usa o cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
