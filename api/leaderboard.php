<?php
$serveur = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "game_phaser";

$conn = new mysqli($serveur, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT username, score FROM dashboard ORDER BY score DESC LIMIT 10";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $scores = array();

        // Parcours des résultats
        while ($row = $result->fetch_assoc()) {
            $scores[] = array("username" => $row["username"], "score" => $row["score"]);
        }
        header("Content-type: application/json");
        echo json_encode($scores);
    } else {
        echo "0 results";
    }
    $conn->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
    $data = json_decode($inputJSON, TRUE);
    $conn->query("INSERT INTO dashboard (username, score) VALUES ('" . $data['username'] . "', '" . $data['score'] . "')");
    $conn->close();
}