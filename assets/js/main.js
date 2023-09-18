const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const link = document.getElementById('link');  
    const width = document.getElementById('width');
    const height = document.getElementById('height');
    const background = document.getElementById('background');
    const foreground = document.getElementById('foreground');
    const type = document.getElementById('type');
    const linkApi = `https://image-charts.com/chart?choe=UTF-8&cht=qr&chl=${encodeURI(link.value)}&chof=${type.value.toString()}&chs=${width.value}x${height.value}&icqrb=${background.value.substring(1)}&icqrf=${foreground.value.substring(1)}`;
    
    renderQrcode(linkApi);

  });

const fetchQRcode = async (linkApi) => {
    const APIResponse = await fetch(linkApi);
    if (APIResponse.status === 200) {
        const data = await APIResponse;
        return data;
    }
}

const renderQrcode = async (linkApi) => {
    const result = document.querySelector('.result');
    const qrcode = document.getElementById('qrcode');
    
    const data = await fetchQRcode(linkApi);

    if (data) {
        result.style.display = 'block';
        qrcode.innerHTML = `
            <img src="${data.url}" class="img-fluid" alt="QR Code"><br>
            <a id="download" class="btn btn-success mt-2">Baixar o QR Code</a><br>
            <p class="mt-2"><strong>Ao clicar no botão "Baixar o QR Code",  seu QR Code irá abrir em outra aba. Você pode baixar clicando com o botão direito do mouse e salvar imagem. Ou usando o atalho CTRL+S do teclado.</strong></p>
            <p><strong>Caso você esteja pelo celular pressione a imagem e clique em fazer download(caso tenha escolhido a opção PNG).</strong></p>
        `;

        const download = document.getElementById('download');
        download.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(data.url, "_blank");
        });

    } else {
        result.style.display = 'block';
        qrcode.innerHTML = '<br><span class="mt-2 alert alert-danger"><strong>Erro ao criar o QR Code. Tente novamente!</strong></span>';
    }

}

const fullDate = new Date();
const date = document.getElementById('date');
date.innerHTML = fullDate.getFullYear();