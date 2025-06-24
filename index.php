<?php 
    $configFile = __DIR__ . '/config.php';

    // Check if install is made
    if (!file_exists($configFile)) {
    header('Location: install.php');
    exit;
    }

    include('config.php');
    ?>

<!DOCTYPE html>
<html lang="<?php
    $sql = "SELECT `lang` FROM `website`";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $lang = $row["lang"];

            echo "$lang";
        }
    }
    ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name='robots' content='index, follow'/>
    <meta name='rating' content='safe for kids'/>

    <!-- Lnk Tree created by Indiews - Digital Agency -->

    <title><?php
    
    $sql = "SELECT `webname` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $webname = $row["webname"];

            echo "$webname";
        }
    }
    ?></title>
    <meta name="twitter:description" content="<?php
    $sql = "SELECT `description` FROM `website`";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
       
        while ($row = $result->fetch_assoc()) {
            $description = $row["description"];

            echo "$description";

        }
    }
    ?>">
    <meta name="description" content="<?php
    $sql = "SELECT `description` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $description = $row["description"];

            echo "$description";

        }
    }
    ?>">
    <meta name="twitter:title" content="<?php
    $sql = "SELECT `webname` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["webname"];
        }
    }
?>
">
    <link rel="stylesheet" href="assets/css/style.css"> 
    <style>
    :root {
    --bkColor: <?php
    $sql = "SELECT `bkcolor` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["bkcolor"];
        }
    }
?>
;
    --btbkcolor: <?php
    $sql = "SELECT `btbkcolor` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["btbkcolor"];
        }
    }
?>;
    --borderColor: <?php
    $sql = "SELECT `btbocolor` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo $row["btbocolor"];
        }
    }
?>;
    --font: 'Poppins', sans-serif;
    }
    </style>
    
    <?php
    
    $sql = "SELECT `codehead` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $codehead = $row["codehead"];

            echo "$codehead";
        }
    }
    ?>
</head>

<body>
    <img id="userPhoto" src="<?php
    $sql = "SELECT `logo` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $logo = $row["logo"];
            
            echo "$logo";
        }
    }
    ?>" alt="<?php
    $sql = "SELECT `webname` FROM `website`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $webname = $row["webname"];
            
            echo "$webname";
        }
    }
    ?>">
    
    <div id="links">
        <?php
        $sql = "SELECT * FROM `links` ORDER BY `order` ASC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<a class='link' href='" . $row['link'] . "' target='_blank'>" . $row['name'] . "</a>";
            }
        }
        ?>
    </div>

    
</body>

</html>