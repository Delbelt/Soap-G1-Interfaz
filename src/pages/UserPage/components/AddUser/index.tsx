import useForm from "hooks/useForm";
import FormContainer from "components/FormContainer";

import styles from "./AddUser.module.css";
import { useEffect, useState } from "react";
import { AddUsers } from "services/UserService";

const AddUser = () => {
  const { hasError, setHasError, isValidForm, setIsValidForm } = useForm();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const formatMessage = (data: any) => {
    const { usuariosCargados, errores } = data.detalles;

    let formattedMessage = "✅ Usuarios cargados exitosamente:\n";
    formattedMessage += usuariosCargados.map((user: string) => `- ${user}`).join("\n");
    formattedMessage += "\n\n❌ Errores encontrados:\n";
    formattedMessage += errores.map((error: string) => `- ${error}`).join("\n");

    return formattedMessage;
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (selectedFile) {
      console.log("Archivo seleccionado:", selectedFile.name);

      const formData = new FormData();
      formData.append("file", selectedFile);

      AddUsers(formData)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const formattedMessage = formatMessage(data);

          const stringMessage = {
            cargados: data.detalles.usuariosCargados,
            errores: data.detalles.errores,
          };

          setHasError(formattedMessage);
        });
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [selectedFile, setIsValidForm]);

  return (
    <FormContainer
      title='Agregar Usuarios'
      isValidForm={isValidForm}
      ErrorMessage={hasError}
      handleSubmit={handleSubmit}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.fileInput}
          type='file'
          name='userFile'
          onChange={handleFileChange}
        />
        {selectedFile && (
          <p className={styles.fileName}>Archivo seleccionado: {selectedFile.name}</p>
        )}
      </div>
    </FormContainer>
  );
};

export default AddUser;
