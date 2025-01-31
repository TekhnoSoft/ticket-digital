<?php
require 'connection.class.php';

$db = new DatabaseConnection();
$conn = $db->getConnection();

$keybind = "";
$seoImage = "";
$seoTitle = "";
$seoDescription = "";

if (isset($_GET['keybind'])) {
    try {
        // Validação do valor de keybind
        $keybind = trim($_GET['keybind']); // Remover espaços extras
        if (empty($keybind)) {
            echo "Parâmetro 'keybind' vazio.";
            header("Location: https://api.ebookdasorte.com/");
            exit();
        }

        // Preparação da consulta
        $stmt = $conn->prepare("SELECT A.keybind, A.user_id, B.seo_title, B.seo_description, C.id AS id_image 
                                FROM tb_sorteios AS A 
                                INNER JOIN tb_sorteio_informacoes AS B ON A.id = B.sorteio_id 
                                LEFT JOIN tb_sorteio_imagens AS C ON C.sorteio_id = A.id 
                                WHERE C.tipo = 'BANNER' AND A.keybind = ?");
        $stmt->bind_param('s', $keybind);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $keybind = htmlspecialchars($row['keybind']);
            $seoImage = htmlspecialchars($row['id_image']);
            $seoTitle = htmlspecialchars($row['seo_title']);
            $seoDescription = htmlspecialchars($row['seo_description']);
        } else {
            echo "Parceiro não encontrado.";
            header("Location: https://api.ebookdasorte.com/");
            exit(); // Importante para parar a execução após o redirecionamento
        }
        $stmt->close();
    } catch (Exception $erro) {
        echo "Erro: " . $erro->getMessage();
        header("Location: https://api.ebookdasorte.com/");
        exit(); // Também parar a execução após erro
    }
} else {
    echo "Parâmetro 'keybind' não fornecido.";
    header("Location: https://api.ebookdasorte.com/");
    exit();
}
?>

<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo $seoTitle; ?></title>
        <meta property="og:image" content="https://api.ebookdasorte.com/sorteios/imagem/<?php echo $seoImage; ?>"/>
        <meta name="title" content="<?php echo $seoTitle; ?>">
        <meta name="description" content="<?php echo $seoDescription; ?>">
        <meta name="keywords" content="">
        <meta name="robots" content="index, follow">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="language" content="Portuguese">
        <meta property="og:url" content="">
        <meta name="theme-color" content="#000000" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "Nunito", sans-serif;
                outline: none;
                -webkit-tap-highlight-color: transparent;
                -webkit-user-select: none; 
                -moz-user-select: none; 
                -ms-user-select: none;
                user-select: none;
            }
            body{
                width: 100%;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center
            }
        </style>
    </head>
    <body style="background: #f5f5f5">
        <div style="text-align: center; margin-top: -100px;">
            <img style="width: 100px; height: 100px; object-fit: 'cover'; border-radius: 50%; border: solid 3px #fff;" src="https://api.ebookdasorte.com/sorteios/imagem/<?php echo $seoImage; ?>" /><br/>
            <b><?php echo $seoTitle; ?></b>
        </div>
    </body>
    <script>
        let timeout = setTimeout(() => {
            let uri = "https://ebookdasorte.com/campanha/<?php echo $keybind ?>";
            window.location = uri;
        }, 1000);
    </script>
</html>