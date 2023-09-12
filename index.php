<?php // Include the database configuration
    include('config.php');?>

<!DOCTYPE html>
<html lang="<?php
    // Create a SQL query to retrieve the webname, lang, and description
    $sql = "SELECT `lang` FROM `website`";

    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Data found, loop through the results
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
    // Create a SQL query to retrieve the webname, lang, and description
    $sql = "SELECT `webname` FROM `website`";
    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Data found, loop through the results
        while ($row = $result->fetch_assoc()) {
            $webname = $row["webname"];
            
            // Display the data for each row
            echo "$webname";
        }
    }
    ?></title>
    

    <meta name="twitter:description" content="<?php
    // Create a SQL query to retrieve the webname, lang, and description
    $sql = "SELECT `description` FROM `website`";

    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Data found, loop through the results
        while ($row = $result->fetch_assoc()) {
            $description = $row["description"];

            echo "$description";

        }
    }
    ?>">
    
    <meta name="description" content="<?php
    // Create a SQL query to retrieve the webname, lang, and description
    $sql = "SELECT `description` FROM `website`";
    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Data found, loop through the results
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
    --font: 'Poppins', sans-serif;;
    }
    </style>

</head>

<body>
    <!-- User Photo -->
    <img id="userPhoto" src="<?php
    // Create a SQL query to retrieve the logo
    $sql = "SELECT `logo` FROM `website`";
    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Data found, loop through the results
        while ($row = $result->fetch_assoc()) {
            $logo = $row["logo"];
            
            // Display the data for each row
            echo "$logo";
        }
    }
    ?>" alt="<?php
    // Create a SQL query to retrieve the webname, lang, and description
    $sql = "SELECT `webname` FROM `website`";
    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Data found, loop through the results
        while ($row = $result->fetch_assoc()) {
            $webname = $row["webname"];
            
            // Display the data for each row
            echo "$webname";
        }
    }
    ?>">
    
    <!-- Link Buttons -->
    <div id="links">
        <?php
        // Create a SQL query to retrieve the webname, lang, and description
        $sql = "SELECT * FROM `links` ORDER BY 'order' ASC";
        // Execute the query
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Data found, loop through the results
            while ($row = $result->fetch_assoc()) {
                // Display the data for each row
                echo "<a class='link' href='" . $row['link'] . "' target='_blank'>" . $row['name'] . "</a>";
            }
        }
        ?>
    </div>

    
</body>

</html>