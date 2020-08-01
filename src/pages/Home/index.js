import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';

function Home() {
  const [dadosIniciais, setDadosInicias] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosInicias(categoriasComVideos);
      })
      .catch((err) => (
        <h1>
          {err.message}
        </h1>
      ));
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (
        <div>
          {/* Carregando */}
          Loading...
        </div>
      )}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription="Video do meu projeto de um site reviews de livro integrado com a API do Goodreads!"
              />
              <Carousel
                ignoreFirstVideo
                category={categoria}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}

    </PageDefault>
  );
}

export default Home;
