document.addEventListener('DOMContentLoaded', () => {

    const wargaListContainer = document.getElementById('warga-list-container');
    const formWarga = document.getElementById('formWarga');
    const apiUrl = 'http://127.0.0.1:8000/api/warga/';

    // --- Fungsi render warga ---
    function renderWarga(warga) {
        const wargaDiv = document.createElement('div');
        wargaDiv.style.border = '1px solid #ccc';
        wargaDiv.style.padding = '10px';
        wargaDiv.style.marginBottom = '10px';

        wargaDiv.innerHTML = `
            <h3>${warga.nama_lengkap}</h3>
            <p>NIK: ${warga.nik}</p>
            <p>Alamat: ${warga.alamat}</p>
            <p>No. Telp: ${warga.no_telepon}</p>
        `;

        return wargaDiv;
    }

    // --- Fungsi load warga ---
    function loadWarga() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                wargaListContainer.innerHTML = '';
                data.results.forEach(warga => {
                    wargaListContainer.appendChild(renderWarga(warga));
                });
            })
            .catch(() => {
                wargaListContainer.innerHTML = '<p>Gagal memuat data.</p>';
            });
    }

    // --- Event submit form ---
    formWarga.addEventListener('submit', function(e) {
        e.preventDefault();

        const wargaBaru = {
            nik: document.getElementById("nik").value,
            nama_lengkap: document.getElementById("nama_lengkap").value,
            alamat: document.getElementById("alamat").value,
            no_telepon: document.getElementById("no_telepon").value,
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token c65318fa2f6a22456bf54d5f75ca72f57f5eb38c"
            },
            body: JSON.stringify(wargaBaru)
        })
        .then(res => res.json())
        .then(() => {
            alert("Warga berhasil ditambahkan!");
            loadWarga();   // refresh daftar
            formWarga.reset(); // kosongkan form
        });
    });

    // --- Load data saat halaman dibuka ---
    loadWarga();

});
