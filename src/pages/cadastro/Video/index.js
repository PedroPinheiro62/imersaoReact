import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleInputChange, values } = useForm({
    titulo: '',
    url: '',
    categoriaId: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((loadCategorias) => {
        setCategorias(loadCategorias);
      });
  }, []);

  return (
    <PageDefault form={1}>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(event) => {
        event.preventDefault();

        // eslint-disable-next-line arrow-body-style
        const categoriaEscolhida = categorias.find((categoria) => (
          categoria.titulo === values.categoriaId
        ));

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            history.push('/');
          });
      }}
      >
        <FormField
          label="Título do Vídeo"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleInputChange}
        />

        <FormField
          label="URL"
          type="text"
          name="url"
          value={values.url}
          onChange={handleInputChange}
        />

        <FormField
          label="Categoria"
          type="text"
          name="categoriaId"
          value={values.categoriaId}
          onChange={handleInputChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;
