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
    <link rel="stylesheet" href="assets/css/style.css"> 
    <style>
    
    :root {
    --bgColor: #3e3751;
    --accentColor: #ffffff; 
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
        <a class="link" href="https://ptanime.com" target="_blank">Website</a>
        <a class="link" href="https://discord.gg/xnGQFgg2YR" target="_blank">Discord</a>
        <a class="link" href="https://bit.ly/39YtqKF" target="_blank">Twitch</a>
        <a class="link" href="https://www.instagram.com/ptanime/" target="_blank">Instagram</a>
        <a class="link" href="http://bit.ly/34ZLHUD" target="_blank">Youtube</a>
        <a class="link" href="https://twitter.com/ptAnime_oficial" target="_blank">Twitter</a>
        <a class="link" href="https://ptani.me/r/ptanimemeshi" target="_blank">ptanimemeshi na Prozis</a>
        <a class="link" href="https://www.pamp.pt/" target="_blank">PAMP</a>
        
      
    </div>

    
</body>

</html>