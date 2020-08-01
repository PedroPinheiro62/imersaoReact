import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#f00000',
  };

  const { values, handleInputChange, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(categoriasRepository.URL_CATEGORIES)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias(resposta);
      });
  }, []);

  return (
    <PageDefault form={1}>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>

      <form onSubmit={function handleSubmit(event) {
        event.preventDefault();
        if (values.titulo === '') {
          return;
        }

        categoriasRepository.create({
          titulo: values.titulo,
          cor: values.cor,
          link_extra: {
            text: values.descricao,
            url: 'None',
          },
        });

        setCategorias([
          ...categorias,
          values,
        ]);

        clearForm();
      }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleInputChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleInputChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleInputChange}
        />

        <Button className="ButtonLink">
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          {/* Carregando */}
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria, index) => (
          <li key={categoria.titulo + index.toString()}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
