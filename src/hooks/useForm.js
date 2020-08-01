import { useState } from 'react';

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleInputChange(event) {
    setValue(
      event.target.getAttribute('name'),
      event.target.value,
    );
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  return {
    values,
    handleInputChange,
    clearForm,
  };
}

export default useForm;
