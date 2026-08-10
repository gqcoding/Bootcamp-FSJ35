<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Editar Producto</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >
</head>

<body>

    <?php include './views/layouts/navbar.php' ?>

    <main class="container mt-2">

        <h2 class="text-center">
            Editar producto
        </h2>

        <section class="d-flex justify-content-center">

            <article class="card col-8">

                <form
                    class="form-control"
                    action="./index.php?action=update&id=<?php echo $product['id']; ?>"
                    method="POST"
                >

                    <label class="form-label">
                        Nombre
                    </label>

                    <input
                        class="form-control"
                        type="text"
                        name="nombre"
                        value="<?php echo $product['nombre']; ?>"
                        required
                    >

                    <label class="form-label">
                        Precio
                    </label>

                    <input
                        class="form-control"
                        type="number"
                        step="0.01"
                        name="precio"
                        value="<?php echo $product['precio']; ?>"
                        required
                    >

                    <label class="form-label">
                        Descuento
                    </label>

                    <input
                        class="form-control"
                        type="number"
                        name="descuento"
                        value="<?php echo $product['descuento']; ?>"
                        required
                    >

                    <label class="form-label">
                        Cantidad
                    </label>

                    <input
                        class="form-control"
                        type="number"
                        name="cantidad"
                        value="<?php echo $product['cantidad']; ?>"
                        required
                    >

                    <button
                        class="btn btn-success mt-2"
                        type="submit"
                    >
                        Editar
                    </button>

                </form>

            </article>

        </section>

    </main>

</body>

</html>
