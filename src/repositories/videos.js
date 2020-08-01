import URL_BACKEND_TOP from '../config';

const URL_VIDEOS = `${URL_BACKEND_TOP}/videos`;

function create(objetoDoVideo) {
  return fetch(URL_VIDEOS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoDoVideo),
  })
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        // eslint-disable-next-line no-alert
        alert('Cadastrado com sucesso!');
      } else {
        throw new Error('Não foi possível pegar os dados:');
      }
    });
}

export default {
  create,
  URL_VIDEOS,
};
