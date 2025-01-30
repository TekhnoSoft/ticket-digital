<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;

class DatabaseConnection {
    private $host;
    private $dbName;
    private $username;
    private $password;
    private $port;
    private $conn;

    public function __construct() {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $this->host = $_ENV['SQL_HOST_PROD'];
        $this->dbName = $_ENV['SQL_DATABASE_PROD'];
        $this->username = $_ENV['SQL_USER_PROD'];
        $this->password = $_ENV['SQL_PASS_PROD'];
        $this->port = $_ENV['SQL_PORT_PROD'];

        $this->connect();
    }

    private function connect() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbName, $this->port);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>