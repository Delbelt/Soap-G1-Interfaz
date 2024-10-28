import AddButton from "components/AddButton";
import CardListView from "components/CardListView";
import Container from "components/Container";
import Navbar from "components/Navbar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExportCatalogById, GetCatalogById } from "services/CatalogServices";

const CatalogPage = () => {
  const [catalog, setCatalog] = useState<Catalog>();
  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/dashboard/catalog/new-catalog");
  };

  const handleAddProduct = () => {
    navigate("/dashboard/catalog/new-product");
  };

  useEffect(() => {
    GetCatalogById()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.catalog);
        setCatalog(data.catalog);
      });
  }, []);

  const handleExportCatalog = () => {
    ExportCatalogById()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.pdfUrl) {
          window.open(data.pdfUrl, "_blank");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <Container direction='column'>
        <Container position='right'>
          <AddButton title='Agregar catalogo' onClick={handleAddOrder} />
          <AddButton title='Agregar Producto' onClick={handleAddProduct} />
        </Container>
        <Container direction='row' wrap='wrap'>
          {catalog && (
            <CardListView
              titleFirstButton='Exportar PDF'
              title={`Catalogo: ${catalog.id}`}
              onClick={handleExportCatalog}
            >
              {catalog.products.map((product) => {
                return (
                  <Title>
                    {product.code}: {product.name}
                  </Title>
                );
              })}
            </CardListView>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default CatalogPage;
