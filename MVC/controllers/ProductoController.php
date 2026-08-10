<?php

require './repositories/mysql/Database.php';
require './models/Product.php';

class ProductController
{
    private $productModel;

    public function __construct()
    {
        // Crear la conexión a la base de datos
        $database = new Database();

        // Obtener la conexión
        $db = $database->getConnection();

        // Crear el modelo y pasarle la conexión
        $this->productModel = new Product($db);
    }

    public function read()
    {
        // Obtener todos los productos
        $products = $this->productModel->getAll();

        // Enviar los productos a la vista
        include_once './views/home.php';
    }

    public function create()
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $descuento = $_POST['descuento'];
            $cantidad = $_POST['cantidad'];

            // Crear el producto
            $this->productModel->create(
                $nombre,
                $precio,
                $descuento,
                $cantidad
            );

            // Regresar a la lista
            header('Location: ./index.php?action=read');
            exit();
        }

        // Mostrar formulario de creación
        include_once './views/create.php';
    }

    public function update()
    {
        // Obtener el ID enviado por GET
        $id = $_GET['id'];

        // RETO:
        // Obtener el producto por ID utilizando getById($id)
        // y guardarlo en una variable.
        $product = $this->productModel->getById($id);

        // Si no existe el producto
        if (!$product) {
            die("Producto no encontrado");
        }

        // Si el formulario fue enviado
        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $descuento = $_POST['descuento'];
            $cantidad = $_POST['cantidad'];

            // Actualizar el producto
            $this->productModel->update(
                $id,
                $nombre,
                $precio,
                $descuento,
                $cantidad
            );

            // Regresar a la lista
            header('Location: ./index.php?action=read');
            exit();
        }

        // Enviar $product a la vista
        include_once './views/edit.php';
    }

    public function delete()
    {
        // Obtener el ID
        $id = $_GET['id'];

        // Eliminar producto
        $this->productModel->delete($id);

        // Regresar a la lista
        header('Location: ./index.php?action=read');
        exit();
    }
}
?>
